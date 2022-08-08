import React from "react";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import "./ProfilePage.css";
import apiClient from "../../../services/apiclient";
import lockImg from "../../assets/lock-password.png";
import editPfp from "../../assets/pencil-icon.png";
import { useNavigate } from "react-router-dom";
import { Switch, useColorMode, ColorModeScript, Button, color } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'


import theme from "../theme";

export default function ProfilePage({
  user,
  setUser,
  setCurrPage,
  loggedInWithGoogle,
  setColorState,
  colorModeState
}) {
  const toast = useToast()
  const [editError, setEditError] = React.useState(null);
  const navigate = useNavigate();
  const [updateObject, setUpdateObject] = React.useState({
    username: user?.username || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    image: "",
    phone: user?.phone || "",
  });
  const { colorMode, toggleColorMode } = useColorMode();

  function openfileDialog() {
    document.getElementById("existing-image").click();
  }

  // make sure user is logged in
  React.useEffect(() => {
    // if user is logged in, then set it to recap
    if (user !== null && user !== undefined) {
      setCurrPage("profile");
    }
  }, []);

  React.useEffect (() => {
    if (colorMode === "light"){
      setColorState('light')
    }
    else {setColorState("dark")}
  }, [colorMode])

  const handleOnImageChange = (event) => {
    if (event.target.files[0].size > 70000) {
      setEditError("Please upload images around 70 kb or below.");
      return;
    } else if (
      editError === "Please upload images around 70 kb or below." ||
      editError === "Please upload a smaller sized image than before."
    ) {
      setEditError(null);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      imageEditSubmit(reader.result);
      // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleOnUpdateObjectChange = (event) => {
    setEditError(null);

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
    // if there is an error and it isn't null
    if (editError) {
      return;
    }
    let { data, error } = await apiClient.editUsername(username);
    handleAfterSubmit(data, error);
  };

  const imageEditSubmit = async (image) => {
    // if there is an error and it isn't null
    if (editError) {
      setEditError(null);
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
      toast({
        title: 'Succesfully updated!',
        description: "",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setEditError(null);
      setUser(data.updatedUser);
      setUpdateObject({
        username: data.updatedUser?.username || "",
        firstName: data.updatedUser?.firstName || "",
        lastName: data.updatedUser?.lastName || "",
        image: "",
      });
    }
    if (error) {
      if (error === "request entity too large") {
        setEditError("Please upload a smaller sized image than before.");
      } else {
        setEditError(error);
      }
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
                <button
                  type="button"
                  id="empty-button"
                  onClick={() => openfileDialog()}
                >
                  <div className="img-download">
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
                    <img
                      className="edit-logo"
                      id="banner-pfp-edit"
                      src={editPfp}
                      alt="edit button"
                    ></img>
                  </div>
                </button>

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
            <div className="edit-section-space">
            <div className="edit-section">
              <h2 className="profile-customization">Profile Customization</h2>
              <div className="dark-mode-button">
                <Button onClick={ toggleColorMode} transitionDuration="200ms">
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
                    className={`form-input profile-input ${colorMode === "light"?"gray-bg":""}`}
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

              <div className="edit-and-send-field">
                <input
                  type="file"
                  id="existing-image"
                  name="image"
                  className={`form-input profile-input ${colorMode === "light"?"gray-bg":""}`}
                  onChange={handleOnImageChange}
                  accept=".jpg, .jpeg, .png"
                ></input>
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
                    className={`form-input profile-input ${colorMode === "light"?"gray-bg":""}`}
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
                    className={`form-input profile-input ${colorMode === "light"?"gray-bg":""}`}
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
                    className={`form-input profile-input ${colorMode === "light"?"gray-bg":""}`}
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
          </div>
        </>
      ) : (
        <AccessForbidden setCurrPage={setCurrPage} />
      )}
    </>
  );
}
