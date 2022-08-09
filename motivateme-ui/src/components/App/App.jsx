import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import SocialPage from "../SocialPage/SocialPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import SecurityChange from "../SecurityChange/SecurityChange";
import {
  useColorMode,
  ChakraProvider,
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();


  const [loggedInWithGoogle, setLoggedInWithGoogle] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

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
                    <LandingPage user={user} setCurrPage={setCurrPage} colorModeState = {colorMode}/>
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
                      colorModeState={colorMode}
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
                      colorModeState={colorMode}
                    />
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <DashboardPage user={user} setCurrPage={setCurrPage} colorModeState={colorMode} />
                  }
                />
                <Route
                  path="/todo"
                  element={<TodoPage user={user} setCurrPage={setCurrPage} colorModeState = {colorMode}/>}
                />
                <Route
                  path="/recap"
                  element={<RecapPage user={user} setCurrPage={setCurrPage} colorModeState={colorMode} />}
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
                      loggedInWithGoogle={loggedInWithGoogle}
                      colorMode={colorMode}
                      toggleColorMode={toggleColorMode}
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
