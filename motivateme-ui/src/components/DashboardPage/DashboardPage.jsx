import React from "react";
import "./DashboardPage.css";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../../services/apiclient";
import moment from "moment";

export default function DashboardPage({ user, setCurrPage }) {
  const [graphs, setGraphs] = React.useState(null);
  const [tasks, setTasks] = React.useState(null);
  const navigate = useNavigate();
  // when mounted, update the page state
  // so the correct navbar renders
  React.useEffect(() => {
    const getInformation = async () => {
      let tempGraphs = await apiClient.getSummary();
      if (tempGraphs?.data) {
        setGraphs(tempGraphs.data.summary);
      }
      let tempTasks = await apiClient.getAllTasks();
      if (tempTasks?.data) {
        setTasks(tempTasks.data.allTasks);
      }
    };
    // if user is not logged in, then redirect to access forbidden
    if (user === null) {
      navigate("/accessforbidden");
    }
    // get info for user and set curr page to dashboard
    getInformation();
    setCurrPage("dashboard");
  }, []);

  const returnRandomItemInArray = (arr) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled[0];
  };

  return (
    <div className="dashboard-page">
      <div className="three-columns">
        <div className="column">
          <div className="total-task-card">
            <img
              id="total-task-card-img"
              src="https://freeiconshop.com/wp-content/uploads/edd/task-done-flat.png"
              alt="Total Tasks Icon"
            />
            <h3 className="total-task-card-title">
              Total Tasks Pending: {tasks?.length}
            </h3>
          </div>
        </div>
        <div className="column">
          <div className="welcome-card">
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
          </div>
        </div>
        <div className="column">
          <div className="todo-bulletin">
            <p className="todo-date">Date</p>
            <h3 className="todo-title">Title</h3>
            <div className="todo-bulletin-area">
              <p>card</p>
              <p>card</p>
              <p>card</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
