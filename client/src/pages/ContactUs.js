import React from "react";
import Map from "./Map";
import * as emailjs from "emailjs-com";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
import { validateFields } from "./ValidateFields";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

require("dotenv").config();
// const contactUsSchema = Yup.object().shape({
//   name: Yup.string().required("Required"),
//   email: Yup.string().email("Invalid email").required("Required"),
//   message: Yup.string().required("Required"),
// });

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
  message: {
    value: "",
    validateOnChange: false,
    error: "",
  },
  submitCalled: false,
  allFieldsValidated: false,
};

// const isValid = {
// 	borderColor: "#28a745",
//     paddingRight: "calc(1.5em + .75rem)",
//     backgroundImage: "url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e)",
//     backgroundRepeat: "no-repeat",
//     backgroundPosition: "right calc(.375em + .1875rem) center",
//     backgroundSize: "calc(.75em + .375rem) calc(.75em + .375rem)",
// }

// const isInvalid = {
// 	borderColor: "#dc3545",
// 	paddingRight: "calc(1.5em + .75rem)",
//     backgroundImage: "url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e)",
// 	backgroundRepeat: "no-repeat",
//     backgroundPosition: "right calc(.375em + .1875rem) center",
//     backgroundSize: "calc(.75em + .375rem) calc(.75em + .375rem)",
// }

const location = {
  address: "202, Udyog Vihar Phase V Phase V, Udyog Vihar",
  lat: 28.5002256,
  lng: 77.0832571,
};

class ContactUs extends React.Component {
  constructor() {
    super();
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
	
    // validate all fields
    const { name, email, message } = this.state;
    const nameError = validateFields.validateName(name.value);
    const emailError = validateFields.validateEmail(email.value);
    const messageError = validateFields.validateMessage(message.value);
    if ([nameError, emailError, messageError].every((e) => e === false)) {
      // no errors submit the form
      console.log("success");

      // clear state and show all fields are validated

      emailjs.init(process.env.REACT_APP_USER_ID);

      console.log("the states are", name, email, message);
      let templateParams = {
        email: email.value,
        to: "mgarg063@gmail.com",
        name: name.value,
        subject: "from customer " + name.value,
        message: message.value,
      };

      emailjs
        .send(
          "default_service",
          "mode_template",
          templateParams,
          process.env.REACT_APP_USER_ID
        )
        .then((res) =>
          res.status === 200
            ? this.setState({
                result:
                  "Thanks for contacting us, we will get back to you soon!",
              })
            : null
        )
        .catch((err) =>
          this.setState({
            result: "Some error occured, please contact admin",
          })
        );
      this.setState({ allFieldsValidated: true });
      this.showAllFieldsValidated();
    } else {
      // update the state with errors
      this.setState((state) => ({
        name: {
          ...state.name,
          validationOnChange: true,
          error: nameError,
        },
        email: {
          ...state.email,
          validateOnChange: true,
          error: emailError,
        },
        message: {
          ...state.message,
          validateOnChange: true,
          error: messageError,
        },
      }));
    }
  }

  showAllFieldsValidated() {
    setTimeout(() => {
      this.setState({ allFieldsValidated: false, ...initialState });
    }, 5000);
  }

