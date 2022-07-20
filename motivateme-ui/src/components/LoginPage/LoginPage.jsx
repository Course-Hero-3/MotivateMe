import React from 'react'
import{ useEffect, useState } from 'react'
import "./LoginPage.css"
import apiClient  from '../../../services/apiclient'
import { Link } from 'react-router-dom'

 import { useNavigate } from 'react-router-dom'


export default function LoginPage({user, setUser,setCurrPage}) {
  // track the form and error for login
  const [loginForm, setLoginForm] = useState({email:"", password:""})
  const [loginError, setLoginError] = useState(null)
  const navigate = useNavigate()

  // set currPage to login for navbar functionality
  useEffect(()=> {  
    setCurrPage("login")
  }, [])
  useEffect(()=> {  
    if (user?.email){
      navigate("/todo")
    }
  }, [user, navigate])

  // change the login form when we change anything
  const handleOnLoginFormChange = (event) => {
    if (loginError === "Email field was left blank" &&
      event.target.name === "email" &&
      event.target.value.length > 0) {
        setLoginError(null)
    }
    if (loginError === "Password field was left blank" &&
      event.target.name === "password" &&
      event.target.value.length > 0) {
        setLoginError(null)
    }


    if (event.target.name === "email") {
      const regex = /^[a-zA-Z0-9\.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/  // implement this in login, and backend when logging in/registering
      if (regex.test(event.target.value) === false) {
        setLoginError("Please enter a valid email")
      }
      else {
        setLoginError(null)
      }
    }

    if (!loginError) { 
      const regex = /^[a-zA-Z0-9\.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/  // implement this in login, and backend when logging in/registering
      if (regex.test(loginForm.email) === false) {
        setLoginError("Please enter a valid email")
      }
    }
    if (loginError === "Invalid email and password combination") {
      setLoginError(null)
    }

    setLoginForm({...loginForm, [event.target.name]:event.target.value})
  }
  const handleOnLoginFormSubmit = async (event) => {
    event.preventDefault()

    if (loginForm.email.length === 0) {
      setLoginError("Email field was left blank")
      return
    }
    if (loginForm.password.length === 0) {
      setLoginError("Password field was left blank")
      return
    }
    if (loginError) {
      return
    }

    let {data, error} = await apiClient.login(loginForm)
    
    if (data?.token) {
      apiClient.setToken(data.token)
      setUser(data.user)
      setLoginForm({ email:"", password:""})
    } 
    if (error) {
      console.log("error", error)
      setLoginError(error)
    }
  }
  return (
    
    <div className='login-page'>
     <div className = "side-nav-bar">
        <h3 className='side-bar-title'>Designed for the Ambitious</h3>
        <h4 className='side-bar-desc'>Jumpstart your journey towards becoming more organized and motivated!</h4>
        <div className='side-nav-image-wrapper'><img className = "login-img" src='https://cdn.discordapp.com/attachments/990657295526539307/999346486011760750/Working_from_anywhere-rafiki.png'/></div>
      </div>
     <div className='login-wrapper'>

     
     <form className='login-form'>
     <div className='login-form-intro'>
          <h2 className='login-title'>Login</h2>
          <h3 className='login-text'>Track your progress with friends!</h3>
     </div>

          <div className='input-field'>
            <label htmlFor="email" className='label'>Email</label>
            <input type="text" id="email" name="email" className='form-input' placeholder='Type your email' value = {loginForm.email} onChange = {handleOnLoginFormChange}></input>

          </div>

          <div className = "input-field">
            <label htmlFor="password" className='label'>Password</label>
            <input type="password" id="password" name="password" className='form-input' placeholder='Type your password' value = {loginForm.password} onChange = {handleOnLoginFormChange}></input>
          </div>
         
          <div className='login-footer'>
            {loginError?<div className='error'>{loginError}</div>:null}
            <button type="button" className='login-button' onClick={handleOnLoginFormSubmit}>Login</button>
            <p className='footer-text'>Don't have an account? Sign up<Link to = '/register' className='signup-link'> Here</Link></p>
          </div>
    </form>
    </div>
    </div>
  )
}
