import React, { useEffect } from "react";
import { useState } from "react";
import "./TodoForm.css";

import apiClient from "../../../services/apiclient";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

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

export default function TodoForm({
  formType,
  setUpdateOrComplete,
  taskError,
  setTaskError,
  showModal,
  updateForm,
  completeForm,
  setUpdateForm,
  taskId,
  setCompleteForm,
  handleOnCompleteFormChange,
  handleOnUpdateFormChange,
  handleOnCompleteSubmit,
  handleOnUpdateSubmit,
  originalForm,
  handleOnDeleteTask,
  name,
  colorModeState,
}) {
  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
    category: "",
    dueDate: "",
    dueTime: "23:59",
  });
  const [createError, setCreateError] = useState(null);
  const toast = useToast();
  const handleOnCreateFormChange = (event) => {
    if (
      createError === "Name field is mandatory" &&
      event.target.name === "name" &&
      event.target.value.length > 0
    ) {
      setCreateError(null);
    }
    if (
      createError === "Category field is mandatory" &&
      event.target.name === "category" &&
      event.target.value.length > 0
    ) {
      setCreateError(null);
    }
    if (
      createError === "Due Date field is mandatory" &&
      event.target.name === "dueDate" &&
      event.target.value.length > 0
    ) {
      setCreateError(null);
    }
    if (
      createError === "Due Time field is mandatory" &&
      event.target.name === "dueTime" &&
      event.target.value.length > 0
    ) {
      setCreateError(null);
    }

    setCreateForm({ ...createForm, [event.target.name]: event.target.value });
  };

  const handleOnCreateSubmit = async (event) => {
    event.preventDefault();

    if (
      createForm.category.length !== 0 &&
      createForm.dueDate.length !== 0 &&
      createForm.name.length !== 0 &&
      createForm.dueTime.length !== 0
    ) {
      setCreateError(null);
    } else {
      if (createForm.name.length === 0) {
        setCreateError("Name field is mandatory");
        return;
      }
      if (createForm.category.length === 0) {
        setCreateError("Category field is mandatory");
        return;
      }
      if (createForm.dueDate.length === 0) {
        setCreateError("Due Date field is mandatory");
        return;
      }
      if (createForm.dueTime.length === 0) {
        setCreateError("Due Time field is mandatory");
        return;
      }
    }

    if (createError !== null) {
      return;
    }

    let ymd = createForm.dueDate.split("-");
    let hm = createForm.dueTime.split(":");
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
      ...createForm,
      dueDate: convertedDate,
      dueTime: convertedTime,
    };

    let { data, error } = await apiClient.addTask(convertedUpdatedForm);

    if (data?.task) {
      setCreateError(null);
      setCreateForm({
        name: "",
        description: "",
        category: "",
        dueDate: "",
        dueTime: "",
      });
      showModal("");
      toast({
        title: "Task succesfully created!",
        description: "",
        status: "info",
        duration: 6000,
        isClosable: true,
      });
    } else {
      setCreateError(error);
    }
  };
  return (
    <div className="todo-form">
      {formType === "create" ? (
        <TodoCreate
          handleOnCreateSubmit={handleOnCreateSubmit}
          handleOnCreateFormChange={handleOnCreateFormChange}
          showModal={showModal}
          createForm={createForm}
          setCreateForm={setCreateForm}
          createError={createError}
          colorModeState={colorModeState}
        />
      ) : null}

      {formType === "update" ? (
        <TodoUpdate
          updateForm={updateForm}
          setUpdateForm={setUpdateForm}
          handleOnUpdateFormChange={handleOnUpdateFormChange}
          handleOnUpdateSubmit={handleOnUpdateSubmit}
          setUpdateOrComplete={setUpdateOrComplete}
          originalForm={originalForm}
          handleOnDeleteTask={handleOnDeleteTask}
          taskError={taskError}
          setTaskError={setTaskError}
          colorModeState={colorModeState}
        />
      ) : null}

      {formType === "complete" ? (
        <TodoComplete
          name={name}
          showModal={showModal}
          completeForm={completeForm}
          setCompleteForm={setCompleteForm}
          handleOnCompleteFormChange={handleOnCompleteFormChange}
          handleOnCompleteSubmit={handleOnCompleteSubmit}
          taskId={taskId}
          setUpdateOrComplete={setUpdateOrComplete}
          taskError={taskError}
          setTaskError={setTaskError}
          colorModeState={colorModeState}
        />
      ) : null}
    </div>
  );
}

