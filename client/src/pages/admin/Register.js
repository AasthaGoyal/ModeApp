import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { validateFields } from "../ValidateRegisterFields";
import classnames from "classnames";

const initialState = {
  name: {
    value: "",
    validateOnChange: false,
    error: "",
  },
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
  cpassword: {
    value: "",
    validateOnChange: false,
    error: "",
  },
  submitCalled: false,
  allFieldsValidated: false,
  message: "",
};

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  handleBlur(validationFunc, evt) {
    const field = evt.target.name;
    // validate onBlur only when validateOnChange for that field is false
    // because if validateOnChange is already true there is no need to validate onBlur
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

  /*
   * update the value in state for that field
   * check for error if validateOnChange is true
   */
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

  /*
   * validate all fields
   * check if all fields are valid if yes then submit the Form
   * otherwise set errors for the feilds in the state
   */
  handleSubmit(evt) {
    evt.preventDefault();
    // validate all fields
    const { name, email, password, cpassword } = this.state;
    const nameError = validateFields.validateName(name.value);
    const emailError = validateFields.validateEmail(email.value);
    const passwordError = validateFields.validatePassword(password.value);
    const cpasswordError = validateFields.validateCpassword(cpassword.value);
    if (
      [nameError, emailError, passwordError, cpasswordError].every(
        (e) => e === false
      )
    ) {
      // no errors submit the form
      console.log("success");
      if (password.value !== cpassword.value) {
        this.setState({ message: "The passwords dont match" });
      } else {
        let data = {
          name: name.value,
          email:email.value,
          password: password.value,
        };
  
        axios.post("users/addUser", data).then((res) => {
          if (res.status === 200) {
            console.log(res);
            this.setState({ message: "The user has been saved successfully" });
          } else {
            this.setState({ message: "Some error occured" + res.message });
          }
        });
      }
      // clear state and show all fields are validated
      this.setState({ allFieldsValidated: true });
      this.showAllFieldsValidated();
    } else {
      // update the state with errors
      this.setState((state) => ({
        name: {
          ...state.name,
          validateOnChange: true,
          error: nameError,
        },
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
        cpassword: {
          ...state.cpassword,
          validateOnChange: true,
          error: cpasswordError,
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
    const {
      name,
      email,
      password,
      cpassword,
      allFieldsValidated,
      message,
    } = this.state;
    return (
      <div>
        <div className="breacrumb-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-text">
                  <NavLink
                    exact
                    className="login-panel"
                    activeClassName="is-active"
                    to="/Login"
                  >
                    <i className="fa fa-home"></i>Admin Login
                  </NavLink>
                  <span>Register</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="register-login-section spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="register-form">
                  <h2>Register</h2>
                  <form onSubmit={(evt) => this.handleSubmit(evt)}>
                    <div className="group-input">
                      <label for="username">Full Name*</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={name.value}
                        className={classnames(
                          "form-control",
                          { "is-valid": name.error === false },
                          { "is-invalid": name.error }
                        )}
                        onChange={(evt) =>
                          this.handleChange(validateFields.validateName, evt)
                        }
                        onBlur={(evt) =>
                          this.handleBlur(validateFields.validateName, evt)
                        }
                      />
                      <div className="invalid-feedback">{name.error}</div>
                    </div>
                    <div className="group-input">
                      <label for="username">Email address *</label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={email.value}
                        className={classnames(
                          "form-control",
                          { "is-valid": email.error === false },
                          { "is-invalid": email.error }
                        )}
                        onChange={(evt) =>
                          this.handleChange(validateFields.validateEmail, evt)
                        }
                        onBlur={(evt) =>
                          this.handleBlur(validateFields.validateEmail, evt)
                        }
                      />
                      <div className="invalid-feedback">{email.error}</div>
                    </div>
                    <div className="group-input">
                      <label for="pass">Password *</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={password.value}
                        className={classnames(
                          "form-control",
                          { "is-valid": password.error === false },
                          { "is-invalid": password.error }
                        )}
                        onChange={(evt) =>
                          this.handleChange(
                            validateFields.validatePassword,
                            evt
                          )
                        }
                        onBlur={(evt) =>
                          this.handleBlur(validateFields.validatePassword, evt)
                        }
                      />
                      <div className="invalid-feedback">{password.error}</div>
                    </div>
                    <div className="group-input">
                      <label for="con-pass">Confirm Password *</label>
                      <input
                        type="password"
                        id="cpassword"
                        name="cpassword"
                        value={cpassword.value}
                        className={classnames(
                          "form-control",
                          { "is-valid": cpassword.error === false },
                          { "is-invalid": cpassword.error }
                        )}
                        onChange={(evt) =>
                          this.handleChange(
                            validateFields.validateCpassword,
                            evt
                          )
                        }
                        onBlur={(evt) =>
                          this.handleBlur(validateFields.validateCpassword, evt)
                        }
                      />
                      <div className="invalid-feedback">{cpassword.error}</div>
                    </div>
                    <button
                      type="submit"
                      onMouseDown={() => this.setState({ submitCalled: true })}
                      className="site-btn register-btn"
                    >
                      REGISTER
                    </button>
                  </form>
                  <div className="switch-login">
                    {allFieldsValidated && (
                      <p className="text-success text-center">{message}</p>
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

export default Register;
