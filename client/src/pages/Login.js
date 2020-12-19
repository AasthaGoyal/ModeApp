import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import App from "../App";
import { validateFields } from "./ValidateLoginFields";
import classnames from "classnames";
import * as emailjs from "emailjs-com";
require("dotenv").config();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      email: {
        value: "",
        validateOnChange: false,
        error: "",
      },
      password: {
        value: "",
        validateOnChange: false,
        error: "",
      },
      submitCalled: false,
      allFieldsValidated: false,
      allow: false,
      forgot: false,
      cemail: "",
      smessage: "",
    };
  }

  handleClose = (e) => {
    this.setState({ forgot: false });
  };

  handleForgot = (e) => {
    this.setState({ forgot: true });
  };

  handleResend = (e) => {
    this.setState({ cemail: e.target.value });
  };

  sendEmail = (e) => {
    e.preventDefault();

    if (this.state.cemail.length > 0) {
      axios
        .get("/api/users/resetPassword/" + this.state.cemail)
        .then((res) => res.data)
        .then((data) => {
          emailjs.init(process.env.REACT_APP_USER_ID);

          if (data.success === true) {
            let templateParams = data.data.map((user) => {
              return (templateParams = {
                email: user.email,
                password: user.password,
                name: user.name,
              });
            });
            //if user is found

            emailjs
              .send(
                "default_service",
                "forget_password",
                templateParams,
                process.env.REACT_APP_USER_ID
              )
              .then((res) => {
                console.log(res);
                this.setState({
                  smessage: "Check your email for further instructions ",
                });
              });
          } else {
            this.setState({
              smessage:
                "The user is not registered with us, please contact admin",
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({
        smessage: "Please enter your registered email id to continue",
      });
    }
  };

  handleBlur(validationFunc, evt) {
    const field = evt.target.name;

    if (
      this.state[field]["validateOnChange"] === false &&
      this.state.submitCalled === false
    ) {
      this.setState((state) => ({
        [field]: {
          ...state[field],
          validateOnChange: true,
          error: validationFunc(state[field].value),
        },
      }));
    }
    return;
  }

  handleChange(validationFunc, evt) {
    const field = evt.target.name;
    const fieldVal = evt.target.value;
    this.setState((state) => ({
      [field]: {
        ...state[field],
        value: fieldVal,
        error: state[field]["validateOnChange"] ? validationFunc(fieldVal) : "",
      },
    }));
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const emailError = validateFields.validateEmail(this.state.email.value);
    const passwordError = validateFields.validatePassword(
      this.state.password.value
    );
    if ([emailError, passwordError].every((e) => e === false)) {
      // no errors submit the form
      console.log("success");
      axios
        .get("users/getUser", {
          params: {
            email: this.state.email.value,
            password: this.state.password.value,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            res.data.user.length === 0
              ? this.setState({
                  message: "Invalid Username or password combination",
                  allow: false,
                })
              : this.setState({
                  message:
                    "Successfully logged in! Welcome " + res.data.user[0].name,
                  allow: true,
                });
          } else {
            this.setState({
              message: "Some error occured" + res.message,
            });
          }
        });

      // clear state and show all fields are validated
      this.setState({ allFieldsValidated: true });
      this.showAllFieldsValidated();
    } else {
      // update the state with errors
      this.setState((state) => ({
        email: {
          ...state.email,
          validateOnChange: true,
          error: emailError,
        },
        password: {
          ...state.password,
          validateOnChange: true,
          error: passwordError,
        },
      }));
    }
  }

  showAllFieldsValidated() {
    setTimeout(() => {
      this.setState({ allFieldsValidated: false });
    }, 1500);
  }

  render() {
    if (this.state.allow) {
      return <App login={this.state.allow} />;
    } else {
      return (
        <div>
          <div class="breacrumb-section">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="breadcrumb-text">
                    <NavLink
                      exact
                      className="login-panel"
                      activeClassName="is-active"
                      to="/Home"
                    >
                      <i className="fa fa-home"></i>Home
                    </NavLink>
                    <span> Login</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="register-login-section spad">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 offset-lg-3">
                  <div className="login-form">
                    <h2>Login</h2>
                    <form onSubmit={(evt) => this.handleSubmit(evt)}>
                      <div className="group-input">
                        <label for="username">
                          Username or email address *
                        </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          value={this.state.email.value}
                          placeholder="Enter your email"
                          className={classnames(
                            "form-control",
                            { "is-valid": this.state.email.error === false },
                            { "is-invalid": this.state.email.error }
                          )}
                          onChange={(evt) =>
                            this.handleChange(validateFields.validateEmail, evt)
                          }
                          onBlur={(evt) =>
                            this.handleBlur(validateFields.validateEmail, evt)
                          }
                        />
                        <div className="invalid-feedback">
                          {this.state.email.error}
                        </div>
                      </div>
                      <div className="group-input">
                        <label for="pass">Password *</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={this.state.password.value}
                          placeholder="Enter your password"
                          className={classnames(
                            "form-control",
                            { "is-valid": this.state.password.error === false },
                            { "is-invalid": this.state.password.error }
                          )}
                          onChange={(evt) =>
                            this.handleChange(
                              validateFields.validatePassword,
                              evt
                            )
                          }
                          onBlur={(evt) =>
                            this.handleBlur(
                              validateFields.validatePassword,
                              evt
                            )
                          }
                        />
                        <div className="invalid-feedback">
                          {this.state.password.error}
                        </div>
                      </div>
                      <div className="group-input gi-check">
                        <div className="gi-more">
                          {/* <button
                            onClick={this.forgetPassword.bind(this)}
                            className="or-login"
                          >
                            {" "}
                            Forget Password
						  </button>
						   */}
                          <button
                            className="or-login"
                            style={{ boder: "none" }}
                            onClick={this.handleForgot}
                          >
                            {" "}
                            Forget Password
                          </button>
                          {this.state.forgot && (
                            <Popup
                              content={
                                <>
                                  <h3> Reset Password</h3>
                                  <br />
                                  <div className="group-input">
                                    Enter Your Email:{" "}
                                    <input
                                      type="email"
                                      id="email"
                                      name="email"
                                      placeholder="Email"
                                      style={{ width: "300px", height: "30px" }}
                                      onChange={this.handleResend}
                                    />{" "}
                                    <button
                                      style={{
                                        color: "#ffffff",
                                        height: "30px",
                                        background: "#e7ab3c",
                                        margin: "5px 0px 0px",
                                      }}
                                      onClick={this.sendEmail}
                                    >
                                      {" "}
                                      Submit
                                    </button>
                                  </div>

                                  <div>
                                    <p className="text-success text-center">
                                      {" "}
                                      {this.state.smessage}
                                    </p>
                                  </div>
                                </>
                              }
                              handleClose={this.handleClose}
                            />
                          )}

                          {/* <NavLink
                            exact
                            className="forget-pass"
                            activeClassName="is-active"
                            to="/Register"
                          >
                            <i className="fa fa-user"></i>Create an account
                          </NavLink> */}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="site-btn login-btn"
                        onMouseDown={() =>
                          this.setState({ submitCalled: true })
                        }
                      >
                        Sign In
                      </button>
                    </form>
                    <div className="switch-login">
                      {this.state.allFieldsValidated && (
                        <p className="text-success text-center">
                          {this.state.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const Popup = (props) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
        background: "#0000050",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "70%",
          margin: "0 auto",
          height: "auto",
          maxHeight: "70vh",
          marginTop: "calc(100vh - 85vh - 20px",
          borderRadius: "4px",
          padding: "20px",
          border: "1px solid #999",
          overflow: "auto",
          background: "#fff",
        }}
      >
        <span
          style={{
            content: "x",
            cursor: "pointer",
            position: "fixed",
            right: "calc(15% - 30px)",
            top: "calc(100vh - 85vh - 33px)",
            background: "#ededed",
            width: "25px",
            height: "25px",
            borderRadius: "50%",
            lineHeight: "20px",
            textAlign: "center",
            border: "1px solid #999",
            fontSize: "20px",
          }}
          onClick={props.handleClose}
        >
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};

export default Login;
