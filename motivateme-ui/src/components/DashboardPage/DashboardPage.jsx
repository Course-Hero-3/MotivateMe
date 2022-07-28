import React, { useState } from "react";
import "./DashboardPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import gradeIcon from "../../assets/Exam Grade.svg";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import GraphCard from "../GraphCard/GraphCard";
import apiClient from "../../../services/apiclient";
import moment from "moment";
import { TaskDetail } from "../TodoList/TodoList";

export default function DashboardPage({ user, setCurrPage }) {
  const [friends, setFriends] = useState(null);
  const [graphs, setGraphs] = React.useState(null);
  const [tasks, setTasks] = React.useState(null);
  const [latestGrade, setLatestGrade] = useState(null);
  const [showDetail, setShowDetail] = React.useState(null);

  // when mounted, update the page state
  // so the correct navbar renders
  React.useEffect(() => {
    const getInformation = async () => {
      let tempGraphs = await apiClient.getSummary();
      if (tempGraphs?.data) {
        setGraphs(returnRandomItemInArray(tempGraphs.data.summary));
      }
      let tempTasks = await apiClient.getAllTasks();
      if (tempTasks?.data) {
        setTasks(tempTasks.data.allTasks);
      }
      let { data, error } = await apiClient.getLatestGrade();
      if (data) {
        setLatestGrade(data.latestGrade.scoreWithPercentage);
      }
      let tempFriends = await apiClient.following();
      if (tempFriends?.data) {
        setFriends(tempFriends.data.following);
      }
      // if error when fetching user from token (happens if use refreshes)
    };

    getInformation();

    if (user !== null && user !== undefined) {
      setCurrPage("dashboard");
    }
  }, []);

  const returnRandomItemInArray = (arr) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  return (
    <>
      {user !== null && user !== undefined ? (
        <>
          <div className="dashboard-page">
            <div className="dashboard-columns d-flex flex-row">
              <div className="dashboard-column intro">
                <div className="dashboard-welcome">
                  <h1 className="dashboard-main-welcome">
                    Hey {user?.firstName}, Welcome to your dashboard!
                  </h1>
                </div>
                <Link to="/todo" className="dashboard-links">
                  <div className="total-task-card">
                    <div className="task-card-header">
                      <img
                        id="total-task-card-img"
                        src="https://freeiconshop.com/wp-content/uploads/edd/task-done-flat.png"
                        alt="Total Tasks Icon"
                      />
                      <h3 className="total-task-card-title">
                        Total Tasks Pending
                      </h3>
                    </div>
                    <span className="total-tasks"> {tasks?.length}</span>
                  </div>
                </Link>
                <Link to="/recap" className="dashboard-links">
                  <div className="latest-grade-card">
                    <div className="grade-card-header">
                      <img
                        id="total-task-card-img"
                        src={gradeIcon}
                        alt="lates grade icon"
                      />
                      <h3 className="latest-grade-card-title">Latest Grade</h3>
                    </div>
                    {latestGrade ? (
                      <>
                        <span className="latest-grade">{latestGrade}</span>
                      </>
                    ) : (
                      <>
                        <span className="latest-grade">N/A</span>
                      </>
                    )}
                  </div>
                </Link>
                <Link to="/social" className="dashboard-links">
                  <div className="friends-column">
                    <span className="friends-column-header">Friends</span>
                    <div className="friends d-flex flex-column">
                      {friends && friends.length > 0 ? (
                        friends.slice(0, 4).map((friend, idx) => {
                          if (idx < 8) {
                            return (
                              <div
                                key={idx}
                                className="friend d-flex flex-row align-items-center"
                              >
                                <img
                                  src={friend.profilePicture}
                                  className="friend-img"
                                  alt="friend-img"
                                  onError={(event) => {
                                    event.target.src =
                                      "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png";
                                    event.onerror = null;
                                  }}
                                />
                                <span className="friend-username">
                                  @{friend.username}
                                </span>
                              </div>
                            );
                          }
                        })
                      ) : (
                        <span className="no-friends-dash">
                          No friends... yet!
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
              <div className="d-flex flex-column">
                <div className="dashboard-stats">
                  {/* If there are graphs, then show them (if it is empty, intentionally don't show any message) */}
                  {graphs?.map((fact) => (
                    <Link to="/recap" className="dashboard-links">
                      <GraphCard chartInformation={fact} dashboardOn={true} />
                    </Link>
                  ))}
                </div>
                <Link to="/todo" className="dashboard-links">
                  <div className="dash-todo-viewer">
                    <TodoViewer
                      currentTasks={tasks}
                      setShowDetail={setShowDetail}
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <AccessForbidden setCurrPage={setCurrPage} />
        </>
      )}
      {showDetail ? (
        <TaskDetail
          name={showDetail.name}
          description={showDetail.description}
          category={showDetail.category}
          dueDate={showDetail.dueDate}
          dueTime={showDetail.dueTime}
          setShowDetail={setShowDetail}
          showDetail={showDetail}
        />
      ) : null}
    </>
  );
}

export function TodoViewer({ currentTasks, setShowDetail }) {
  return (
    <div className="todo-bulletin">
      <p className="todo-date">Today is: {moment(new Date()).format("llll")}</p>
      <h3 className="todo-title"> To Do</h3>
      <div className="todo-bulletin-area">
        <div className="todo-bulletin-tasks">
          {currentTasks && currentTasks.length > 0 ? (
            currentTasks?.map((task, idx) => {
              if (idx < 3) {
                return (
                  <MiniTodoCard
                    name={task.name}
                    category={task.category}
                    dueDate={task.dueDate}
                    dueTime={task.dueTime}
                    description={task.description}
                    setShowDetail={setShowDetail}
                  />
                );
              }
            })
          ) : (
            <span className="no-tasks-message">Nothing to do.</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function MiniTodoCard({
  name,
  category,
  dueDate,
  dueTime,
  description,
  setShowDetail,
  showDetail,
}) {
  const [colorState, setColorState] = useState(null);
  useEffect(() => {
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
  }, []);

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
    <div className={"mini-card "}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-list-check"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3.5 5.5l1.5 1.5l2.5 -2.5"></path>
        <path d="M3.5 11.5l1.5 1.5l2.5 -2.5"></path>
        <path d="M3.5 17.5l1.5 1.5l2.5 -2.5"></path>
        <line x1="11" y1="6" x2="20" y2="6"></line>
        <line x1="11" y1="12" x2="20" y2="12"></line>
        <line x1="11" y1="18" x2="20" y2="18"></line>
      </svg>
      <div
        className={"mini-card-content " + colorState}
        onClick={() => {
          setShowDetail({
            name,
            category,
            description,
            dueDate,
            dueTime,
            showDetail,
            setShowDetail,
          });
        }}
      >
        <h3 className="mini-card-name">{name}</h3>
        {/* Check whether to mark it as late or upcoming */}
        {taskIsLate() ? (
          <p className="late-text-dash">Late</p>
        ) : (
          <p className="upcoming-text-dash">In Progress</p>
        )}
        <p className="mini-card-date">Due {moment(dueDate).format("ll")}</p>
      </div>
    </div>
  );
}