  render() {
    const { name, email, message, allFieldsValidated } = this.state;
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
                 
                  <span>Contact Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="map spad">
          <div class="container">
            <div class="map-inner">
              <Map location={location} zoomLevel={17} />
              {/* <iframe
                  src="https://www.google.co.nz/maps/place/202,+Udyog+Vihar+Phase+V,+Phase+V,+Udyog+Vihar,+Sector+19,+Gurugram,+Haryana+122008,+India/@28.5002209,77.0832571,17z/data=!3m1!4b1!4m5!3m4!1s0x390d1941325e7a6f:0xcf587c7cfed6380a!8m2!3d28.5002209!4d77.0854458"
                  height="610"
                  style={{ border: 0 }}
                  allowfullscreen=""
                ></iframe> */}
              {/* <div class="icon">
                  <i class="fa fa-map-marker"></i>
                </div> */}
            </div>
          </div>
        </div>

        <section class="contact-section spad">
          <div class="container">
            <div class="row">
              <div class="col-lg-5">
                <div class="contact-title">
                  <h4>Contact Us</h4>
                  <p>Feel free to contact us for any queries</p>
                </div>
                <div class="contact-widget">
                  <div class="cw-item">
                    <div class="ci-icon">
                      <i class="ti-location-pin"></i>
                    </div>
                    <div class="ci-text">
                      <span>Address:</span>
                      <p>
                        202, Udyog Vihar Phase V Phase V, Udyog Vihar, Sector 19
                        Gurugram, Haryana 122008
                      </p>
                    </div>
                  </div>
                  <div class="cw-item">
                    <div class="ci-icon">
                      <i class="ti-mobile"></i>
                    </div>
                    <div class="ci-text">
                      <span>Phone:</span>
                      <p>+91 9910991208</p>
                    </div>
                  </div>
                  <div class="cw-item">
                    <div class="ci-icon">
                      <i class="ti-email"></i>
                    </div>
                    <div class="ci-text">
                      <span>Email:</span>
                      <p>mgarg073@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 offset-lg-1">
                <div class="contact-form">
                  <div class="leave-comment">
                    <h4>Leave A Comment</h4>
                    <p>
                      Our staff will call back later and answer your questions.
                    </p>
                  
                    <div className="card-body">
                      {allFieldsValidated && (
                        <p className="text-success text-center">
                          {this.state.result}
                        </p>
                      )}

                     
                      <form
                        onSubmit={(evt) => this.handleSubmit(evt)}
                        className="comment-form"
                      >
                        <div class="row">
                          
                          <div className=" col-lg-6">
                            <input
                              type="text"
                              name="name"
                              value={name.value}
                              placeholder="Enter your Name "
                              //   style={name.error && name.error ? isInvalid :isValid}
                              className={classnames(
                                "form-control",
                                { "is-valid": name.error === false },
                                { "is-invalid": name.error }
                              )}
                              onChange={(evt) =>
                                this.handleChange(
                                  validateFields.validateName,
                                  evt
                                )
                              }
                              onBlur={(evt) =>
                                this.handleBlur(
                                  validateFields.validateName,
                                  evt
                                )
                              }
                            />
                            <div className="invalid-feedback">{name.error}</div>
                          </div>

                          <div className="col-lg-6">
                            <input
                              type="email"
                              name="email"
                              value={email.value}
                              placeholder="Enter your Email"
                              className={classnames(
                                "form-control",
                                { "is-valid": email.error === false },
                                { "is-invalid": email.error }
                              )}
                              onChange={(evt) =>
                                this.handleChange(
                                  validateFields.validateEmail,
                                  evt
                                )
                              }
                              onBlur={(evt) =>
                                this.handleBlur(
                                  validateFields.validateEmail,
                                  evt
                                )
                              }
                            />
                            <div className="invalid-feedback">
                              {email.error}
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <textarea
                              type="text"
                              name="message"
                              value={message.value}
                              placeholder="Enter your Message"
                              className={classnames(
                                "form-control",
                                { "is-valid": message.error === false },
                                { "is-invalid": message.error }
                              )}
                              onChange={(evt) =>
                                this.handleChange(
                                  validateFields.validateMessage,
                                  evt
                                )
                              }
                              onBlur={(evt) =>
                                this.handleBlur(
                                  validateFields.validateMessage,
                                  evt
                                )
                              }
                            />
                            <div className="invalid-feedback">
                              {message.error}
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="site-btn"
                            onMouseDown={() =>
                              this.setState({ submitCalled: true })
                            }
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* <form
                      class="comment-form"
                      onSubmit={(evt) => this.handleSubmit(evt)}
                    >
                      <div class="row">
                        {allFieldsValidated && (
                          <p className="text-success text-center">
                            Success, All fields are validated
                          </p>
                        )}
                        <div class="col-lg-6">
                          <input
                            type="text"
                            placeholder="Your name"
                            value={name.value}
                            name="name"
                            id="name"
                            onChange={(e) =>
                              this.handleChange(validateFields.validateName, e)
                            }
                            onBlur={(e) =>
                              this.handleBlur(validateFields.validateName, e)
                            }
                            className={classnames(
                              "form-control",
                              {
                                "is-valid": name.error === false,
                              },
                              { "is-invalid": name.error }
                            )}
                          />
                          {/* {errors.name && touched.name ? (
                              <div style={{ color: "red", fontWeight: "bold" }}>
                                {" "}
                                {errors.name}
                              </div>
                            ) : null} 
                          <div className="invalid-feedback"> {name.error}</div>
                        </div>
                        <div class="col-lg-6">
                          <input
                            id="email"
                            type="email"
                            placeholder="Your email"
                            name="email"
                            value={email.value}
                            onChange={(e) =>
                              this.handleChange(validateFields.validateEmail, e)
                            }
                            onBlur={(e) =>
                              this.handleBlur(validateFields.validateEmail, e)
                            }
                            className={classnames(
                              "form-control",
                              {
                                "is-valid": email.error === false,
                              },
                              { "is-invalid": email.error }
                            )}
                          />
                          {/* {errors.email && touched.email ? (
                              <div> {errors.email}</div>
                            ) : null} 
                          <div className="invalid-feedback"> {email.error}</div>
                        </div>
                        <div class="col-lg-12">
                          <input
                            placeholder="Your message"
                            id="message"
                            value={message.value}
                            name="message"
                            onChange={(e) =>
                              this.handleChange(
                                validateFields.validateMessage,
                                e
                              )
                            }
                            onBlur={(e) =>
                              this.handleBlur(validateFields.validateMessage, e)
                            }
                            className={classnames(
                              "form-control",
                              {
                                "is-valid": message.error === false,
                              },
                              { "is-invalid": message.error }
                            )}
                          />
                          {/* {errors.message && touched.message ? (
                              <div> {errors.message}</div>
                            ) : null} 
                          <div className="invalid-feedback">
                            {" "}
                            {message.error}
                          </div>
                          <button
                            type="submit"
                            class="site-btn"
                            // onClick={() =>
                            //   validateForm().then((res) => console.log(res))
                            // }
                            onMouseDown={() =>
                              this.setState({ submitCalled: true })
                            }
                          >
                            Send message
                          </button>
                          <br />
                          <label style={{ color: "red", fontWeight: "bold" }}>
                            {" "}
                            {this.state.result}
                          </label>
                        </div>
                      </div>
                    </form> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/emailjs-com@2/dist/email.min.js"
        ></script>
      </div>
    );
  }
}

export default ContactUs;
