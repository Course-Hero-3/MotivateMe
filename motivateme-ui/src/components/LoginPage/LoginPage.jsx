import React from 'react'
import{ useEffect, useState } from 'react'
import "./LoginPage.css"
import apiClient  from '../../../services/apiclient'

 import { useNavigate } from 'react-router-dom'

export default function LoginPage({user, setUser,setCurrPage}) {
  const [loginForm, setLoginForm] = useState({email:"", password:""})
  const [loginError, setLoginError] = useState(null)
  const navigate = useNavigate()
  useEffect(()=> {  
    setCurrPage("login")
  }, [])
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
    } else {setLoginError(error)}
  }
  return (
    
    <div className='login-page'>
     <div className='side-nav'>
     <p> for the sidebar picture</p>
     </div> 
     <div className='login-wrapper'>
     <div className='login-form'>
      <h2 className='login-title'>Login</h2>
      <br></br>
      <h3 className='login-text'>Track your progress with friends!</h3>
     <form>
          <label htmlFor="email" className='label'>Email</label>
          <br></br>
          <input type="email" id="email" name="email" className='form-input' placeholder='jsmith@example.com' value = {loginForm.email} onChange = {handleOnLoginFormChange}></input>
          <br></br>
          <label htmlFor="password" className='label'>Password</label>
          <br></br>
          <input type="password" id="password" name="password" className='form-input' placeholder='Password' value = {loginForm.password} onChange = {handleOnLoginFormChange}></input>
          <br></br>
          <br></br>
          <button type="button" className='login-button' onClick={handleOnLoginFormSubmit}>Login</button>
          <br></br>
          <div className='footer'>
          <p className='footer-text'>Don't have an account? Sign up<a href='/register'> here</a></p>
          </div>
    </form>
    </div>
    </div>
    </div>
  )
}
