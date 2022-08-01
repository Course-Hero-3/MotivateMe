const express = require("express");
const Todo = require("../models/todo");
const security = require("../middleware/security");
const permissions = require("../middleware/permissions");
const router = express.Router();

const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.SID;

const client = require("twilio")(accountSid, authToken);

async function notifyLate() {
  let message = await Todo.checkIfLate();
  if (notifyLate != null && notifyLate.size != 0) {
    notifyLate.forEach((value) => {
        client.messages
      .create({
        to: value.phone,
        from: process.env.TWILIO_PHONE_NUM,
        body: value.message,
      })
      .then((message) => {
        console.log("message is:", message);
      });
    })
  }
}

setInterval(notifyLate, 6000);

//handles sms notications notifications
router.post("/notifylate", async (req, res, next) => {
  try {
    let message = await Todo.checkIfLate();
    res.status(200).json({ message: message });
    console.log("message is: ", message);
  } catch (error) {
    next(error);
  }
});

// example of a "protected endpoint" since it is using security middleware
router.post(
  "/addtask",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const publicUserFromDecodedToken = res.locals.user;
      const publicTask = await Todo.addTask(
        req.body,
        publicUserFromDecodedToken
      );

      res.status(201);
      res.json({ task: publicTask });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/alltasks",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const publicUserFromDecodedToken = res.locals.user;
      const allPublicTasks = await Todo.allTasks(publicUserFromDecodedToken);
      res.status(200);
      res.json({ allTasks: allPublicTasks });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/updatetask",
  security.requireAuthenticatedUser,
  permissions.authedUserOwnsTask,
  async (req, res, next) => {
    try {
      // needs taskId in req.body
      const publicUserFromDecodedToken = res.locals.user;
      const updatedPublicTask = await Todo.updateTask(
        req.body,
        publicUserFromDecodedToken
      );
      res.status(200);
      res.json({ task: updatedPublicTask });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/completetask",
  security.requireAuthenticatedUser,
  permissions.authedUserOwnsTask,
  async (req, res, next) => {
    try {
      // needs taskId in req.body as well
      const publicUserFromDecodedToken = res.locals.user;
      const completedPublicTask = await Todo.completeTask(
        req.body,
        publicUserFromDecodedToken
      );
      res.status(201);
      res.json({ completedTask: completedPublicTask });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/deletetask",
  security.requireAuthenticatedUser,
  permissions.authedUserOwnsTask,
  async (req, res, next) => {
    try {
      // req.body needs to look like { taskId: taskId }
      const publicUserFromDecodedToken = res.locals.user;
      const deletedTask = await Todo.deleteTask(
        req.body,
        publicUserFromDecodedToken
      );
      res.status(200);
      res.json({ deletedTask: deletedTask });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
