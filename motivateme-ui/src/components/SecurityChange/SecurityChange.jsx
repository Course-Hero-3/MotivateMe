import React from "react";
import "./SecurityChange.css";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import apiClient from "../../../services/apiclient";

export default function SecurityChange({
  user,
  setCurrPage,
  loggedInWithGoogle,
}) {
  const [passwordError, setPasswordError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);

  const [passwordObject, setPasswordObject] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  React.useEffect(() => {
    // if the user is logged in, then set the page to "todo"
    if (user !== undefined && user !== null) {
      setCurrPage("securitychange");
    }
  }, []);

  const handleOnPasswordObjectChange = (event) => {
    setSuccessMessage(null);
    if (passwordError) {
      setPasswordError(null);
    }

    if (event.target.name === "newPassword") {
      if (passwordObject.confirmNewPassword !== event.target.value) {
        console.log("entered don't match");
        setPasswordError("The new passwords do not match");
      } else {
        console.log("entered OKAY");

        setPasswordError(null);
      }
    }
    if (event.target.name === "confirmNewPassword") {
      if (passwordObject.newPassword !== event.target.value) {
        console.log("entered don't match");

        setPasswordError("The new passwords do not match");
      } else {
        console.log("entered OKAY");

        setPasswordError(null);
      }
    }

    setPasswordObject({
      ...passwordObject,
      [event.target.name]: event.target.value,
    });
  };

  const handlePasswordSubmit = async (threePasswords) => {
    if (passwordError) {
      // if there is a password error, don't submit
      return;
    }

    let { data, error } = await apiClient.editPassword({
      oldPassword: threePasswords.oldPassword,
      newPassword: threePasswords.newPassword,
    });

    if (data) {
      setSuccessMessage("Successfully updated password!");
      setPasswordError(null);
      setPasswordObject({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
    if (error) {
      setSuccessMessage(null);
      setPasswordError(error);
    }
  };

  return (
    <>
      {user !== undefined && user !== null && !loggedInWithGoogle ? (
        <>
          <div className="security-change-page">
            <h2 className="security-change-title">SECURE: Change Password</h2>
            <div className="form-area">
              <div className="input-field-password">
                <label htmlFor="oldPassword" className="label-password">
                  Enter Old Password
                </label>
                <div className="edit-and-send-field">
                  <input
                    type="password"
                    id="old-password"
                    name="oldPassword"
                    className="form-input-password"
                    placeholder="ex: weak1"
                    value={passwordObject.oldPassword}
                    onChange={handleOnPasswordObjectChange}
                  ></input>
                </div>
              </div>
              <div className="input-field-password">
                <label htmlFor="newPassword" className="label-password">
                  Enter New Password
                </label>
                <div className="edit-and-send-field">
                  <input
                    type="password"
                    id="new-password"
                    name="newPassword"
                    className="form-input-password"
                    placeholder="ex: newpassword456"
                    value={passwordObject.newPassword}
                    onChange={handleOnPasswordObjectChange}
                  ></input>
                </div>
              </div>
              <div className="input-field-password">
                <label htmlFor="confirmNewPassword" className="label-password">
                  Confirm New Password
                </label>
                <div className="edit-and-send-field">
                  <input
                    type="password"
                    id="confirm-new-password"
                    name="confirmNewPassword"
                    className="form-input-password"
                    placeholder="ex: newpassword456"
                    value={passwordObject.confirmNewPassword}
                    onChange={handleOnPasswordObjectChange}
                  ></input>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="password-btn"
              onClick={() => {
                handlePasswordSubmit(passwordObject);
              }}
            >
              Submit
            </button>
            <>
              {successMessage ? (
                <>
                  <p className="sucess-message-display">{successMessage}</p>
                </>
              ) : (
                <></>
              )}
              {passwordError ? (
                <>
                  <p className="edit-error-display">{passwordError}</p>
                </>
              ) : (
                <></>
              )}
            </>
          </div>
        </>
      ) : (
        <>
          <AccessForbidden user={user} setCurrPage={setCurrPage} />
        </>
      )}
    </>
  );
}
