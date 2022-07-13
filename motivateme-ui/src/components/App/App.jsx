import React, { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from "../LoginPage/LoginPage"
import RegisterPage from "../RegisterPage/RegisterPage"
import Navbar from "../Navbar/Navbar"
import TodoPage from "../TodoPage/TodoPage"
import LandingPage from "../LandingPage/LandingPage"
import './App.css'
import About from "../About/About"

function App() {
  const [count, setCount] = useState(0)

  return (
    <React.Fragment>
      <BrowserRouter>
          <div className="App">
            <Routes>
            <Route path = "/" element = {<Navbar/>}/>
                <Route path = "/" element = {<LandingPage/>} />
                <Route path = "/login" element = {<LoginPage/>}/>
                <Route path = "/register" element = {<RegisterPage/>}/>
                <Route path = "/ToDo" element = {<TodoPage/>}/>
            </Routes>
          </div>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
