import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound({user,setCurrPage}) {
// when mounted, check if user is logged in. If so, show entire navbar. 
// If not, show the same navbar as the landing page.
  React.useEffect(() => {
  // set current page equal to not found for navbar to display entirely.
    if(user){setCurrPage("notfound")}
    else  {setCurrPage("landing")}
  }, [])

  return (
    <div className="notfound-text">
      <center>
        <h1>404</h1>
      </center>
      <h3>The page you are trying to find is not here.</h3>
      <div className="return-text">
        <h3>Return to <Link to="/" className="return-link"> Home</Link></h3>
      </div>
    </div>
  );
}
