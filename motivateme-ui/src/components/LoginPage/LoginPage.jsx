import React from 'react'
import{ useEffect, useState } from 'react'
import "./LoginPage.css"
import apiClient  from '../../../services/apiclient'
import { Link } from 'react-router-dom'

 import { useNavigate } from 'react-router-dom'
/**current page state */
export default function LoginPage({user, setUser}) {
  const [loginForm, setLoginForm] = useState({email:"", password:""})
  const [loginError, setLoginError] = useState(null)
  const navigate = useNavigate()

  useEffect(()=> {  
    if (user?.email){
      navigate("/todo")
    }
  }, [user, navigate])


  const handleOnLoginFormChange = (event) => {
    setLoginForm({...loginForm, [event.target.name]:event.target.value})
  }
  const handleOnLoginFormSubmit = async (event) => {
    event.preventDefault()

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
     <div className='side-nav'>
     <p> for the sidebar picture</p>
     </div> 
     <div className='login-wrapper'>
     
     <form className='login-form'>
     <div className='login-form-intro'>
          <h2 className='login-title'>Login</h2>
          <h3 className='login-text'>Track your progress with friends!</h3>
     </div>

          <div className='input-field'>
            <label for="email" className='label'>Email</label>
            <input type="text" id="email" name="email" className='form-input' placeholder='Type your email' value = {loginForm.email} onChange = {handleOnLoginFormChange}></input>
          </div>

          <div className = "input-field">
            <label for="password" className='label'>Password</label>
            <input type="text" id="password" name="password" className='form-input' placeholder='Type your password' value = {loginForm.password} onChange = {handleOnLoginFormChange}></input>
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
