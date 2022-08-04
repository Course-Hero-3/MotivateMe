import React from "react";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import "./ProfilePage.css";
import apiClient from "../../../services/apiclient";
import lockImg from "../../assets/lock-password.png";
import { useNavigate } from "react-router-dom";
import { Switch, useColorMode, ColorModeScript, Button } from "@chakra-ui/react";
import theme from "../theme";

export default function ProfilePage({
  user,
  setUser,
  setCurrPage,
  loggedInWithGoogle,
}) {
  const [editError, setEditError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);
  const navigate = useNavigate();
  const [updateObject, setUpdateObject] = React.useState({
    username: user?.username || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    image: user?.image || "",
    phone: user?.phone || "",
  });
  const { colorMode, toggleColorMode } = useColorMode();

  // make sure user is logged in
  React.useEffect(() => {
    // if user is logged in, then set it to recap
    if (user !== null && user !== undefined) {
      setCurrPage("profile");
    }
  }, []);

  const handleOnUpdateObjectChange = (event) => {
    setSuccessMessage(null);
    setEditError(null);
    if (event.target.name === "image") {
      if (event.target.value.length > 250) {
        setEditError("Image URL's must be below 250 characters");
      } else {
        setEditError(null);
      }
    }
    if (event.target.name === "phone") {
      // we are allowing users to not put in their phone numbers (optional field)
      if (event.target.value.length !== 10 && event.target.value.length !== 0) {
        setEditError("Invalid phone number provided");
      } else {
        if (event.target.value.length === 10) {
          const regex = /^\d{10}$/;
          if (regex.test(event.target.value) === false) {
            setEditError("Invalid characters passed through");
          } else {
            setEditError(null);
          }
        } else {
          setEditError(null);
        }
      }
    }

    setUpdateObject({
      ...updateObject,
      [event.target.name]: event.target.value,
    });
  };

  const usernameEditSubmit = async (username) => {
    if (editError) {
      // if there is an error and it isn't null
      return;
    }

    let { data, error } = await apiClient.editUsername(username);
    handleAfterSubmit(data, error);
  };

  const imageEditSubmit = async (image) => {
    if (editError) {
      // if there is an error and it isn't null
      return;
    }
    if (image.length >= 250) {
      setEditError("Image URL's must be below 250 characters");
      return;
    }

    let { data, error } = await apiClient.editImage(image);
    handleAfterSubmit(data, error);
  };

  const firstNameEditSubmit = async (firstName) => {
    if (editError) {
      // if there is an error and it isn't null
      return;
    }
    let { data, error } = await apiClient.editFirstName(firstName);
    handleAfterSubmit(data, error);
  };

  const lastNameEditSubmit = async (lastName) => {
    if (editError) {
      // if there is an error and it isn't null
      return;
    }
    let { data, error } = await apiClient.editLastName(lastName);
    handleAfterSubmit(data, error);
  };

  const phoneEditSubmit = async (phone) => {
    if (editError) {
      return;
    }
    if (updateObject.phone.length !== 10 && updateObject.phone.length !== 0) {
      setEditError("Invalid phone number provided");
      return;
    } else {
      if (updateObject.phone.length === 10) {
        const regex = /^\d{10}$/;
        if (regex.test(updateObject.phone) === false) {
          setEditError("Invalid characters passed through");
          return;
        }
      }
    }

    let { data, error } = await apiClient.editPhone(phone);
    handleAfterSubmit(data, error);
  };

  const handleAfterSubmit = async (data, error) => {
    if (data) {
      setSuccessMessage("Successfully updated!");
      setEditError(null);
      setUser(data.updatedUser);
      setUpdateObject({
        username: data.updatedUser?.username || "",
        firstName: data.updatedUser?.firstName || "",
        lastName: data.updatedUser?.lastName || "",
        image: data.updatedUser?.image || "",
      });
    }
    if (error) {
      setSuccessMessage(null);
      setEditError(error);
    }
  };

  return (
    <>
      {user !== undefined && user !== null ? (
        <>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <div className="profile-card">
            <div className="profile-banner">
              <div className="profile-banner-information">
                <img
                  id="banner-pfp"
                  src={user.image}
                  alt="PFP"
                  onError={(event) => {
                    event.target.src =
                      "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png";
                    event.onerror = null;
                  }}
                />
                <div className="profile-info">
                  <h2 className="profile-title-name">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <h3 htmlFor="Username" className="label">
                    @{user?.username}
                  </h3>
                </div>
              </div>
            </div>
            <div className="edit-section">
              <h2 className="profile-customization">Profile Customization</h2>
              <div className="dark-mode-button">
                <Button onClick={toggleColorMode}>
                  Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>
                {/* <label htmlFor="dark-mode-text" className="dark-mode-text">
                  Enable Dark Mode
                </label> */}
                {/* <Switch className="dark-mode" size="lg" >
               
                </Switch> */}
              </div>
              <div className="input-field-edit">
                <label htmlFor="username" className="label-edit">
                  Change Username
                </label>
                <div className="edit-and-send-field">
                  <input
                    type="text"
                    id="existing-username"
                    name="username"
                    className="form-input"
                    placeholder="NewUsername123"
                    value={updateObject.username}
                    onChange={handleOnUpdateObjectChange}
                  ></input>
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => {
                      usernameEditSubmit(updateObject.username);
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className="input-field-edit">
                <label htmlFor="image" className="label-edit">
                  Change Profile Picture
                </label>
                <div className="edit-and-send-field">
                  <input
                    type="text"
                    id="existing-image"
                    name="image"
                    className="form-input"
                    placeholder="Image URL"
                    value={updateObject.image}
                    onChange={handleOnUpdateObjectChange}
                  ></input>
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => {
                      imageEditSubmit(updateObject.image);
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className="input-field-edit">
                <label htmlFor="firstName" className="label-edit">
                  Change First Name
                </label>
                <div className="edit-and-send-field">
                  <input
                    type="text"
                    id="existing-first-name"
                    name="firstName"
                    className="form-input"
                    placeholder="FirstName"
                    value={updateObject.firstName}
                    onChange={handleOnUpdateObjectChange}
                  ></input>
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => {
                      firstNameEditSubmit(updateObject.firstName);
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className="input-field-edit">
                <label htmlFor="lastName" className="label-edit">
                  Change Last Name
                </label>
                <div className="edit-and-send-field">
                  <input
                    type="text"
                    id="existing-last-name"
                    name="lastName"
                    className="form-input"
                    placeholder="LastName"
                    value={updateObject.lastName}
                    onChange={handleOnUpdateObjectChange}
                  ></input>
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => {
                      lastNameEditSubmit(updateObject.lastName);
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>

              <div className="input-field-edit">
                <label htmlFor="phone" className="label-edit">
                  Change Phone Number
                </label>
                <div className="edit-and-send-field">
                  <input
                    type="tel"
                    id="existing-phone"
                    name="phone"
                    placeholder="US Phone Number (+1 implied)"
                    className="form-input"
                    value={updateObject.phone}
                    onChange={handleOnUpdateObjectChange}
                  ></input>
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => {
                      phoneEditSubmit(updateObject.phone);
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>

              <div className="change-password-region">
                <button
                  type="button"
                  className="enter-password-btn"
                  onClick={() => {
                    if (loggedInWithGoogle) {
                      setEditError(
                        "Cannot change password for Google Accounts"
                      );
                    } else {
                      navigate("/securepasswordchange");
                    }
                  }}
                >
                  Change Password
                  <img className="lock-icon-password" src={lockImg}></img>
                </button>
              </div>
              <>
                {successMessage ? (
                  <>
                    <p className="sucess-message-display">{successMessage}</p>
                  </>
                ) : (
                  <></>
                )}
                {editError ? (
                  <>
                    <p className="edit-error-display">{editError}</p>
                  </>
                ) : (
                  <></>
                )}
              </>
            </div>
          </div>
        </>
      ) : (
        <AccessForbidden setCurrPage={setCurrPage} />
      )}
    </>
  );
}
