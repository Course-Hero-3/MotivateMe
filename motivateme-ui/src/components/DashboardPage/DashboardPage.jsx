import React, { useState } from "react";
import "./DashboardPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AccessForbidden from "../AccessForbidden/AccessForbidden"
import GraphCard from "../GraphCard/GraphCard";
import apiClient from "../../../services/apiclient";
import moment from "moment";

export default function DashboardPage({ user, setCurrPage }) {
  const [graphs, setGraphs] = React.useState(null);
  const [tasks, setTasks] = React.useState(null);
  const [singleFact, setSingleFact] = useState(null)
  const currentDate = new Date()
  const navigate = useNavigate();
  // when mounted, update the page state
  // so the correct navbar renders
  React.useEffect(() => {
    const getInformation = async () => {
      let tempGraphs = await apiClient.getSummary();
      if (tempGraphs?.data) {
        setGraphs(tempGraphs.data.summary);
        if (graphs){
          returnRandomItemInArray(graphs)
        }
      }
      let tempTasks = await apiClient.getAllTasks();
      if (tempTasks?.data) {
        setTasks(tempTasks.data.allTasks);
      }
      // if error when fetching user from token (happens if use refreshes)

    };
   
    getInformation();

    if (user!==null && user!== undefined) {
      setCurrPage("dashboard");

    }  }, [setSingleFact]);

  const returnRandomItemInArray = (arr) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return (shuffled.slice(0, 2))
  };

  return (
    <>{
      user!==null && user!== undefined?<>
      <div className="dashboard-page">
      <div className="dashboard-columns">
        <div className="dashboard-column intro">
          <div className="dashboard-welcome">
            <h1 className="dashboard-main-welcome">Hey {user?.firstName}, Welcome to your dashboard!</h1>
          </div>
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
          <div className="total-task-card">
           <div className="task-card-header">
            <img
                id="total-task-card-img"
                src="https://freeiconshop.com/wp-content/uploads/edd/task-done-flat.png"
                alt="Total Tasks Icon"
              />
              <h3 className="latest-grade-card-title">
                Latest Grade
              </h3>
           </div>
              <span className="total-tasks"> {tasks?.length}</span>
          </div>
          <div className="friends-column">
              <span className="friends-column-header">
                 Friends
              </span>   
          </div>
        </div>
        <div className="d-flex flex-column">
          {/* <div className="welcome-card">
            <img
              id="dashboard-pfp"
              src={user?.image}
              alt="Profile Picture"
              onError={(event) => {
                event.target.src =
                  "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png";
                event.onerror = null;
              }}
            />
            <h3 id="dashboard-welcome-text">{`Hey ${user?.firstName}! Welcome to your dashboard`}</h3>
          </div> */}
          <div className="dashboard-stats">
                  {graphs? returnRandomItemInArray(graphs).map((fact) => (
                      <GraphCard chartInformation={fact} dashboardOn={true}/>
                  )):<h2 className="no-data-dash">Nothing to show here!</h2>}
          </div>
          <div className="dash-todo-viewer">
              <TodoViewer currentTasks={tasks}/>
          </div>
        </div>
      </div>
    </div>
      </>:<><AccessForbidden setCurrPage={setCurrPage}/></>

    }</>
  
  );
}

export function TodoViewer({currentTasks}) {

  return (
    <div className="todo-bulletin">
      <p className="todo-date">Today is: {moment(new Date()).format("llll")}</p>
      <h3 className="todo-title"> To Do</h3>
      <div className="todo-bulletin-area">
      {currentTasks?currentTasks?.map((task, idx) => {
        if (idx < 3){
          return (<MiniTodoCard name = {task.name} category = {task.category}/>)
        }
      }):<span className="no-tasks-message">Nothing to show here... </span>}
      </div>
    </div>
  )
}

export function MiniTodoCard ({name, category}) {
  const [colorState, setColorState] = useState(null)
  useEffect(() => {
    if (category.toLowerCase() === "homework") {
      setColorState("blue")
    }
    else if (category.toLowerCase() === "test"){
      setColorState("orange")
    }
    else if (category.toLowerCase() === "quiz"){
      setColorState("purple")
    }
    else if (category.toLowerCase() === "project"){
      setColorState("green")
    }
    else if (category.toLowerCase() === "essay"){
      setColorState("yellow")
    }   

  }, [])
    return (
      <div className={"mini-card "}>
       <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-list-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M3.5 5.5l1.5 1.5l2.5 -2.5"></path>
   <path d="M3.5 11.5l1.5 1.5l2.5 -2.5"></path>
   <path d="M3.5 17.5l1.5 1.5l2.5 -2.5"></path>
   <line x1="11" y1="6" x2="20" y2="6"></line>
   <line x1="11" y1="12" x2="20" y2="12"></line>
   <line x1="11" y1="18" x2="20" y2="18"></line>
</svg>
          <span className={"card-name " + colorState}>{name}</span>
      </div>
    )
}
