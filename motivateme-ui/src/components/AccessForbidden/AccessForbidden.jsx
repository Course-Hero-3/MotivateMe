import React from "react";
import "./AccessForbidden.css";
import {Link} from "react-router-dom"

export default function AccessForbidden( { setCurrPage } ) {
  React.useEffect(() => {
    setCurrPage("landing")
}, [])

  return (
    <div className="accessforbidden">
      <h1>ACCESS FORBIDDEN</h1>
      <br></br>
      <div className="statment">
        <h3>You could make an account to see this. Click<Link to="/register" className="forbidden-link"> here</Link></h3>
        
        <h3>If you have an account already. Click <Link to="/login" className="forbidden-link"> here</Link></h3>
       
      </div>
    </div>
  );
}
