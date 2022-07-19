import React, { useEffect, useState } from 'react'
import reactLogo from '../../assets/react.svg'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from "../LoginPage/LoginPage"
import RegisterPage from "../RegisterPage/RegisterPage"
import Navbar from "../Navbar/Navbar"
import TodoPage from "../TodoPage/TodoPage"
import LandingPage from "../LandingPage/LandingPage"
import RecapPage from "../RecapPage/RecapPage"
import apiclient from '../../../services/apiclient';
import './App.css'
import About from "../About/About"

function App() {
const [user, setUser] = useState(null)

  useEffect(() => {
      const token = window.localStorage.getItem("user_token")
      if (token) {
        apiclient.setToken(token)
      }
    }
    
  , [])

  return (
    <React.Fragment>
      <BrowserRouter>
          <div className="App">
            <Navbar/>
            <Routes>
                <Route path = "/" element = {<LandingPage user = {user}/>} />
                <Route path = "/login" element = {<LoginPage user = {user} setUser = {setUser}/>} />
                <Route path = "/register" element = {<RegisterPage user = {user} setUser = {setUser}/> }/>
                <Route path = "/todo" element = {<TodoPage user = {user}/>} />
                <Route path = "/recap" element = {<RecapPage user = {user}/>} /> 
            </Routes>
          </div>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App