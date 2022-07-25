import React, { useEffect, useState } from "react";
import reactLogo from "../../assets/react.svg";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import Navbar from "../Navbar/Navbar";
import TodoPage from "../TodoPage/TodoPage";
import LandingPage from "../LandingPage/LandingPage";
import RecapPage from "../RecapPage/RecapPage";
import DashboardPage from "../DashboardPage/DashboardPage";
import apiClient from "../../../services/apiclient";
import "./App.css";
import NotFound from "../NotFound/NotFound";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import SocialPage from "../SocialPage/SocialPage";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [currPage, setCurrPage] = useState(null);
  // when app is mounted, check if token is stored in order to log in user automatically.
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();
      if (data) setUser(data.user);
      if (error) {
        setError(error);
      } else {
        setError(null);
      }
    };

    const token = window.localStorage.getItem("user_token");
    if (token) {
      apiClient.setToken(token);
      fetchUser();
    }
  }, []);

  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="App">
          <Navbar user={user} setUser={setUser} currPage={currPage} />
          <Routes>
            <Route
              path="/"
              element={<LandingPage user={user} setCurrPage={setCurrPage} />}
            />
            <Route
              path="/login"
              element={
                <LoginPage
                  user={user}
                  setUser={setUser}
                  setCurrPage={setCurrPage}
                />
              }
            />
            <Route
              path="/register"
              element={
                <RegisterPage
                  user={user}
                  setUser={setUser}
                  setCurrPage={setCurrPage}
                />
              }
            />
            <Route
              path="/dashboard"
              element={<DashboardPage user={user} setCurrPage={setCurrPage} />}
            />
            <Route
              path="/todo"
              element={<TodoPage user={user} setCurrPage={setCurrPage} />}
            />
            <Route
              path="/recap"
              element={<RecapPage user={user} setCurrPage={setCurrPage} />}
            />
            <Route path="/accessforbidden" element={<AccessForbidden setCurrPage={setCurrPage} />} />
            <Route
              path="*"
              element={<NotFound user={user} setCurrPage={setCurrPage} />}
            />
            <Route path ="/social" element={<SocialPage user={user} setCurrPage={setCurrPage}/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
