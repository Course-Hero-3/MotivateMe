import React, { useEffect, useState } from 'react'
import reactLogo from '../../assets/react.svg'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from "../LoginPage/LoginPage"
import RegisterPage from "../RegisterPage/RegisterPage"
import Navbar from "../Navbar/Navbar"
import TodoPage from "../TodoPage/TodoPage"
import LandingPage from "../LandingPage/LandingPage"
import RecapPage from "../RecapPage/RecapPage"
import apiClient from '../../../services/apiclient';
import './App.css'

function App() {
const [user, setUser] = useState(null)
const [error, setError] = useState(null)
const [currPage, setCurrPage] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken()
      if (data) setUser(data.user)
      if (error) {
        setError(error)
      }
      else {
        setError(null)
      }
    }

      const token = window.localStorage.getItem("user_token")
      if (token) {
        apiClient.setToken(token)
        fetchUser()
      }
    }, [])

  return (
    <React.Fragment>
      <BrowserRouter>
          <div className="App">
            <Navbar user={user} 
                    setUser={setUser}
                    currPage={currPage} />
            <Routes>
                <Route path = "/" element = {<LandingPage user = {user}
                                                          setCurrPage={setCurrPage}/>} />
                <Route path = "/login" element = {<LoginPage user = {user} 
                                                            setUser = {setUser}
                                                            setCurrPage={setCurrPage}/>} />
                <Route path = "/register" element = {<RegisterPage user = {user} 
                                                                    setUser = {setUser}
                                                                    setCurrPage={setCurrPage}/> }/>
                <Route path = "/todo" element = {<TodoPage setCurrPage={setCurrPage}/>} />
                <Route path = "/recap" element = {<RecapPage setCurrPage={setCurrPage} />} /> 
            </Routes>
          </div>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
