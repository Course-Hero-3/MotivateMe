import React from "react";
import "./AccessForbidden.css";
import { Link } from "react-router-dom"
import { BsFillLockFill } from "react-icons/bs"

export default function AccessForbidden( { setCurrPage } ) {
  React.useEffect(() => {
    setCurrPage("landing")
}, [])

  return (
    <div className="accessforbidden">
      <h1 className="big-error">4<BsFillLockFill/>3</h1>
      <h3 className="af-title">Access Denied</h3>
      <br></br>
      <div className="statement">
        <h3>New here? Click<Link to="/register" className="forbidden-link"> here</Link></h3>
        
        <h3>If you have an account already. Click <Link to="/login" className="forbidden-link"> here</Link></h3>
       
      </div>
    </div>
  );
}
