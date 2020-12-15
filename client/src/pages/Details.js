import React from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { NavLink } from "react-router-dom";

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = { item: [], message: "", selectedImage: "" };
    console.log(this.props.itemId);
    this.onImageClicked = this.onImageClicked.bind(this);
  }

  componentDidMount() {
    console.log("details is reaching");
    axios
      .get("items/getItemById/" + this.props.itemId)
      .then(
        (res) => res.data.data
        // res.success === true
        // 	? res.data.data
        // 	: this.setState({ message: "No item with that Id was found" });
      )
      .then((data) => {
        console.log(data);
        this.setState({ item: data });
      });
  }

  onImageClicked = (image) => {
    //this.setState({ selectedImage: image });
    console.log(image);
  };

  render() {
    if (this.state.item.length === 0) {
      return (
        <div class="loading-more">
          <i class="icon_loading"></i>
          <a href="#">Loading More</a>
        </div>
      );
    } else {
      console.log(this.state.item);
      let images = this.state.item.imgCollection.map((img) => {
        return (
          // <div class='pt active' data-imgbigurl={img}>
          // 	<img src={img} style={{width:"100%", height: "700px"}} alt='' onClick={this.onImageClicked(img)} />
          // </div>
          <div>
            <img src={img} />
          </div>
        );
      });

      let color = `cc-${this.state.item.color.toLowerCase()}`;
      console.log(color);
      let sizes = this.state.item.size.map((sz) => {
        return (
          <div class="sc-item">
            <input type="radio" id="sm-size" />
            <label for="sm-size">{sz}</label>
          </div>
        );
      });

      return (
        <div>
          <div class="breacrumb-section">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="breadcrumb-text product-more">
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
                     {this.props.category}
                    </NavLink>
                    <span>Details</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section class="product-shop spad page-details">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-lg-6">
                      <Carousel
                        autoPlay
                        interval="5000"
                        style={{ width: "500px" }}
                      >
                        {images}
                      </Carousel>
                    </div>
                    <div class="col-lg-6">
                      <div class="product-details">
                        <div class="pd-title">
                          <span>{this.state.item.category}</span>
                          <h3>{this.state.item.name}</h3>
                          {/* <a href='#' class='heart-icon'>
														<i class='icon_heart_alt'></i>
													</a> */}
                        </div>
                        {/* <div class='pd-rating'>
												<i class='fa fa-star'></i>
												<i class='fa fa-star'></i>
												<i class='fa fa-star'></i>
												<i class='fa fa-star'></i>
												<i class='fa fa-star-o'></i>
												<span>(5)</span>
											</div> */}
                        <div class="pd-desc">
                          <p>{this.state.item.description}</p>
                          <h4>Rs {this.state.item.price}</h4>
                        </div>
                        <div class="pd-color">
                          <h6>Color</h6>
                          <div class="pd-color-choose">
                            <div class="cc-item">
                              <div
                                style={{
                                  backgroundColor: this.state.item.color,
                                  width: "30px",
                                  height: "30px",
                                  mozBorderRadius: "50px",
                                  webkitBorderRadius: "50px",
                                  borderRadius: "50px",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="pd-size-choose">{sizes}</div>
                        <div class="quantity">
                          <a class="primary-btn pd-cart">
                            {this.state.item.stock} Items in Stock!
                          </a>
                        </div>
                        <ul class="pd-tags">
                          <li>
                            <span>CATEGORIES</span> {this.state.item.category}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="product-tab">
                    <div class="tab-item">
                      <ul class="nav" role="tablist">
                        <li>
                          <a
                            class="active"
                            data-toggle="tab"
                            href="#tab-1"
                            role="tab"
                          >
                            DESCRIPTION
                          </a>
                        </li>
                        <li>
                          <a data-toggle="tab" href="#tab-2" role="tab">
                            SPECIFICATIONS
                          </a>
                        </li>
                        <li>
                          <a data-toggle="tab" href="#tab-3" role="tab">
                            Care
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="tab-item-content">
                      <div class="tab-content">
                        <div
                          class="tab-pane fade-in active"
                          id="tab-1"
                          role="tabpanel"
                        >
                          <div class="product-content">
                            <div class="row">
                              <div class="col-lg-7">
                                <p> {this.state.item.desc}</p>
                              </div>
                              <div class="col-lg-5">
                                <img src="img/banner_1.jpeg" alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="tab-pane fade" id="tab-2" role="tabpanel">
                          <div class="specification-table">
                            <table>
                              <tr>
                                <td class="p-catagory">Category</td>
                                <td>
                                  <div class="cart-add">
                                    {this.state.item.category}
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td class="p-catagory">Price</td>
                                <td>
                                  <div class="p-price">
                                    Rs. {this.state.item.price}
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td class="p-catagory">Availability</td>
                                <td>
                                  <div class="p-stock">
                                    {this.state.item.stock} in stock
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="p-catagory">Weight</td>
                                <td>
                                  <div class="p-weight">Weight</div>
                                </td>
                              </tr>
                              <tr>
                                <td class="p-catagory">Size</td>
                                <td>
                                  <div class="p-size">
                                    {this.state.item.size.map((sz) => sz + " ")}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="p-catagory">Color</td>
                                <td>
                                  <center>
                                    <div
                                      style={{
                                        backgroundColor: this.state.item.color,
                                        width: "30px",
                                        height: "30px",
                                        mozBorderRadius: "50px",
                                        webkitBorderRadius: "50px",
                                        borderRadius: "50px",
                                      }}
                                    />
                                  </center>
                                </td>
                              </tr>
                            </table>
                          </div>
                        </div>
                        <div class="tab-pane fade" id="tab-3" role="tabpanel">
                          <div class="product-content">
                            <div class="row">
                              <div class="col-lg-7">
                                <p> {this.state.item.care}</p>
                              </div>
                              <div class="col-lg-5">
                                <img src="img/care.jpg" alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }
  }
}

export default Details;
