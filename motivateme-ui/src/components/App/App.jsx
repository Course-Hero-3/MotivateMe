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
import ProfilePage from "../ProfilePage/ProfilePage";
import SecurityChange from "../SecurityChange/SecurityChange";
import {
  ChakraProvider,
  theme,
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  useColorMode
} from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
// import  Toggle  from "../../../toggle";

function App() {
  const [loggedInWithGoogle, setLoggedInWithGoogle] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [colorModeState, setColorState] = useState("")
  const [currPage, setCurrPage] = useState(null);
  const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
  };
  const theme = extendTheme({ config });
  // when app is mounted, check if token is stored in order to log in user automatically.
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();
      if (data) {
        setUser(data.user);
        if (data.user.loggedInWithGoogle) {
          setLoggedInWithGoogle(true);
        }
      }
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
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          {/* <Toggle /> */}
        </ColorModeProvider>
        <React.Fragment>
          <BrowserRouter>
            <div className="App">
              <Navbar
                user={user}
                setUser={setUser}
                currPage={currPage}
                loggedInWithGoogle={loggedInWithGoogle}
                setLoggedInWithGoogle={setLoggedInWithGoogle}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <LandingPage user={user} setCurrPage={setCurrPage} colorModeState = {colorModeState}/>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <LoginPage
                      user={user}
                      setUser={setUser}
                      setCurrPage={setCurrPage}
                      loggedInWithGoogle={loggedInWithGoogle}
                      setLoggedInWithGoogle={setLoggedInWithGoogle}
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
                  element={
                    <DashboardPage user={user} setCurrPage={setCurrPage} />
                  }
                />
                <Route
                  path="/todo"
                  element={<TodoPage user={user} setCurrPage={setCurrPage} colorModeState = {colorModeState}/>}
                />
                <Route
                  path="/recap"
                  element={<RecapPage user={user} setCurrPage={setCurrPage} />}
                />
                <Route
                  path="/social"
                  element={<SocialPage user={user} setCurrPage={setCurrPage} />}
                />
                <Route
                  path="*"
                  element={<NotFound user={user} setCurrPage={setCurrPage} />}
                />
                <Route
                  path="/profile"
                  element={
                    <ProfilePage
                      user={user}
                      setUser={setUser}
                      setCurrPage={setCurrPage}
                      setColorState = {setColorState}
                      loggedInWithGoogle={loggedInWithGoogle}
                    />
                  }
                />
                <Route
                  path="/securepasswordchange"
                  element={
                    <SecurityChange
                      user={user}
                      setCurrPage={setCurrPage}
                      loggedInWithGoogle={loggedInWithGoogle}
                    />
                  }
                />
              </Routes>
            </div>
          </BrowserRouter>
        </React.Fragment>
      </ThemeProvider>
    </ChakraProvider>

  );
}

export default App;