export function TodoCreate({
  showModal,
  createForm,
  setCreateForm,
  handleOnCreateFormChange,
  handleOnCreateSubmit,
  createError,
  colorModeState,
}) {
  const toast = useToast();

  return (
    <div className={`form_modal`}>
      <form
        className={
          colorModeState === "dark"
            ? "form_modal_content dark"
            : "form_modal_content light"
        }
      >
        <div className="form-header">
          <h2
            className={
              colorModeState === "dark" ? "form-title dark" : "form-title"
            }
          >
            Create{" "}
          </h2>
          {colorModeState === "dark" ? (
            <svg
              onClick={() => {
                showModal("");
                setCreateForm({
                  name: "",
                  description: "",
                  category: "",
                  dueDate: "",
                  dueTime: "",
                });
              }}
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-x"
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
                showModal("");
                setCreateForm({
                  name: "",
                  description: "",
                  category: "",
                  dueDate: "",
                  dueTime: "",
                });
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
        <div className="input-fields form">
          <div className="input-field form">
            <span className="task-name">Task Name</span>
            <input
              className="form-input form"
              type="text"
              name="name"
              placeholder="type task name"
              value={createForm.name}
              onChange={handleOnCreateFormChange}
            />
          </div>
          <div className="input-field form">
            <span className="task-name">Category</span>
            <div className="dropdown">
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {createForm.category.length === 0
                    ? "Select Category"
                    : createForm.category}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      handleOnCreateFormChange({
                        target: { name: "category", value: "test" },
                      });
                    }}
                  >
                    test
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleOnCreateFormChange({
                        target: { name: "category", value: "project" },
                      });
                    }}
                  >
                    project
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleOnCreateFormChange({
                        target: { name: "category", value: "homework" },
                      });
                    }}
                  >
                    homework
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleOnCreateFormChange({
                        target: { name: "category", value: "quiz" },
                      });
                    }}
                  >
                    quiz
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleOnCreateFormChange({
                        target: { name: "category", value: "essay" },
                      });
                    }}
                  >
                    essay
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
          <div className="split-input-field form">
            <div className="input-field form-split">
              <span className="task-name">Due Date</span>
              <input
                className="form-input split"
                type="date"
                name="dueDate"
                placeholder="type task name"
                value={createForm.dueDate}
                onChange={handleOnCreateFormChange}
              />
            </div>
            <div className="input-field form-split">
              <span className="task-name">Due Time</span>
              <input
                className="form-input split"
                type="time"
                name="dueTime"
                placeholder="type task name"
                value={createForm.dueTime}
                onChange={handleOnCreateFormChange}
              />
            </div>
          </div>
          <div className="notification-text">
            <p>You will receive a text message 1 hour before the due date.</p>
          </div>
          <div className="input-field form">
            <span className="task-name">Description</span>
            <textarea
              className="form-input description"
              type="text"
              name="description"
              placeholder="description..."
              value={createForm.description}
              onChange={handleOnCreateFormChange}
            ></textarea>
          </div>
          <div>
            <p
              className={`error-create${
                colorModeState === "dark" ? " lighter" : ""
              }`}
            >
              {createError ? createError : ""}
            </p>
          </div>
          <button
            className="form-submit-btn"
            type="button"
            onClick={(event) => {
              handleOnCreateSubmit(event);
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export function TodoUpdate({
  updateForm,
  setUpdateForm,
  handleOnUpdateFormChange,
  handleOnUpdateSubmit,
  originalForm,
  setUpdateOrComplete,
  handleOnDeleteTask,
  taskError,
  setTaskError,
  colorModeState,
}) {
  const toast = useToast();
  return (
    <div className={`form_modal`}>
      <form
        className={
          colorModeState === "dark"
            ? "form_modal_content dark"
            : "form_modal_content light"
        }
      >
        <div className="form-header">
          <h2
            className={
              colorModeState === "dark" ? "form-title dark" : "form-title"
            }
          >
            Update
          </h2>
          {colorModeState === "dark" ? (
            <svg
              onClick={() => {
                setUpdateOrComplete(null);
                setUpdateForm(originalForm);
                setTaskError(null);
              }}
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-x"
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
                setUpdateOrComplete(null);
                setUpdateForm(originalForm);
                setTaskError(null);
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
        <div className="input-fields form">
          <div className="input-field form">
            <span className="task-name">Edit Name</span>
            <input
              className="form-input form"
              name="name"
              placeholder="Type task Name"
              value={updateForm.name}
              onChange={(event) => {
                handleOnUpdateFormChange(event, updateForm, setUpdateForm);
              }}
            />
          </div>
          <div className="input-field form">
            <span className="task-name">Edit Category</span>
            <div className="dropdown">
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {updateForm.category.length === 0
                    ? "Select Category"
                    : updateForm.category}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      handleOnUpdateFormChange(
                        { target: { name: "category", value: "test" } },
                        updateForm,
                        setUpdateForm
                      );
                    }}
                  >
                    test
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleOnUpdateFormChange(
                        { target: { name: "category", value: "project" } },
                        updateForm,
                        setUpdateForm
                      );
                    }}
                  >
                    project
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleOnUpdateFormChange(
                        { target: { name: "category", value: "homework" } },
                        updateForm,
                        setUpdateForm
                      );
                    }}
                  >
                    homework
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleOnUpdateFormChange(
                        { target: { name: "category", value: "quiz" } },
                        updateForm,
                        setUpdateForm
                      );
                    }}
                  >
                    quiz
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleOnUpdateFormChange(
                        { target: { name: "category", value: "essay" } },
                        updateForm,
                        setUpdateForm
                      );
                    }}
                  >
                    essay
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
          <div className="split-input-field form">
            <div className="input-field form-split">
              <span className="task-name">Edit Due Date</span>
              <input
                className="form-input split"
                type="date"
                name="dueDate"
                placeholder="Type task Name"
                value={updateForm.dueDate}
                onChange={(event) => {
                  handleOnUpdateFormChange(event, updateForm, setUpdateForm);
                }}
              />
            </div>
            <div className="input-field form-split">
              <span className="task-name">Edit Due Time</span>
              <input
                className="form-input split"
                type="time"
                name="dueTime"
                placeholder="Type task Name"
                value={updateForm.dueTime}
                onChange={(event) => {
                  handleOnUpdateFormChange(event, updateForm, setUpdateForm);
                }}
              />
            </div>
          </div>
          <div className="input-field form">
            <span className="task-name">Edit Description</span>
            <textarea
              className="form-input description"
              name="description"
              placeholder="Type category"
              value={updateForm.description}
              onChange={(event) => {
                handleOnUpdateFormChange(event, updateForm, setUpdateForm);
              }}
            ></textarea>
          </div>
          <div>
            <p
              className={`error-create${
                colorModeState === "dark" ? " lighter" : ""
              }`}
            >
              {taskError ? taskError : ""}
            </p>
          </div>
          <div className="update-footer-buttons">
            <button
              className="form-submit-btn"
              type="button"
              onClick={(event) => {
                handleOnUpdateSubmit(event, updateForm, setUpdateOrComplete);
              }}
            >
              Update
            </button>
            <button
              className="form-delete-btn"
              type="button"
              onClick={(event) => {
                handleOnDeleteTask(event, updateForm.taskId);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export function TodoComplete({
  setUpdateOrComplete,
  setCompleteForm,
  completeForm,
  handleOnCompleteFormChange,
  handleOnCompleteSubmit,
  name,
  taskId,
  taskError,
  setTaskError,
  colorModeState,
}) {
  const toast = useToast();
  const [categoryQuery, setCategoryQuery] = useState("min");

  return (
    <div className={`form_modal`}>
      <div
        className={
          colorModeState === "dark"
            ? "form_modal_content dark"
            : "form_modal_content light"
        }
      >
        <div className="form-header">
          <h2
            className={
              colorModeState === "dark" ? "form-title dark" : "form-title"
            }
          >
            Complete
          </h2>
          {colorModeState === "dark" ? (
            <svg
              onClick={() => {
                setUpdateOrComplete("");
                setCompleteForm({
                  score: null,
                  timeSpent: null,
                  peopleWith: 0,
                  comment: "",
                  onTime: false,
                  taskId: taskId,
                  public: false,
                });
                setTaskError(null);
              }}
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-x"
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
                setUpdateOrComplete("");
                setCompleteForm({
                  score: null,
                  timeSpent: null,
                  peopleWith: 0,
                  comment: "",
                  onTime: false,
                  taskId: taskId,
                  public: false,
                });
                setTaskError(null);
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
        <div className="input-fields form">
          <div className="input-field">
            <span className="task-name">{name}</span>
          </div>
          <div className="input-field form">
            <span className="task-name">Score</span>
            <input
              className="form-input form"
              name="score"
              type="number"
              placeholder="Enter percent without % symbol"
              onChange={(event) => {
                handleOnCompleteFormChange(
                  event,
                  completeForm,
                  setCompleteForm
                );
              }}
            />
          </div>
          <div className="split-input-field form">
            <div className="input-field form-split">
              <span className="task-name"> # of People worked with</span>
              <input
                className="form-input split"
                name="peopleWith"
                type="number"
                placeholder="People worked with"
                value={completeForm.peopleWith}
                onChange={(event) => {
                  handleOnCompleteFormChange(
                    event,
                    completeForm,
                    setCompleteForm
                  );
                }}
              />
            </div>
            <div className="input-field form-split">
              <div className="change-measurement">
                <div className="time-spent">
                  <span className="task-name">Time Spent</span>
                  <input
                    className="form-input split-twice time-spent"
                    type="number"
                    name="timeSpent"
                    placeholder="Time"
                    onChange={(event) => {
                      handleOnCompleteFormChange(
                        event,
                        completeForm,
                        setCompleteForm
                      );
                    }}
                  />
                </div>

                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {categoryQuery || "Min"}
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => setCategoryQuery("min")}>
                      min
                    </MenuItem>
                    <MenuItem onClick={() => setCategoryQuery("hour")}>
                      hour
                    </MenuItem>
                    <MenuItem onClick={() => setCategoryQuery("day")}>
                      day
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
          </div>
          <div className="input-field form">
            <span className="task-name">Comments</span>
            <textarea
              className="form-input description"
              name="comment"
              type="text"
              placeholder="Add any comments"
              onChange={(event) => {
                handleOnCompleteFormChange(
                  event,
                  completeForm,
                  setCompleteForm
                );
              }}
            ></textarea>
          </div>
          <div className="checkbox">
            <Checkbox
              size="lg"
              colorScheme="green"
              name="public"
              onChange={(event) => {
                handleOnCompleteFormChange(
                  event,
                  completeForm,
                  setCompleteForm
                );
              }}
            >
              Public
            </Checkbox>
            <Checkbox
              size="lg"
              colorScheme="green"
              name="onTime"
              onChange={(event) => {
                handleOnCompleteFormChange(
                  event,
                  completeForm,
                  setCompleteForm
                );
              }}
            >
              On Time
            </Checkbox>
          </div>

          <div>
            <p
              className={`error-create${
                colorModeState === "dark" ? " lighter" : ""
              }`}
            >
              {taskError ? taskError : ""}
            </p>
          </div>
          <button
            className="form-submit-btn"
            type="button"
            onClick={(event) => {
              handleOnCompleteSubmit(event, completeForm, categoryQuery);
            }}
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
}
