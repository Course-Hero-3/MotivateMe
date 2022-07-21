import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound({user,setCurrPage}) {
  React.useEffect(() => {
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
