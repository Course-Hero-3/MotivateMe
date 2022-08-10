import React, { useEffect } from "react";
import "./TodoList.css";
import {
  BsCalendar,
  BsInfoCircle,
  BsPencil,
  BsCheckCircle,
} from "react-icons/bs";
import TodoForm from "../TodoForm/TodoForm";
import { useState } from "react";

import moment, { min } from "moment";

import apiClient from "../../../services/apiclient";
import { color, Icon } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
String.prototype.replaceAt = function (index, replacement) {
  if (index >= this.length) {
    return this.valueOf();
  }

  return this.substring(0, index) + replacement + this.substring(index + 1);
};

export default function TodoList({ showModal, modalSelected, colorModeState }) {
  /**useEffect
   * handle
   */
  const [tasks, setTasks] = useState(null);
  const toast = useToast();
  //const [searchTasks, setSearchTasks] = useState(null)
  const [searchBarQuery, setQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [taskError, setTaskError] = useState(null);
  const [refreshTasks, setRefreshTasks] = useState(false);

  const fixRegexSpecialCharacters = (str) => {
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "+") {
        str = str.replaceAt(i, "\\+");
        i += 1;
      }
      // [ , ] , { , } , | , \
      else if (str[i] === ".") {
        str = str.replaceAt(i, "\\.");
        i += 1;
      } else if (str[i] === "*") {
        str = str.replaceAt(i, "\\*");
        i += 1;
      } else if (str[i] === "?") {
        str = str.replaceAt(i, "\\?");
        i += 1;
      } else if (str[i] === "^") {
        str = str.replaceAt(i, "\\^");
        i += 1;
      } else if (str[i] === "$") {
        str = str.replaceAt(i, "\\$");
        i += 1;
      } else if (str[i] === "(") {
        str = str.replaceAt(i, "\\(");
        i += 1;
      } else if (str[i] === ")") {
        str = str.replaceAt(i, "\\)");
        i += 1;
      } else if (str[i] === "[") {
        str = str.replaceAt(i, "\\[");
        i += 1;
      } else if (str[i] === "]") {
        str = str.replaceAt(i, "\\]");
        i += 1;
      } else if (str[i] === "{") {
        str = str.replaceAt(i, "\\{");
        i += 1;
      } else if (str[i] === "}") {
        str = str.replaceAt(i, "\\}");
        i += 1;
      } else if (str[i] === "|") {
        str = str.replaceAt(i, "\\|");
        i += 1;
      } else if (str[i] === "\\") {
        str = str.replaceAt(i, "\\");
        i += 1;
      }
    }
    return str;
  };

  /**gets the tasks that match users search query */
  const searchTasks = tasks?.filter((task) => {
    let fixedSearchBarQuery = fixRegexSpecialCharacters(searchBarQuery);
    if (
      task.name.toLowerCase().match(fixedSearchBarQuery.toLowerCase()) !==
        null &&
      categoryQuery === ""
    ) {
      return true;
    } else if (
      categoryQuery === "Date" &&
      tasks.sort((a, b) => {
        b.dueDate - a.dueDate;
      })
    ) {
      return true;
    } else if (
      task.name.toLowerCase().match(fixedSearchBarQuery.toLowerCase()) !==
        null &&
      categoryQuery === task.category
    ) {
      return true;
    } else {
      return false;
    }
  });

  /**get the most recent updated tasks */
  useEffect(() => {
    const getTasks = async () => {
      let currentTasks = await apiClient.getAllTasks();
      if (currentTasks?.data) {
        setTasks(currentTasks.data.allTasks);
      }
    };
    getTasks();
  }, [
    refreshTasks,
    modalSelected,
    searchBarQuery,
    categoryQuery,
    setCategoryQuery,
  ]);

  const handleOnUpdateFormChange = (event, updateForm, setUpdateForm) => {
    // first check if it got set to 0
    if (event.target.name === "name" && event.target.value.length === 0) {
      setTaskError("Name field cannot be left empty");
    }
    if (event.target.name === "category" && event.target.value.length === 0) {
      setTaskError("Category field cannot be left empty");
    }
    if (event.target.name === "dueDate" && event.target.value.length === 0) {
      setTaskError("Due Date field cannot be left empty");
    } else if (
      event.target.name === "dueDate" &&
      taskError === "Date and/or Time missing"
    ) {
      setTaskError(null);
    }
    if (event.target.name === "dueTime" && event.target.value.length === 0) {
      setTaskError("Due Time field cannot be left empty");
    } else if (
      event.target.name === "dueTime" &&
      taskError === "Date and/or Time missing"
    ) {
      setTaskError(null);
    }

    // check if prior submits had anything set equal to zero
    if (
      taskError === "Name field cannot be left empty" &&
      event.target.name === "name" &&
      event.target.value.length > 0
    ) {
      setTaskError(null);
    }
    if (
      taskError === "Category field cannot be left empty" &&
      event.target.name === "category" &&
      event.target.value.length > 0
    ) {
      setTaskError(null);
    }
    if (
      taskError === "Due Date field cannot be left empty" &&
      event.target.name === "dueDate" &&
      event.target.value.length > 0
    ) {
      setTaskError(null);
    }
    if (
      taskError === "Due Time field is cannot be left empty" &&
      event.target.name === "dueTime" &&
      event.target.value.length > 0
    ) {
      setTaskError(null);
    }
    // update the form after all the checks regardless
    setUpdateForm({ ...updateForm, [event.target.name]: event.target.value });
  };

  const handleOnUpdateSubmit = async (
    event,
    updateForm,
    setUpdateOrComplete
  ) => {
    event.preventDefault();

    // check if all required fields are filled
    if (
      updateForm.category.length !== 0 &&
      updateForm.dueDate.length !== 0 &&
      updateForm.name.length !== 0 &&
      updateForm.dueTime.length !== 0
    ) {
      setTaskError(null);
    } else {
      // if not then check which one and return
      if (updateForm.name.length === 0) {
        setTaskError("Name field cannot be left empty");
        return;
      }
      if (updateForm.category.length === 0) {
        setTaskError("Category field cannot be left empty");
        return;
      }
      if (updateForm.dueDate.length === 0) {
        setTaskError("Due Date field cannot be left empty");
        return;
      }
      if (updateForm.dueTime.length === 0) {
        setTaskError("Due Time field cannot be left empty");
        return;
      }
    }
    // if error message exists, return and don't submit
    if (taskError !== null) {
      return;
    }

    try {
      let ymd = updateForm.dueDate.split("-");
      let hm = updateForm.dueTime.split(":");
      let convertedUTC = new Date(
        Number(ymd[0]),
        Number(ymd[1]) - 1,
        Number(ymd[2]),
        Number(hm[0]),
        Number(hm[1])
      ).toISOString();
      let split = convertedUTC.split("T");
      let convertedDate = split[0];
      let convertedTime = split[1].slice(0, -8);
      let convertedUpdatedForm = {
        ...updateForm,
        dueDate: convertedDate,
        dueTime: convertedTime,
      };

      let { data, error } = await apiClient.updateTask(convertedUpdatedForm);

      if (data?.task) {
        setTaskError(null);
        setRefreshTasks(!refreshTasks);
        setUpdateOrComplete(null);
        toast({
          title: "Task succesfully updated!",
          description: "",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      } else {
        setTaskError(error);
      }
    } catch (error) {
      setTaskError("Date and/or Time missing");
    }
  };
  /**handles updating the task forms */
  const handleOnCompleteFormChange = (event, completeForm, setCompleteForm) => {
    if (event.target.name === "score" && event.target.value.length === 0) {
      setTaskError("Score field cannot be left empty");
    }
    if (event.target.name === "score" && event.target.value > 200) {
      setTaskError("Score field cannot surpass 200%");
    }
    if (event.target.name === "score" && event.target.value < 0) {
      setTaskError("Negative percentages are not possible.");
    }
    if (
      event.target.name === "score" &&
      event.target.value >= 0 &&
      event.target.value <= 200
    ) {
      if (
        taskError === "Negative percentages are not possible." ||
        "Score field cannot surpass 200%"
      ) {
        setTaskError(null);
      }
    }
    if (event.target.name === "timeSpent" && event.target.value.length === 0) {
      setTaskError("Time Spent field cannot be left empty");
    }

    // check if prior submits had anything set equal to zero
    if (
      taskError === "Score field cannot be left empty" &&
      event.target.name === "score" &&
      event.target.value.length > 0
    ) {
      setTaskError(null);
    }
    if (
      taskError === "Time Spent field cannot be left empty" &&
      event.target.name === "timeSpent" &&
      event.target.value.length > 0
    ) {
      setTaskError(null);
    }

    if (event.target.name === "onTime") {
      let newObject = completeForm;
      newObject.onTime = !completeForm.onTime;
      setCompleteForm(newObject);
      return;
    } else if (event.target.name === "public") {
      let newObject = completeForm;
      newObject.public = !completeForm.public;
      setCompleteForm(newObject);
      return;
    }
    setCompleteForm({
      ...completeForm,
      [event.target.name]: event.target.value,
    });
  };

  /** handles submitting a task*/
  const handleOnCompleteSubmit = async (
    event,
    completeForm,
    timeMeasurement
  ) => {
    event.preventDefault();

    if (
      completeForm.score !== null &&
      completeForm.score.length !== 0 &&
      completeForm.timeSpent !== null &&
      completeForm.timeSpent.length !== 0
    ) {
      setTaskError(null);
    } else {
      // if not then check which one and return
      if (completeForm.score === null || completeForm.score.length === 0) {
        setTaskError("Score field cannot be left empty");
        return;
      }
      if (
        completeForm.timeSpent === null ||
        completeForm.timeSpent.length === 0
      ) {
        setTaskError("Time Spent field cannot be left empty");
        return;
      }
    }
    // if error message exists, return and don't submit
    if (taskError !== null) {
      return;
    }

    let updatedCompleteForm = { ...completeForm };

    if (timeMeasurement === "hour") {
      updatedCompleteForm.timeSpent = completeForm.timeSpent * 60;
    } else if (timeMeasurement === "day") {
      updatedCompleteForm.timeSpent = completeForm.timeSpent * 1440;
    }

    let { data, error } = await apiClient.completeTask(updatedCompleteForm);

    if (data?.completedTask) {
      setTaskError("");
      setRefreshTasks(!refreshTasks);
      toast({
        title: "Task succesfully completed!",
        description: "",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    } else {
      setTaskError(error);
    }
  };

  /*handles deleting a task*/
  const handleOnDeleteTask = async (event, taskId) => {
    event.preventDefault();
    let { data, error } = await apiClient.deleteTask({ taskId: taskId });

    if (data?.deletedTask) {
      setTaskError("");
      setRefreshTasks(!refreshTasks);
      toast({
        title: "Task succesfully deleted!",
        description: "",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
    } else {
      setTaskError(error);
    }
  };

  /** changes the searchBarQuery state based on the users search input*/
  const handleOnQueryChange = (event) => {
    setQuery(event.target.value);
  };

  /**render a card with info for each task the user has */
  return (
    <div className="todo-list">
      <div className="todo-list-header">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {categoryQuery || "Category"}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setCategoryQuery("")}>All</MenuItem>
            <MenuItem onClick={() => setCategoryQuery("homework")}>
              Homework
            </MenuItem>
            <MenuItem onClick={() => setCategoryQuery("test")}>Test</MenuItem>
            <MenuItem onClick={() => setCategoryQuery("quiz")}>Quiz</MenuItem>
            <MenuItem onClick={() => setCategoryQuery("project")}>
              Project
            </MenuItem>
            <MenuItem onClick={() => setCategoryQuery("essay")}>Essay</MenuItem>
          </MenuList>
        </Menu>
        <form className="task-form">
          <button className="task-form-btn">
            {" "}
            <svg viewBox="0 0 1024 1024">
              <path
                className="path1"
                d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"
              ></path>
            </svg>
          </button>
          <input
            type="search"
            value={searchBarQuery}
            onChange={(event) => {
              handleOnQueryChange(event);
            }}
            id="query"
            name="q"
            className="task-form-search"
            placeholder="Search..."
            role="search"
            aria-label="Search through site content"
          />
        </form>
        <svg
          onClick={() => {
            showModal("create");
          }}
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-circle-plus todo-btn create"
          width="65"
          height="65"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#00abfb"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="12" r="9" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="12" y1="9" x2="12" y2="15" />
        </svg>
      </div>
      <div className="todo-list-wrapper d-flex flex-column justify-content-flex-start align-items-center">
        {searchTasks?.length === 0 ? (
          <>
            <h3 className="todo-no-tasks">
              You currently don't have any tasks to complete!
            </h3>
          </>
        ) : (
          <>
            {searchTasks?.map((task) => {
              // Convert all UTC times back to client's local date/time
              let convertedDateAndTime = new Date(
                task.dueDate.slice(0, 10) + " " + task.dueTime + " UTC"
              );
              let localizedTime = "";
              let hour = String(convertedDateAndTime.getHours());
              if (hour.length === 1) {
                localizedTime += `0${hour}:`;
              } else {
                localizedTime += `${hour}:`;
              }
              let minutes = String(convertedDateAndTime.getMinutes());
              if (minutes.length === 1) {
                localizedTime += `0${minutes}:00`;
              } else {
                localizedTime += `${minutes}:00`;
              }
              return (
                <TodoCard
                  taskError={taskError}
                  setTaskError={setTaskError}
                  taskId={task.taskId}
                  name={task.name}
                  category={task.category}
                  dueDate={convertedDateAndTime}
                  dueTime={localizedTime}
                  description={task.description}
                  showModal={showModal}
                  modalSelected={modalSelected}
                  key={task.taskId}
                  handleOnUpdateFormChange={handleOnUpdateFormChange}
                  handleOnUpdateSubmit={handleOnUpdateSubmit}
                  handleOnCompleteFormChange={handleOnCompleteFormChange}
                  handleOnCompleteSubmit={handleOnCompleteSubmit}
                  handleOnDeleteTask={handleOnDeleteTask}
                  handleQuery={handleOnQueryChange}
                  query={query}
                  setQuery={setQuery}
                  colorModeState={colorModeState}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

/**display info about each task */
export function TodoCard({
  name,
  description,
  category,
  dueDate,
  dueTime,
  handleOnCompleteFormChange,
  handleOnCompleteSubmit,
  taskId,
  handleOnUpdateFormChange,
  handleOnUpdateSubmit,
  handleOnDeleteTask,
  taskError,
  setTaskError,
  handleQuery,
  colorModeState,
}) {
  /**states */
  const [updateForm, setUpdateForm] = useState({
    name: name,
    description: description,
    category: category,
    dueDate: moment(dueDate).format("YYYY-MM-DD"),
    dueTime: dueTime,
    taskId: taskId,
  });

  const originalForm = {
    name: name,
    description: description,
    category: category,
    dueDate: moment(dueDate).format("YYYY-MM-DD"),
    dueTime: dueTime,
    taskId: taskId,
  };
  const [completeForm, setCompleteForm] = useState({
    score: null,
    timeSpent: null,
    peopleWith: 0,
    comment: "",
    onTime: false,
    taskId: taskId,
    public: false,
  });
  const [updateOrComplete, setUpdateOrComplete] = useState(null);
  const [colorState, setColorState] = useState("default");
  const [showDetail, setShowDetail] = useState(null);

  //changes the card colors based on the category of the task given
  useEffect(() => {
    if (colorModeState === "light") {
      if (category.toLowerCase() === "homework") {
        setColorState("blue");
      } else if (category.toLowerCase() === "test") {
        setColorState("orange");
      } else if (category.toLowerCase() === "quiz") {
        setColorState("purple");
      } else if (category.toLowerCase() === "project") {
        setColorState("green");
      } else if (category.toLowerCase() === "essay") {
        setColorState("yellow");
      }
    } else {
      setColorState("dark-color");
    }
  }, [updateForm, handleOnUpdateSubmit]);

  /**determines if the task is late */
  const taskIsLate = () => {
    let currentDate = new Date();
    let newDueDate = new Date(moment(dueDate).format(`YYYY-MM-DDT${dueTime}`));
    if (currentDate.getTime() > newDueDate.getTime()) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={"todo-card " + colorState}>
      <div className="card-body d-flex flex-row justify-content-between align-items-center">
        <div className="name-wrapper">
          <span className="name">{name}</span>
        </div>
        <div className="due-date-wrapper">
          <BsCalendar id="date-icon" size={25} />
          {/* <img src={BsClipboardData} className="due-icon" /> */}
          <span className="due-date">
            {moment(dueDate).format("MMMM Do YYYY")}
          </span>
        </div>
        {taskIsLate() ? (
          <span
            className={`late-task${colorModeState === "dark" ? " lighter" : ""}`}
          >
            Late
          </span>
        ) : (
          <span className="ontime-task">In Progress</span>
        )}

        <div className="form-icons">
          <BsPencil
            size={25}
            className="form-icon"
            onClick={() => {
              setUpdateOrComplete("update");
            }}
          />
          {/* <img
            className="form-icon  mobile"
            src={BsPencil}
            alt="update-icon"
            onClick={() => {
              setUpdateOrComplete("update");
            }}
          /> */}
          <BsCheckCircle
            className="form-icon"
            size={25}
            onClick={() => {
              setUpdateOrComplete("complete");
            }}
          />
          {/* <img
            className="form-icon  mobile"
            src={BsCheckCircle}
            alt="complete-icon"
            onClick={() => {
              setUpdateOrComplete("complete");
            }}
          /> */}
          {/* <IconButton icon={<InfoIcon w={8} h={8} color="black"/>}/> */}

          <BsInfoCircle
            size={25}
            alt="form-icon mobile"
            className="form-icon"
            onClick={() => {
              setShowDetail({ name, description, category, dueDate, dueTime });
            }}
          />
          {/* <svg
            alt="form-icon mobile"
            id="form-icon-info"
            onClick={() => {
              setShowDetail({ name, description, category, dueDate, dueTime });
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-info-circle"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
            <polyline points="11 12 12 12 12 16 13 16" />
          </svg> */}
        </div>
      </div>
      {updateOrComplete === "update" ? (
        <TodoForm
          formType={"update"}
          updateForm={updateForm}
          setUpdateForm={setUpdateForm}
          handleOnUpdateFormChange={handleOnUpdateFormChange}
          handleOnUpdateSubmit={handleOnUpdateSubmit}
          originalForm={originalForm}
          setUpdateOrComplete={setUpdateOrComplete}
          handleOnDeleteTask={handleOnDeleteTask}
          taskError={taskError}
          setTaskError={setTaskError}
          colorModeState={colorModeState}
        />
      ) : null}
      {updateOrComplete === "complete" ? (
        <TodoForm
          formType={"complete"}
          completeForm={completeForm}
          setCompleteForm={setCompleteForm}
          handleOnCompleteFormChange={handleOnCompleteFormChange}
          handleOnCompleteSubmit={handleOnCompleteSubmit}
          taskId={taskId}
          setUpdateOrComplete={setUpdateOrComplete}
          taskError={taskError}
          setTaskError={setTaskError}
          name={name}
          colorModeState={colorModeState}
        />
      ) : null}
      {showDetail ? (
        <TaskDetail
          name={showDetail.name}
          description={showDetail.description}
          category={showDetail.category}
          dueDate={showDetail.dueDate}
          dueTime={showDetail.dueTime}
          setShowDetail={setShowDetail}
          showDetail={showDetail}
          colorModeState={colorModeState}
        />
      ) : null}
    </div>
  );
}
/*when a user clicks on a task, displays detailed info about the task*/
export function TaskDetail({
  name,
  description,
  category,
  dueDate,
  dueTime,
  showDetail,
  setShowDetail,
  colorModeState,
}) {
  return (
    <React.Fragment>
      {showDetail !== null ? (
        <div className="task-detail-card task_modal">
          <div
            className={
              colorModeState === "dark"
                ? "task_modal_content dark"
                : "task_modal_content light"
            }
          >
            <div className="task-header">
              <h2
                className={
                  colorModeState === "dark"
                    ? "task-detail-name dark"
                    : "task-detail-name"
                }
              >
                {name}
              </h2>
              {colorModeState === "dark" ? (
                <svg
                  onClick={() => {
                    setShowDetail(null);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-x"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#ffffff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  onClick={() => {
                    setShowDetail(null);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-x"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </div>
            <div className="task-detail-body">
              <span className="task-detail-category">{category}</span>
              <div readOnly className="detail-description">
                {description}
              </div>
            </div>
            <div className="task-detail-footer">
              <span className="task-detail-due">
                Due: {moment(dueDate).format("MMMM Do YYYY")} at{" "}
                {moment(dueTime, "HH:mm:ss").format("hh:mm A")}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
