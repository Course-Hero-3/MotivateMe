import{ useEffect, useState } from 'react'
import "./RegisterPage.css"
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import sideNavPic from "../../assets/transparent-RegisterPage-image.png"
import apiClient from '../../../services/apiclient';
export default function RegisterPage({setUser, user, setCurrPage}) {
  const [registerForm, setRegisterForm] = useState({firstName:"", email:"", password:"",lastName:"", image:"", username:"", confirm:""})
  const [registerError, setRegisterError] = useState(null)
  const navigate = useNavigate()

  // set current page to register (for navbar to not render its content)
  // also, navigate to "todo" page if they are 
  // already logged in (they must  be logged out to access this page)
  useEffect(()=> {  
    setCurrPage("register")
    if (user?.email){
      navigate("/todo")
    }
  }, [user, navigate])

  // handle any register form changes and do some checks
  const handleOnRegisterFormChange = (event) => {
    if (registerError === "First name field was left blank" &&
      event.target.name === "firstName" &&
      event.target.value.length > 0) {
        setRegisterError(null)
    }
    if (registerError === "Last name field was left blank" &&
      event.target.name === "lastName" &&
      event.target.value.length > 0) {
        setRegisterError(null)
    }
    if (registerError === "Email field was left blank" &&
      event.target.name === "email" &&
      event.target.value.length > 0) {
        setRegisterError(null)
    }
    if (registerError === "Username field was left blank" &&
      event.target.name === "username" &&
      event.target.value.length > 0) {
        setRegisterError(null)
    }
    if (registerError === "Image field was left blank" &&
      event.target.name === "image" &&
      event.target.value.length > 0) {
        setRegisterError(null)
    }
    

    if (registerForm.firstName.length !== 0 &&
      registerForm.lastName.length !== 0 &&
      registerForm.username.length !== 0 &&
      registerForm.password.length !== 0 &&
      registerForm.confirm.length !== 0 &&
      registerForm.image.length !== 0 &&
      registerForm.email.length !== 0) {
        setRegisterError(null)
      }
    if (event.target.name === "password") {
      if (registerForm.confirm && registerForm.confirm !== event.target.value) {
        setRegisterError("Passwords do not match")
      } else {
        setRegisterError(null)
      }
    }
    if (event.target.name === "confirm") {
      if (registerForm.password !== event.target.value) {
        setRegisterError("Passwords do not match")
      } else {
        setRegisterError(null)
      }
    }
    if (event.target.name === "email") {
      const regex = /^[a-zA-Z0-9\.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/  // implement this in login, and backend when logging in/registering
      if (regex.test(event.target.value) === false) {
        setRegisterError("Please enter a valid email")
      }
      else {
        setRegisterError(null)
      }
    }

    if (!registerError) {
      if (registerForm.password !== registerForm.confirm) {
        setRegisterError("Passwords do not match")
      }
      
      const regex = /^[a-zA-Z0-9\.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/  // implement this in login, and backend when logging in/registering
      if (regex.test(registerForm.email) === false) {
        setRegisterError("Please enter a valid email")
      }
    }


    setRegisterForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }
  const handleOnRegisterFormSubmit = async (event) => {
    event.preventDefault()


    if (registerForm.firstName.length === 0) {
      setRegisterError("First name field was left blank")
      return
    }
    if (registerForm.lastName.length === 0) {
      setRegisterError("Last name field was left blank")
      return
    }
    if (registerForm.email.length === 0) {
      setRegisterError("Email field was left blank")
      return
    }
    if (registerForm.image.length === 0) {
      setRegisterError("Image field was left blank")
      return
    }
    if (registerForm.username.length === 0) {
      setRegisterError("Username field was left blank")
      return
    }
    if (registerForm.confirm.length === 0) {
      setRegisterError("Confirm password field was left blank")
      return
    }
    
    if (registerError) {
      return
    }
    

    let {data, error} = await apiClient.register(registerForm)
    
    if (data?.token) {
      apiClient.setToken(data.token)
      setUser(data.user)
      setRegisterForm({firstName:"", email:"", password:"", lastName:"", image:"", username:"", confirm:""})
    } else {setRegisterError(error)}
  }


  return (
    <div className='register-page'>
      <div className = "side-nav-bar">
        <h3 className='side-bar-title'>Designed for the Ambitious</h3>
        <h4 className='side-bar-desc'>Jumpstart your journey towards becoming more organized and motivated!</h4>
        <div className='side-nav-image-wrapper'>
          <img className = "register-img" src='https://cdn.discordapp.com/attachments/990657295526539307/999346161578164306/Multi-device_targeting-rafiki_1.png'></img>
        </div>
      </div>
      <div className='register-form-wrapper'>
        <form className='register-form'>
            <div className='main-titles'>       
              <h2 className='register-title' >Create New Account</h2>
              <h4 className='register-subtitle' >Join others in some daily motivation!</h4>
            </div>
            <div className='split-input-field'>
                <div className='input-field'>
                    <span className='label'>First Name</span>

                    <input type = "text" name = "firstName" className='form-input' placeholder='Type your first name' value = {registerForm.firstName} onChange = {handleOnRegisterFormChange}></input>
                </div>
                <div className='input-field'>
                    <span className='label'>Last Name</span>
                    <input type = "text" name = "lastName" className='form-input' placeholder='Type your last name' value = {registerForm.lastName} onChange = {handleOnRegisterFormChange}></input>
                </div>
            </div>
            <div className='input-field'>
                <span className='label'>Email</span>

                <input type = "text" name = "email" className='form-input alone' placeholder='Type your email' value = {registerForm.email} onChange = {handleOnRegisterFormChange}></input>
            </div>
            <div className='input-field'>
                <span className='label'>Username</span>

                <input type = "text" name = "username" className='form-input alone' placeholder='Type a username' value = {registerForm.username} onChange = {handleOnRegisterFormChange}></input>
            </div>
            <div className='input-field'>
                <span className='label'>Password</span>

                <input type = "password" name = "password" className='form-input alone' placeholder='Enter a password' value = {registerForm.password} onChange = {handleOnRegisterFormChange}></input>    
            </div>
            <div className='input-field'>
                <span className='label'>Confirm Password</span>

                <input type = "password" name = "confirm" className='form-input alone' placeholder='Confirm your password' value = {registerForm.confirm} onChange = {handleOnRegisterFormChange}></input>  
            </div>
            <div className='input-field'>
                      <span className='label'>Image URL</span>

                      <input type = "text" name = "image" className='form-input alone' placeholder='Enter an Image URL' value = {registerForm.image} onChange = {handleOnRegisterFormChange}></input>
                  </div>
            <div className='register-footer'>
              {registerError?<div className='error'>{registerError}</div>:null}
              <button className='register-btn' type='button' onClick={handleOnRegisterFormSubmit}>Register</button>
              <h2 className='login-account'>Have an account? Login <Link to = "/login" className='login-link'><span className='login-link'>Here</span></Link></h2>
            </div>

        </form> 
      </div>
    </div>
  )
}
