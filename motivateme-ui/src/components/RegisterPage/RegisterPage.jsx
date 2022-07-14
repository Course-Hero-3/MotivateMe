import React from 'react'
import "./RegisterPage.css"
import sideNavPic from "../../assets/transparent-RegisterPage-image.png"
export default function RegisterPage() {
  return (
    <div className='register-page'>
      <div className = "side-nav-bar">
        <div className='side-nav-image-wrapper'><img className = "register-img" src={sideNavPic}></img></div>
      </div>
      <div className='register-form-wrapper'>
        <form className='register-form'>
            <div className='main-titles'>       
              <h2 className='register-title' >Register</h2>
              <h4 className='register-subtitle' >Join others in some daily motivation!</h4>
            </div>
            <div className='split-input-field'>
                <div className='input-field'>
                    <span className='label'>Firstname</span>

                    <input type = "text" name = "firstName" className='form-input'></input>
                </div>
                <div className='input-field'>
                    <span className='label'>Lastname</span>

                    <input type = "text" name = "lastname" className='form-input'></input>
                </div>
            </div>
            <div className='split-input-field'>
                  <div className='input-field'>
                      <span className='label'>Email</span>

                      <input type = "text" name = "email" className='form-input'></input>
                  </div>
                  <div className='input-field'>
                      <span className='label'>Username</span>

                      <input type = "text" name = "username" className='form-input'></input>
                  </div>
            </div>
            <div className='split-input-field'>
                  <div className='input-field'>
                      <span className='label'>Password</span>

                      <input type = "password" name = "password" className='form-input'></input>    
                  </div>
                  <div className='input-field'>
                      <span className='label'>Confirm Password</span>

                      <input type = "password" name = "confirm" className='form-input'></input>  
                  </div>
            </div>
            <button className='register-btn' type='button'>Create Account</button>
        </form> 
      </div>
    </div>
  )
}
