const db = require("../db");
const { BadRequestError } = require("../utils/errors");
require("dotenv").config();
const moment = require("moment");

class Todo {
  static returnPublicTask(givenTask) {
    return {
      taskId: givenTask.task_id,
      userId: givenTask.user_id,
      name: givenTask.name,
      description: givenTask.description,
      category: givenTask.category.toLowerCase(),
      dueDate: givenTask.due_date,
      dueTime: givenTask.due_time,
    };
  }

  static returnCompletedPublicTask(givenCompletedTask) {
    return {
      taskId: givenCompletedTask.task_id,
      userId: givenCompletedTask.user_id,
      score: givenCompletedTask.score,
      timeSpent: givenCompletedTask.time_spent,
      peopleWith: givenCompletedTask.people_with,
      comment: givenCompletedTask.comment,
      onTime: givenCompletedTask.on_time,
      public: givenCompletedTask.public,
    };
  }

  static camelCaseToSqlSyntaxForTask(field) {
    //  ["name", "description", "category", "dueDate", "dueTime"]
    if (field == "dueDate") {
      return "due_date";
    }
    if (field == "dueTime") {
      return "due_time";
    }
    return field;
  }

  static async deleteTask(taskToDelete, user) {
    if (!taskToDelete) {
      throw new BadRequestError("No task  passed through to delete a task.");
    }
    if (!taskToDelete?.taskId) {
      throw new BadRequestError("No taskId was supplied to delete a task.");
    }
    if (!user?.userId) {
      // if the user passed in doesn't have a userId
      throw new BadRequestError(
        `userId is missing from the user information in order to delete a task for the user`
      );
    }

    const text = `DELETE from tasks
                        WHERE user_id=$1 AND task_id=$2
                        RETURNING task_id, user_id, name, description, category, due_date, due_time`;
    const values = [user.userId, taskToDelete.taskId];

    const result = await db.query(text, values);
    return await Todo.returnPublicTask(result.rows[0]);
  }

  static async addTask(givenTask, user) {
    if (!givenTask) {
      throw new BadRequestError(
        "No task information passed through to create a new task."
      );
    }

    const requiredFields = [
      "name",
      "description",
      "category",
      "dueDate",
      "dueTime",
    ];
    requiredFields.forEach((field) => {
      if (!givenTask.hasOwnProperty(field)) {
        throw new BadRequestError(
          `The field: "${field}" is missing from the task passed in to create a task for the user`
        );
      }
    });

    if (!user?.userId) {
      // if the user passed in doesn't have a userId
      throw new BadRequestError(
        `userId is missing from the user information in order to create a task for the user`
      );
    }

    const text = `INSERT INTO tasks (
                user_id,
                name,
                description,
                category,
                due_date,
                due_time)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING task_id, user_id, name, description, category, due_date, due_time`;
    const values = [
      user.userId,
      givenTask.name,
      givenTask.description,
      givenTask.category.toLowerCase(),
      givenTask.dueDate,
      givenTask.dueTime,
    ];

    const result = await db.query(text, values);
    return await Todo.returnPublicTask(result.rows[0]);
  }

  static async completeTask(completedTaskWithId, user) {
    if (!completedTaskWithId) {
      throw new BadRequestError(
        "No task information passed through to create a new task."
      );
    }

    const requiredFields = [
      "score",
      "timeSpent",
      "peopleWith",
      "comment",
      "onTime",
      "public",
      "taskId",
    ];
    requiredFields.forEach((field) => {
      if (!completedTaskWithId.hasOwnProperty(field)) {
        throw new BadRequestError(
          `The field: "${field}" is missing from the completed task passed in to update a task for the user`
        );
      }
    });

    if (!user?.userId) {
      // if the user passed in doesn't have a userId
      throw new BadRequestError(
        `userId is missing from the user information in order to create a task for the user`
      );
    }

    const text = `INSERT INTO completed (
                task_id,
                user_id,
                score,
                time_spent,
                people_with,
                comment,
                on_time,
                public)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING task_id, user_id, score, time_spent, people_with, comment, on_time, public`;
    const values = [
      completedTaskWithId.taskId,
      user.userId,
      completedTaskWithId.score,
      completedTaskWithId.timeSpent,
      completedTaskWithId.peopleWith,
      completedTaskWithId.comment,
      completedTaskWithId.onTime,
      completedTaskWithId.public,
    ];

    const result = await db.query(text, values);
    return await Todo.returnCompletedPublicTask(result.rows[0]);
  }

  static async allTasks(user) {
    //
    // MAKE SURE TO CHECK THAT IT IS NOT IN "COMPLETED" TABLE TOO!!!!!!!!!!!!!!
    //
    if (!user?.userId) {
      throw new BadRequestError(
        `userId is missing from the user information in order to get all tasks for the user`
      );
    }

    // Get all tasks for user that is logged in using the WHERE clause
    const text = `
        SELECT * 
        FROM tasks 
        WHERE user_id=$1 AND task_id NOT IN 
                                (SELECT task_id FROM completed)
        ORDER BY due_date ASC,
                due_time ASC`;
    const values = [user.userId];
    const result = await db.query(text, values);

    // In a new array, make all the tasks "public"
    let tasksArray = [];
    for (let i = 0; i < result.rows.length; i++) {
      tasksArray.push(await Todo.returnPublicTask(result.rows[i]));
    }

    return tasksArray; // this is the array of all the user's tasks formatted publicly
  }

