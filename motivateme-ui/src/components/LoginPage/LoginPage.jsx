import React from 'react'
import { useState } from 'react'
import "./LoginPage.css"
import ApiClient
 from '../../../services/apiclient'
export default function LoginPage() {
  const [loginForm, setLoginForm] = useState({email:"", password:""})
  const [loginError, setLoginError] = useState(null)

  const handleOnLoginFormChange = (event) => {
    setLoginForm({...loginForm, [event.target.name]:event.target.value})
    console.log(loginForm)
  }
  const apiClient = new ApiClient("http://localhost:3001")
  const handleOnLoginFormSubmit = async () => {
    let {data, error} = await apiClient.login(loginForm)
    
    if (data) {
      console.log(data)
      apiClient.setToken(data.token)
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
          <label for="email" className='label'>Email</label>
          <br></br>
          <input type="text" id="email" name="email" className='form-input' placeholder='Type your email' value = {loginForm.email} onChange = {handleOnLoginFormChange}></input>
          <br></br>
          <label for="password" className='label'>Password</label>
          <br></br>
          <input type="text" id="password" name="password" className='form-input' placeholder='Type your password' value = {loginForm.password} onChange = {handleOnLoginFormChange}></input>
          <br></br>
          <div className='checkbox'>
          <input type="checkbox" id="remember" name="remember" value="remember"></input>
          <p className='checkbox-text'>Remember me</p>
          </div>
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
