import React from "react";
import "./ProfilePage.css";

export default function ProfilePage() {
  return (
    <div className="profile-card">
      <div className="profile-banner">
        <p>placeholder text for profile picture</p>
        <div className="profile-info">
          <form>
            <label htmlFor="email" className="label">
              Email
            </label>
            <label htmlFor="Username" className="label">
              Username
            </label>
          </form>
        </div>
      </div>
      <div className="edit-section">
        <label htmlFor="Existing Username" className="label">
          Current username
        </label>
        <input
          type="text"
          id="existing-username"
          name="existing-username"
          className="form-input"
          placeholder="Existing username"
        ></input>
        <label htmlFor="New Username" className="label">
          New username
        </label>
        <input
          type="text"
          id="new-username"
          name="new-username"
          className="form-input"
          placeholder="New username"
        ></input>
        <label htmlFor="Existing password" className="label">
          Existing password
        </label>
        <input
          type="text"
          id="existing-password"
          name="existing-password"
          className="form-input"
          placeholder="Existing password"
        ></input>
        <label htmlFor="New password" className="label">
          New password
        </label>
        <input
          type="text"
          id="new-password"
          name="new-password"
          className="form-input"
          placeholder="New password"
        ></input>
        {/* <button type="button" className="update-button"></button> */}
      </div>
    </div>
  );
}
