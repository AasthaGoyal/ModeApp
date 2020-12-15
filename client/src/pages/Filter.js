import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import Details from "./Details";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const allSizes = ["S", "M", "L", "XL", "XLL", "XLLL"];

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minPrice: "200",
      maxPrice: "1800",
      items: [],
      value: [200, 1800],
      selectedColor: "",
      colors: [],
      S: false,
      M: false,
      L: false,
      XL: false,
      XXL: false,
      XXXL: false,
      sort: "",
      limit: "'",
      showDetails: false,
      itemId: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
  }

  componentDidMount() {
    let colorLists = [];
    axios
      .get(
        "items/getItemByCategory/" + this.props.category
      )
      .then((res) => {
        if (res.data.success === true) {
          this.setState({ items: res.data.data });
          res.data.data.map((ex) => colorLists.push(ex.color));

          let uniqueColors = colorLists.filter((val, id, array) => {
            return array.indexOf(val) === id;
          });

          this.setState({
            limit: res.data.data.length,
            colors: uniqueColors,
          });
        } else {
          alert("Some error occured ", res.error);
        }
      })
      .catch((err) => console.log("Some error occured", err));

    this.getMaxPrice();
  }

  handleChange(e) {
    e.preventDefault();
    const { minPrice, maxPrice } = this.state;
    if (e.target.name === "minPrice") {
      this.setState({
        minPrice: e.target.value,
        value: [e.target.value, maxPrice],
      });
    } else {
      this.setState({
        maxPrice: e.target.value,
        value: [minPrice, e.target.value],
      });
    }
  }

  handleSizeChange(e) {
    if (e.target.checked) {
      this.setState({ [e.target.name]: true });
    } else {
      this.setState({ [e.target.name]: false });
    }
  }

  getMaxPrice() {
    axios
      .get("items/getFilters")
      .then((res) => {
        if (res.data.success === true) {
          this.setState({ maxPrice: res.data.price });
        } else {
          alert("Some error occured ", res.error);
        }
      })
      .catch((err) => console.log("Some error occured", err));
  }

  onSliderChange(e) {
    this.setState({ value: e, minPrice: e[0], maxPrice: e[1] });
  }

  handleSort = (e) => {
    e.preventDefault();
    this.setState({
      sort: e.target.value,
    });
  };

  handleShow = (e) => {
    e.preventDefault();
    this.setState({
      limit: e.target.value,
    });
  };

  imageClick = (id) => {
    this.setState({
      showDetails: true,
      itemId: id,
    });
  };

  onColorChange(e) {
    // let item = document.getElementById(e);
    // item.style.border = "solid #000000";
    this.setState({ selectedColor: e });
  }

  render() {
    console.log(this.state.itemId);
    if (this.state.showDetails) {
      return (
        <Details itemId={this.state.itemId} category={this.props.category} />
      );
    } else {
      if (this.state.items.length === 0) {
        return (
          <div class="loading-more">
            <i class="icon_loading"></i>
            <a href="#">Loading More</a>
          </div>
        );
      } else {
        console.log(this.state.S);
        let items = this.state.items.slice(0, this.state.limit);
        let colors = this.state.colors.map((color) => {
          return (
            <div class="cs-item" style={{ width: "52px", height: "40px" }}>
              <div
                id={color}
                style={{
                  backgroundColor: color,
                  width: "30px",
                  height: "30px",
                  mozBorderRadius: "50px",
                  webkitBorderRadius: "50px",
                  borderRadius: "50px",
                  cursor: "pointer",
                  float: "inherit",
                  border: "none",
                  marginBottom: "10px",
                }}
                onClick={() => this.onColorChange(color)}
              />
            </div>
          );
        });

        let sizes = allSizes.map((label) => {
          return (
            <li style={{ overflow: "hidden" }}>
              <label style={{ float: "left" }}>
                <input
                  type="checkbox"
                  name={label}
                  style={{
                    height: "30px",
                    width: "30px",
                    marginLeft: "10px",
                    marginRight: "10px",
                    background: "#e7ab3c",
                    color: "#e7ab3c",
                    fontSize: "22px",
                    float: "left",
                  }}
                  onChange={this.handleSizeChange}
                />
                {label}
              </label>
            </li>
          );
        });

        if (this.state.minPrice) {
          items = items.filter((item) => item.price >= this.state.minPrice);
        }
        if (this.state.maxPrice) {
          items = items.filter((item) => item.price <= this.state.maxPrice);
        }
        if (this.state.selectedColor) {
          items = items.filter(
            (item) => item.color === this.state.selectedColor
          );
        }

        if (this.state.S) {
          items = items.filter((item) => item.size.indexOf("S") > -1);
        }

        if (this.state.M) {
          items = items.filter((item) => item.size.indexOf("M") > -1);
        }

        if (this.state.L) {
          items = items.filter((item) => item.size.indexOf("L") > -1);
        }

        if (this.state.XL) {
          items = items.filter((item) => item.size.indexOf("XL") > -1);
        }

        if (this.state.XLL) {
          items = items.filter((item) => item.size.indexOf("XLL") > -1);
        }

        if (this.state.XLLL) {
          items = items.filter((item) => item.size.indexOf("XLLL") > -1);
        }

        if (this.state.sort) {
          if (this.state.sort === "-1") {
            items = items.sort((a, b) => b.price - a.price);
          }
          if (this.state.sort === "1") {
            items = items.sort((a, b) => a.price - b.price);
          }
        }

        let ItemLists = items.map((it) => {
          return (
            <div class="col-lg-4 col-sm-6">
              <div class="product-item">
                <div class="pi-pic">
                  <a href={it.id}>
                    <img
                      src={it.imgCollection[0]}
                      alt=""
                      style={{
                        width: "260px",
                        height: "353px",
                        cursor: "pointer",
                      }}
                      onClick={() => this.imageClick(it._id)}
                    />
                  </a>
                </div>
                <div class="pi-text">
                  <div class="catagory-name">{it.category}</div>
                  <a href={it.id}>
                    <h5>
                      {" "}
                      <label onClick={() => this.imageClick(it._id)}>
                        {it.name}
                      </label>
                    </h5>
                  </a>
                  <div class="product-price">Rs. {it.price}</div>
                </div>
              </div>
            </div>
          );
        });

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
                      <NavLink
                        exact
                        className="login-panel"
                        activeClassName="is-active"
                        to={`/${this.props.category}`}
                      >
                        <span> {this.props.category}</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section class="product-shop spad">
              <div class="container">
                <div class="row">
                  <div class="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
                    <div class="filter-widget">
                      <h4 class="fw-title">Size</h4>
                      <div>
                        <ul>{sizes}</ul>
                      </div>
                    </div>

                    <div class="filter-widget">
                      <h4 class="fw-title">Color</h4>
                      <div class="fw-color-choose">{colors}</div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div class="filter-widget">
                      <h4 class="fw-title">Price</h4>

                      <div class="filter-range-wrap">
                        <div class="range-slider" style={{ height: "30px" }}>
                          <div class="price-input"></div>

                          <input
                            name="minPrice"
                            style={{
                              width: "60px",
                              height: "30px",
                              float: "left",
                            }}
                            onChange={this.handleChange}
                            value={this.state.minPrice}
                          />

                          <input
                            name="maxPrice"
                            style={{
                              width: "60px",
                              height: "30px",
                              float: "right",
                            }}
                            onChange={this.handleChange}
                            value={this.state.maxPrice}
                          />
                          <br />
                        </div>

                        <div style={{ height: "30px", width: "210px" }}>
                          <Range
                            id="priceRange"
                            min={100}
                            max={10000}
                            value={this.state.value}
                            step="50"
                            onChange={this.onSliderChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-9 order-1 order-lg-2">
                    <div class="product-show-option">
                      <div class="row">
                        <div class="col-lg-7 col-md-7">
                          <div class="select-option">
                            <select
                              class="sorting form-control"
                              value={this.state.sort}
                              onChange={this.handleSort}
                            >
                              <option selected enabled="false">
                                Default Sorting
                              </option>
                              <option value="1"> Price (Low to High)</option>
                              <option value="-1"> Price (High to Low)</option>
                            </select>
                            <select
                              class="p-show form-control"
                              value={this.state.limit}
                              onChange={this.handleShow}
                            >
                              <option selected value="100" enabled="false">
                                Show All
                              </option>
                              <option value="10"> 10</option>
                              <option value="20">20</option>
                              <option value="30"> 30 </option>
                            </select>
                          </div>
                        </div>
                        <div class="col-lg-5 col-md-5 text-right">
                          <p>Showing {this.state.limit} product(s)</p>
                        </div>
                      </div>
                    </div>

                    {/* {this.state.sort.length > 0 || this.state.limit.length > 0 ? (
                  <Data
                    key={this.state.sort}
                    sort={this.state.sort}
                    category={this.props.category}
                    limit={this.state.limit}
                  />
                ) : null} */}
                    {/* <ul>
                  {items.map((item) => (
                    <li key={item._id}>
                      {" "}
                      {item.price}, {item.color}, {item.size}
                    </li>
                  ))}
                </ul> */}
                    <div class="product-list">
                      <div class="row">{ItemLists}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <script src="js/jquery-3.3.1.min.js"></script>
            <script src="js/bootstrap.min.js"></script>
            <script src="js/jquery-ui.min.js"></script>
            <script src="js/jquery.countdown.min.js"></script>
            <script src="js/jquery.nice-select.min.js"></script>
            <script src="js/jquery.zoom.min.js"></script>
            <script src="js/jquery.dd.min.js"></script>
            <script src="js/jquery.slicknav.js"></script>
            <script src="js/owl.carousel.min.js"></script>
            <script src="js/main.js"></script>
          </div>
        );
      }
    }
  }
}

export default Filter;
