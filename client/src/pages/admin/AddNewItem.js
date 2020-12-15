import React from "react";
import axios from "axios";
import Select from "react-select";
import ReactColorPicker from "@super-effective/react-color-picker";

import { validateFields } from "../ValidateItemFields";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

class AddNewItem extends React.Component {
  constructor() {
    super();

    this.state = {
      category: {
        value: "",
        validationOnChange: false,
        error: "",
      },
      name: {
        value: "",
        validateOnChange: false,
        error: "",
      },
      desc: {
        value: "",
        validateOnChange: false,
        error: "",
      },
      price: { value: "", validateOnChange: false, error: "" },
      care: { value: "", validateOnChange: false, error: "" },
      stock: { value: "", validateOnChange: false, error: "" },

      submitCalled: false,
      allFieldsValidated: false,
      imgCollection: "",
      selectedOption: " ",
      setColor: "",
      message: "",
      s: false,
      m: false,
      l: false,
      xl: false,
      xxl: false,
      xxxl: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onFileChange(e) {
    if (e.target.files.length > 0) {
      this.setState({ imgCollection: e.target.files });
    } else {
      this.setState({ message: "Please upload at least one image" });
    }
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

  categorySelected(e) {
    e.preventDefault();

    this.setState({
      selectedOption: e.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log("reachig");
    // validate all fields

    const nameError = validateFields.validateName(this.state.name.value);
    const descError = validateFields.validateDescription(this.state.desc.value);
    const priceError = validateFields.validatePrice(this.state.price.value);
    const careError = validateFields.validateCare(this.state.care.value);
    const stockError = validateFields.validateStock(this.state.stock.value);
    if (
      [nameError, descError, priceError, careError, stockError].every(
        (e) => e === false
      )
    ) {
      // no errors submit the form
      console.log("success");

      let lists = this.getAllSizes();

      let formData = new FormData();
      for (const key of Object.keys(this.state.imgCollection)) {
        formData.append("imgCollection", this.state.imgCollection[key]);
      }
      formData.append("name", this.state.name.value);
      formData.append("desc", this.state.desc.value);
      formData.append("price", this.state.price.value);
      formData.append("care", this.state.care.value);
      for (const key of Object.keys(lists)) {
        formData.append("size", lists[key]);
      }
      formData.append("stock", this.state.stock.value);
      formData.append("color", this.state.setColor);
      formData.append("category", this.state.selectedOption);

      axios
        .post("items/upload-images", formData, {})

        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          data.success === true
            ? this.setState({ message: "The item was successfully added" })
            : this.setState({
                message: "Sorry some error occured" + data.error,
              });
        });

      // clear state and show all fields are validated
      this.setState({ allFieldsValidated: true });
      this.showAllFieldsValidated();
    } else {
      // update the state with errors
      this.setState((state) => ({
        // category: {
        //   ...state.category,
        //   validationOnChange: true,
        //   error: categoryError,
        // },
        name: {
          ...state.name,
          validationOnChange: true,
          error: nameError,
        },
        desc: {
          ...state.desc,
          validationOnChange: true,
          error: descError,
        },
        price: {
          ...state.price,
          validateOnChange: true,
          error: priceError,
        },
        stock: {
          ...state.stock,
          validateOnChange: true,
          error: stockError,
        },
        care: {
          ...state.care,
          validationOnChange: true,
          error: careError,
        },
      }));
    }
  }

  showAllFieldsValidated() {
    setTimeout(() => {
      this.setState({ allFieldsValidated: false });
    }, 5000);
  }

  // onTextChange = (event) => {
  //   event.preventDefault();

  //   switch (event.target.name) {
  //     case "name":
  //       this.setState({ name: event.target.value });
  //       break;
  //     case "desc":
  //       this.setState({ desc: event.target.value });
  //       break;
  //     case "code":
  //       this.setState({ code: event.target.value });
  //       break;
  //     case "price":
  //       this.setState({ price: event.target.value });
  //       break;
  //     case "care":
  //       this.setState({ care: event.target.value });
  //       break;
  //     case "stock":
  //       this.setState({ stock: event.target.value });
  //       break;
  //   }
  // };

  onSizeSelected = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = "#ABABAB";
    this.setState({ [e.target.name]: true });
  };

  onColorChange = (e) => {
    this.setState({ setColor: e });
  };
  getAllSizes() {
    let lists = [];
    if (this.state.s) lists.push("S");
    if (this.state.m) lists.push("M");
    if (this.state.l) lists.push("L");
    if (this.state.xl) lists.push("XL");
    if (this.state.xxl) lists.push("XXL");
    if (this.state.xxxl) lists.push("XXXL");
    return lists;
  }

  render() {
    const data = [
      "Kurta",
      "Kurta Plazo Set",
      "A Line Kurta",
      "Kurta Plazo Dupatta Set",
    ];
    let cats = data.map((ex) => {
      return <option value={ex}> {ex}</option>;
    });

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

                  <span>Add New Item</span>
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
                  <h2>Add New Item</h2>
                  <form onSubmit={(evt) => this.handleSubmit(evt)}>
                    <div className="group-input">
                      <label for="category">Choose category *</label>

                      <select
                        placeholder="Choose category"
                        value={this.state.selectedOption}
                        onChange={this.categorySelected.bind(this)}
                        className="form-control"
                      >
                        <option selected enabled="false">
                          {" "}
                          Choose category
                        </option>
                        {cats}
                      </select>
                    </div>

                    <div className="group-input">
                      <label for="name">Item Image (Multiple) *</label>
                      <input
                        type="file"
                        multiple
                        id="imgCollection"
                        name="imgCollection"
                        required
                        onChange={this.onFileChange}
                      />
                    </div>
                    <div className="group-input">
                      <label for="name">
                        Item name *
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={this.state.name.value}
                          className={classnames(
                            "form-control",
                            { "is-valid": this.state.name.error === false },
                            { "is-invalid": this.state.name.error }
                          )}
                          onChange={(evt) =>
                            this.handleChange(validateFields.validateName, evt)
                          }
                          onBlur={(evt) =>
                            this.handleBlur(validateFields.validateName, evt)
                          }
                        />
                        <div className="invalid-feedback">
                          {this.state.name.error}
                        </div>
                      </label>
                    </div>
                    <div className="group-input">
                      <label for="desc">Description *</label>
                      <textarea
                        type="text"
                        id="desc"
                        name="desc"
                        value={this.state.desc.value}
                        className={classnames(
                          "form-control",
                          { "is-valid": this.state.desc.error === false },
                          { "is-invalid": this.state.desc.error }
                        )}
                        onChange={(evt) =>
                          this.handleChange(
                            validateFields.validateDescription,
                            evt
                          )
                        }
                        onBlur={(evt) =>
                          this.handleBlur(
                            validateFields.validateDescription,
                            evt
                          )
                        }
                      />
                      <div className="invalid-feedback">
                        {this.state.desc.error}
                      </div>
                    </div>

                    <div className="group-input">
                      <label for="price">Price (Rs) *</label>
                      <input
                        type="Number"
                        id="price"
                        name="price"
                        value={this.state.price.value}
                        className={classnames(
                          "form-control",
                          { "is-valid": this.state.price.error === false },
                          { "is-invalid": this.state.price.error }
                        )}
                        onChange={(evt) =>
                          this.handleChange(validateFields.validatePrice, evt)
                        }
                        onBlur={(evt) =>
                          this.handleBlur(validateFields.validatePrice, evt)
                        }
                      />
                      <div className="invalid-feedback">
                        {this.state.price.error}
                      </div>
                    </div>

                    <div className="group-input">
                      <label for="size">
                        Sizes available (select all that applies)*
                      </label>
                      <button
                        style={{
                          backgroundColor: "#e7e7e7",
                          border: " 2px solid #e7e7e7",
                          width: "50px",
                          height: "50px",
                        }}
                        onClick={this.onSizeSelected}
                        value="S"
                        id="s"
                        name="s"
                      >
                        {" "}
                        S
                      </button>
                      {"  "}
                      <button
                        style={{
                          backgroundColor: "#e7e7e7",
                          border: " 2px solid #e7e7e7",
                          width: "50px",
                          height: "50px",
                        }}
                        onClick={this.onSizeSelected}
                        value="M"
                        id="m"
                        name="m"
                      >
                        {" "}
                        M
                      </button>
                      {"  "}
                      <button
                        style={{
                          backgroundColor: "#e7e7e7",
                          border: " 2px solid #e7e7e7",
                          width: "50px",
                          height: "50px",
                        }}
                        onClick={this.onSizeSelected}
                        value="L"
                        id="l"
                        name="l"
                      >
                        {" "}
                        L
                      </button>
                      {"  "}
                      <button
                        style={{
                          backgroundColor: "#e7e7e7",
                          border: " 2px solid #e7e7e7",
                          width: "50px",
                          height: "50px",
                        }}
                        onClick={this.onSizeSelected}
                        value="XL"
                        id="xl"
                        name="xl"
                      >
                        {" "}
                        XL
                      </button>
                      {"  "}
                      <button
                        style={{
                          backgroundColor: "#e7e7e7",
                          border: " 2px solid #e7e7e7",
                          width: "50px",
                          height: "50px",
                        }}
                        onClick={this.onSizeSelected}
                        value="XXL"
                        id="xxl"
                        name="xxl"
                      >
                        {" "}
                        XXL
                      </button>
                      {"  "}
                      <button
                        style={{
                          backgroundColor: "#e7e7e7",
                          border: " 2px solid #e7e7e7",
                          width: "50px",
                          height: "50px",
                        }}
                        onClick={this.onSizeSelected}
                        value="XXXL"
                        id="xxxl"
                        name="xxxl"
                      >
                        {" "}
                        XXXL
                      </button>
                    </div>
                    <div className="group-input">
                      <label for="stock">Care</label>
                      <input
                        type="String"
                        id="care"
                        name="care"
                        value={this.state.care.value}
                        className={classnames(
                          "form-control",
                          { "is-valid": this.state.care.error === false },
                          { "is-invalid": this.state.care.error }
                        )}
                        onChange={(evt) =>
                          this.handleChange(validateFields.validateCare, evt)
                        }
                        onBlur={(evt) =>
                          this.handleBlur(validateFields.validateCare, evt)
                        }
                      />
                      <div className="invalid-feedback">
                        {this.state.care.error}
                      </div>
                    </div>

                    <div className="group-input">
                      <label for="stock">Stock Limit*</label>
                      <input
                        type="Number"
                        id="stock"
                        name="stock"
                        value={this.state.stock.value}
                        className={classnames(
                          "form-control",
                          { "is-valid": this.state.stock.error === false },
                          { "is-invalid": this.state.stock.error }
                        )}
                        onChange={(evt) =>
                          this.handleChange(validateFields.validateStock, evt)
                        }
                        onBlur={(evt) =>
                          this.handleBlur(validateFields.validateStock, evt)
                        }
                      />
                      <div className="invalid-feedback">
                        {this.state.stock.error}
                      </div>
                    </div>
                    <div className="group-input">
                      <label for="stock">Colour*</label>
                      <ReactColorPicker
                        color="#ff00ff"
                        required
                        onChange={this.onColorChange}
                      />
                    </div>

                    <button
                      type="submit"
                      className="site-btn register-btn"
                      // onMouseDown={() => this.setState({ submitCalled: true })}
                      onClick={(evt) => this.handleSubmit(evt)}
                    >
                      Add item
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

export default AddNewItem;
