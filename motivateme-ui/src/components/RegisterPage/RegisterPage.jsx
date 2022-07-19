import{ useEffect, useState } from 'react'
import "./RegisterPage.css"
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import sideNavPic from "../../assets/transparent-RegisterPage-image.png"
import apiClient from '../../../services/apiclient';
export default function RegisterPage({setUser, user}) {
  /**
   *    <div className='register-footer'>
                <hr className='register-break'></hr>

            </div>
   */
  const [registerForm, setRegisterForm] = useState({firstName:"", email:"", password:"",lastName:"", image:"", username:"", confirm:""})
  const [registerError, setRegisterError] = useState(null)
  const navigate = useNavigate()

  useEffect(()=> {  
    if (user?.email){
      navigate("/todo")
    }
  }, [user, navigate])

  const handleOnRegisterFormChange = (event) => {
    setRegisterForm({...registerForm, [event.target.name]:event.target.value})
  }
  const handleOnRegisterFormSubmit = async (event) => {
    event.preventDefault()
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
        <div className='side-nav-image-wrapper'><img className = "register-img" src={sideNavPic}></img></div>
      </div>
      <div className='register-form-wrapper'>
        <form className='register-form'>
            <div className='main-titles'>       
              <h2 className='register-title' >Create New Account</h2>
              <h4 className='register-subtitle' >Join others in some daily motivation!</h4>
            </div>
            <div className='split-input-field'>
                <div className='input-field'>
                    <span className='label'>Firstname</span>

                    <input type = "text" name = "firstName" className='form-input' value = {registerForm.firstName} onChange = {handleOnRegisterFormChange}></input>
                </div>
                <div className='input-field'>
                    <span className='label'>Lastname</span>

                    <input type = "text" name = "lastName" className='form-input' value = {registerForm.lastName} onChange = {handleOnRegisterFormChange}></input>
                </div>
            </div>
            <div className='split-input-field'>
                  <div className='input-field'>
                      <span className='label'>Email</span>

                      <input type = "text" name = "email" className='form-input' value = {registerForm.email} onChange = {handleOnRegisterFormChange}></input>
                  </div>
                  <div className='input-field'>
                      <span className='label'>Username</span>

                      <input type = "text" name = "username" className='form-input' value = {registerForm.username} onChange = {handleOnRegisterFormChange}></input>
                  </div>
            </div>
            <div className='split-input-field'>
                  <div className='input-field'>
                      <span className='label'>Password</span>

                      <input type = "password" name = "password" className='form-input' value = {registerForm.password} onChange = {handleOnRegisterFormChange}></input>    
                  </div>
                  <div className='input-field'>
                      <span className='label'>Confirm Password</span>

                      <input type = "password" name = "confirm" className='form-input' value = {registerForm.confirm} onChange = {handleOnRegisterFormChange}></input>  
                  </div>
            </div>
            <div className='register-footer'>
                <button className='register-btn' type='button' onClick={handleOnRegisterFormSubmit}>Register</button>

              <h2 className='login-account'>Have an account? Login <Link to = "/login" className='login-link'><span className='login-link'>Here</span></Link></h2>
            </div>

        </form> 
      </div>
    </div>
  )
}
