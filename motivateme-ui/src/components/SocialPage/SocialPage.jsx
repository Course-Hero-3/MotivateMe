import React from "react";
import { useNavigate } from "react-router-dom";
import "./SocialPage.css";
import apiClient from "../../../services/apiclient";
import { useState } from "react";
import AccessForbidden from "../AccessForbidden/AccessForbidden";

export default function SocialPage({ user, setCurrPage }) {
  const [rightTabState, setRightTabState] = useState("friends");
  const navigate = useNavigate();
  React.useEffect(() => {
    // if user is not logged in, redirect to access forbidden page

    //otherwise, set the curr page to "social"
    if (user !== undefined && user !== null) {
      setCurrPage("social");
    }
  });

  return (
    <>
      {user !== null && user !== undefined ? (
        <>
          <div className="social-page">
            <h1 className="main-title">Social Feed</h1>
            <div className="social-content">
              <div className="activity-feed">
                <h4>Activity Title</h4>
                <div className="main-feed">activity card</div>
              </div>
              <div className="friends-content">
                <div className="buttons">
                  <button type="button" className="button">
                    Explore
                  </button>
                  <button type="button" className="button">
                    Friends
                  </button>
                </div>
                <div className="friend-section">
                  {rightTabState === "friends" ? (
                    <h2 className="friend-text">Friends List</h2>
                  ) : (
                    <h2 className="friend-text">The World</h2>
                  )}
                  <input
                    type="search"
                    className="search"
                    placeholder="search"
                  ></input>
                </div>
              </div>
            </div>

            <div className="main-feed"></div>
          </div>
        </>
      ) : (
        <AccessForbidden setCurrPage={setCurrPage} />
      )}
    </>
  );
}
