import "./RegisterPage.css";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../../services/apiclient";
import { BsFillTrashFill } from "react-icons/bs";
import mainImg from "../../assets/Main_Img.png";

// import S3FileUpload from "react-s3";

export default function RegisterPage({
  setUser,
  user,
  setCurrPage,
  colorModeState,
}) {
  const [fileIsChosen, setFileIsChosen] = useState(false)
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    email: "",
    password: "",
    lastName: "",
    image: "",
    username: "",
    confirm: "",
    phone: "",
  });
  const [registerError, setRegisterError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();

  const reset = () => {
    setFileIsChosen(false)
    ref.current.value = "";
  };

  // set current page to register (for navbar to not render its content)
  // also, navigate to "todo" page if they are
  // already logged in (they must  be logged out to access this page)
  useEffect(() => {
    setCurrPage("register");
    if (user?.email) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // handle any register form changes and do some checks
  const handleOnImageChange = (event) => {
    setFileIsChosen(true)
    if (event.target.files[0].size > 70000) {
      setRegisterError("Please upload images around 70 kb or below.");
      return;
    } else if (
      registerError === "Please upload images around 70 kb or below." ||
      registerError === "Please upload a smaller sized image than before."
    ) {
      setRegisterError(null);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setRegisterForm((f) => ({ ...f, [event.target.name]: reader.result }));
      // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleOnRegisterFormChange = (event) => {
    if (
      registerError === "First name field was left blank" &&
      event.target.name === "firstName" &&
      event.target.value.length > 0
    ) {
      setRegisterError(null);
    }
    if (
      registerError === "Last name field was left blank" &&
      event.target.name === "lastName" &&
      event.target.value.length > 0
    ) {
      setRegisterError(null);
    }
    if (
      registerError === "Email field was left blank" &&
      event.target.name === "email" &&
      event.target.value.length > 0
    ) {
      setRegisterError(null);
    }
    if (
      registerError === "Username field was left blank" &&
      event.target.name === "username" &&
      event.target.value.length > 0
    ) {
      setRegisterError(null);
    }

    if (
      registerForm.firstName.length !== 0 &&
      registerForm.lastName.length !== 0 &&
      registerForm.username.length !== 0 &&
      registerForm.password.length !== 0 &&
      registerForm.confirm.length !== 0 &&
      (registerForm.phone.length === 10 || registerForm.phone.length === 0) &&
      registerForm.email.length !== 0
    ) {
      setRegisterError(null);
    }
    if (event.target.name === "password") {
      if (registerForm.confirm !== event.target.value) {
        setRegisterError("Passwords do not match");
      } else {
        setRegisterError(null);
      }
    }
    if (event.target.name === "confirm") {
      if (registerForm.password !== event.target.value) {
        setRegisterError("Passwords do not match");
      } else {
        setRegisterError(null);
      }
    }
    if (event.target.name === "phone") {
      // we are allowing users to not put in their phone numbers (optional field)
      if (event.target.value.length !== 10 && event.target.value.length !== 0) {
        setRegisterError("Invalid phone number provided");
      } else {
        if (event.target.value.length === 10) {
          const regex = /^\d{10}$/;
          if (regex.test(event.target.value) === false) {
            setRegisterError("Invalid characters passed through");
          } else {
            setRegisterError(null);
          }
        } else {
          setRegisterError(null);
        }
      }
    }

    if (event.target.name === "email") {
      const regex = /^[a-zA-Z0-9\.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/; // implement this in login, and backend when logging in/registering
      if (regex.test(event.target.value) === false) {
        setRegisterError("Please enter a valid email");
      } else {
        setRegisterError(null);
      }
      if (event.target.value.length === 0) {
        setRegisterError(null);
      }
    }

    if (!registerError) {
      if (registerForm.password !== registerForm.confirm) {
        setRegisterError("Passwords do not match");
      }

      const regex = /^[a-zA-Z0-9\.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/; // implement this in login, and backend when logging in/registering
      if (registerForm.email.length !== 0) {
        if (regex.test(registerForm.email) === false) {
          setRegisterError("Please enter a valid email");
        }
      }
    }

    setRegisterForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };
  const handleOnRegisterFormSubmit = async (event) => {
    event.preventDefault();

    if (registerForm.firstName.length === 0) {
      setRegisterError("First name field was left blank");
      return;
    }
    if (registerForm.lastName.length === 0) {
      setRegisterError("Last name field was left blank");
      return;
    }
    if (registerForm.email.length === 0) {
      setRegisterError("Email field was left blank");
      return;
    }
    if (registerForm.username.length === 0) {
      setRegisterError("Username field was left blank");
      return;
    }
    if (registerForm.confirm.length === 0) {
      setRegisterError("Confirm password field was left blank");
      return;
    }

    // we are allowing users to not put in their phone numbers (optional field)
    if (registerForm.phone.length !== 10 && registerForm.phone.length !== 0) {
      setRegisterError("Invalid phone number provided");
      return;
    } else {
      if (registerForm.phone.length === 10) {
        const regex = /^\d{10}$/;
        if (regex.test(registerForm.phone) === false) {
          setRegisterError("Invalid characters passed through");
          return;
        }
      }
    }

    if (registerError) {
      return;
    }
    setIsLoading(true);
    let { data, error } = await apiClient.register(registerForm);

    if (data?.token) {
      apiClient.setToken(data.token);
      setUser(data.user);
      setRegisterForm({
        firstName: "",
        email: "",
        password: "",
        lastName: "",
        image: "",
        username: "",
        confirm: "",
        phone: "",
      });
    } else {
      if (error === "Please upload a smaller sized image than before.") {
        setRegisterError();
      }
      setRegisterError(error);
    }
    setIsLoading(false);
    // now call express erver
  };

  return (
    <div className="register-page">
      <div className="side-nav-bar">
        <h3 className="side-bar-title">Designed for the Ambitious</h3>
        <h4 className="side-bar-desc">
          Jumpstart your journey towards becoming more organized and motivated!
        </h4>
        <div className="side-nav-image-wrapper">
          <img
            className="register-img"
            src={mainImg}
          ></img>
        </div>
      </div>
      <div className="register-form-wrapper">
        <form className="register-form">
          <div className="split-input-field">
            <div className="input-field-split">
              <span className="label">First Name</span>

              <input
                type="text"
                name="firstName"
                className={`form-input-split${
                  colorModeState === "light" ? " gray-bg" : ""
                }`}
                placeholder="Type your first name"
                value={registerForm.firstName}
                onChange={handleOnRegisterFormChange}
              ></input>
            </div>
            <div className="input-field-split">
              <span className="label">Last Name</span>
              <input
                type="text"
                name="lastName"
                className={`form-input-split${
                  colorModeState === "light" ? " gray-bg" : ""
                }`}
                placeholder="Type your last name"
                value={registerForm.lastName}
                onChange={handleOnRegisterFormChange}
              ></input>
            </div>
          </div>
          <div className="input-field register">
            <span className="label">Email</span>

            <input
              type="text"
              name="email"
              className={`form-input alone${
                colorModeState === "light" ? " gray-bg" : ""
              }`}
              placeholder="Type your email"
              value={registerForm.email}
              onChange={handleOnRegisterFormChange}
            ></input>
          </div>
          <div className="input-field register">
            <span className="label">Username</span>

            <input
              type="text"
              name="username"
              className={`form-input alone${
                colorModeState === "light" ? " gray-bg" : ""
              }`}
              placeholder="Type a username"
              value={registerForm.username}
              onChange={handleOnRegisterFormChange}
            ></input>
          </div>
          <div className="input-field register">
            <span className="label">Password</span>

            <input
              type="password"
              name="password"
              className={`form-input alone${
                colorModeState === "light" ? " gray-bg" : ""
              }`}
              placeholder="Enter a password"
              value={registerForm.password}
              onChange={handleOnRegisterFormChange}
            ></input>
          </div>
          <div className="input-field register">
            <span className="label">Confirm Password</span>

            <input
              type="password"
              name="confirm"
              className={`form-input alone${
                colorModeState === "light" ? " gray-bg" : ""
              }`}
              placeholder="Confirm your password"
              value={registerForm.confirm}
              onChange={handleOnRegisterFormChange}
            ></input>
          </div>
          <div className="input-field register">

            <span className="label">
              Profile Picture Upload (optional) - 70KB Max
            </span>
            <div className="image-and-clear">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setRegisterForm({ ...registerForm, image: "" });
                  if (registerError === "Please upload images around 70 kb or below." ||
                  registerError === "Please upload a smaller sized image than before.") {
                    setRegisterError(null)
                  }
                }}
                className={`trash-btn${fileIsChosen?"":" hidden"}`}
              >
                <BsFillTrashFill size={24} />
              </button>
              <input
                type="file"
                name="image"
                ref={ref}
                className="form-input-image"
                onChange={handleOnImageChange}
                accept=".jpg, .jpeg, .png"
              ></input>
            </div>

          </div>
          <div className="input-field register">
            {/* <span className="label">
              Phone Number (optional) - SMS Notifications
            </span>

            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="10 Digit US Phone Number (+1 assumed)"
              className={`form-input alone${
                colorModeState === "light" ? " gray-bg" : ""
              }`}
              value={registerForm.phone}
              onChange={handleOnRegisterFormChange}
            ></input> */}

            <div className="register-footer">
              {registerError ? (
                <div className="error">{registerError}</div>
              ) : null}
              <button
                className="register-btn"
                type="button"
                onClick={handleOnRegisterFormSubmit}
              >
               {isLoading ? <div className="loading-spinner"></div> : "Register"}
              </button>
              <h2 className="login-account">
                Have an account or continue with Google Account? Login{" "}
                <Link to="/login" className="login-link">
                  <span className="login-link">Here</span>
                </Link>
              </h2>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
