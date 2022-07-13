import React from 'react'
import "./LoginPage.css"

export default function LoginPage() {
  return (
    
    <div className='login-page'>
     <div className='side-nav'>
     <p> for the sidebar picture</p>
     </div> 
     <div className='login-form'>
      <h2 className='login-title'>Login</h2>
      <br></br>
      <h3 className='login-text'>Track your progress with friends!</h3>
    
     <form>
          <label for="email" className='label'>Email</label>
          <br></br>
          <input type="text" id="email" name="user@gmail.com" className='form-input' placeholder='Type your email'></input>
          <br></br>
          <label for="password" className='label'>Password</label>
          <br></br>
          <input type="text" id="password" name="password" className='form-input' placeholder='Type your password'></input>
          <br></br>
          <div className='checkbox'>
          <input type="checkbox" id="remember" name="remember" value="remember"></input>
          <p className='checkbox-text'>Remember me</p>
          </div>
          <button type="button" className='login-button'>Login</button>

    </form>
    </div>
    </div>
  )
}