  static async updateTask(givenTaskWithId, user) {
    if (!givenTaskWithId) {
      throw new BadRequestError(
        "No task information passed through to create a new task."
      );
    }

    const requiredFields = [
      "name",
      "description",
      "category",
      "dueDate",
      "dueTime",
      "taskId",
    ];
    requiredFields.forEach((field) => {
      if (!givenTaskWithId.hasOwnProperty(field)) {
        throw new BadRequestError(
          `The field: "${field}" is missing from the task passed in to update a task for the user`
        );
      }
    });

    if (!user?.userId) {
      // if the user passed in doesn't have a userId
      throw new BadRequestError(
        `userId is missing from the user information in order to create a task for the user`
      );
    }

    // at this point, user is authorized AND user is allowed to update the task (see permissions file)
    const checkText = `SELECT * FROM tasks WHERE task_id=$1;`;
    const checkValues = [givenTaskWithId.taskId];
    const checkResult = await db.query(checkText, checkValues);
    // all the stuff is in... checkResult.rows[0]
    // WARNING: in SQL syntax (not camelCase)
    let updatedTask = checkResult.rows[0];
    const updateFields = [
      "name",
      "description",
      "category",
      "dueDate",
      "dueTime",
    ];
    updateFields.forEach((field) => {
      if (
        givenTaskWithId[field] !== null &&
        givenTaskWithId[field] !== "" &&
        givenTaskWithId[field] !== undefined
      ) {
        // if it has no meaningful content, don't update it
        updatedTask[Todo.camelCaseToSqlSyntaxForTask(field)] =
          givenTaskWithId[field];
      }
    });

    let updateQuery = await db.query(
      `
            UPDATE tasks
            SET name=$1,
                description=$2,
                category=$3,
                due_date=$4,
                due_time=$5
            WHERE task_id=$6
            RETURNING task_id, user_id, name, description, category, due_date, due_time
            `,
      [
        updatedTask.name,
        updatedTask.description,
        updatedTask.category.toLowerCase(),
        updatedTask.due_date,
        updatedTask.due_time,
        givenTaskWithId.taskId,
      ]
    );

    return await Todo.returnPublicTask(updateQuery.rows[0]);
  }

  //returns tasks that are late
  static async checkIfLate() {
    let date = new Date();
    let currentDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
    let tomorrow = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1));
    let tomorrowDate = `${tomorrow.getUTCFullYear()}-${tomorrow.getUTCMonth() + 1}-${tomorrow.getUTCDate()}`;
    let currentHour = date.getUTCHours();
    let currentMinute = date.getUTCMinutes();
    let notifyUsers = new Map();

    if (currentHour === 23) {
      let tasks = await db.query(
        `
                       SELECT t.name, t.due_date, t.due_time, u.user_id, u.phone 
                       FROM tasks as t
                          INNER JOIN users as u on u.user_id=t.user_id
                       WHERE due_date=$1`,
        [tomorrowDate]
      );
      for (let index = 0; index < tasks.rows.length; index++) {
        let taskHour = Number(tasks.rows[index].due_time.split(":")[0]);
        let taskMinute = Number(tasks.rows[index].due_time.split(":")[1]);
        if (currentMinute === taskMinute && taskHour === 0) {
          // then that means it is due in 1 hour since it may be 11:xx pm and it is due at 12:xx am the next day
          let userId = tasks.rows[index].user_id;
          if (notifyUsers.has(userId)) {
            notifyUsers.set(userId, {
              ...notifyUsers.get(userId),
              message:
                notifyUsers.get(userId).message +
                `${tasks.rows[index].name} is due in approximately 60 minutes! \n`,
            });
          } else {
            notifyUsers.set(userId, {
              phone: tasks.rows[index].phone,
              message: `${tasks.rows[index].name} is due in approximately 60 minutes! \n`,
            });
          }
        }
      }
      return notifyUsers;
    } else {
      let tasks = await db.query(
        `
                       SELECT t.name, t.due_date, t.due_time, u.user_id, u.phone 
                       FROM tasks as t
                          INNER JOIN users as u on u.user_id=t.user_id
                       WHERE due_date=$1`,
        [currentDate]
      );

      for (let index = 0; index < tasks.rows.length; index++) {
        let taskHour = Number(tasks.rows[index].due_time.split(":")[0]);
        let taskMinute = Number(tasks.rows[index].due_time.split(":")[1]);
        console.log("the other time:", taskHour, taskMinute);
        if (currentMinute === taskMinute && taskHour - currentHour === 1) {
          // then it is 1 hour before the due time (and due date that was filterd by sql)
          let userId = tasks.rows[index].user_id;
          if (notifyUsers.has(userId)) {
            notifyUsers.set(userId, {
              ...notifyUsers.get(userId),
              message:
                notifyUsers.get(userId).message +
                `${tasks.rows[index].name} is due in approximately 60 minutes! \n`,
            });
          } else {
            notifyUsers.set(userId, {
              phone: tasks.rows[index].phone,
              message: `${tasks.rows[index].name} is due in approximately 60 minutes! \n`,
            });
          }
        }
      }
      return notifyUsers;
    }
  }
}

module.exports = Todo;
