import React from 'react'
import "./AccessForbidden.css"
import Halt  from "../../assets/halt.mp4" 

export default function AccessForbidden() {
  return (
    <div className='accessforbidden'>
      <h1>ACCESS FORBIDDEN</h1>
    <img src={Halt} classname ="gif"/>
    <br></br>
    <div className='statment'>
    <h3> You could make an account to see this.Click</h3>
    <a href='/register'>here.</a>
     </div>   
    </div>
  )
}
