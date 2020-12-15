import React from "react";

import ImageSlider from "./ImageSlider";


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      kurta: true,
      kurtaPlazo: false,
      aLine: false,
      dupatta: false,
      item: [],
      showDetails: false,
      itemId: "",
      valueChanged: "Kurta",
    };

    this.onCategoryChange = this.onCategoryChange.bind(this);
  }

  onCategoryChange(filters) {
    console.log(filters);
    switch (filters) {
      case "Kurta":
        this.setState({
          kurta: true,
          kurtaPlazo: false,
          aLine: false,
          dupatta: false,
          valueChanged: "Kurta",
        });
        break;
      case "KurtaPlazo":
        this.setState({
          kurtaPlazo: true,
          kurta: false,
          aLine: false,
          dupatta: false,
          valueChanged: "Kurta Plazo Set",
        });
        break;
      case "ALineKurta":
        this.setState({
          kurtaPlazo: false,
          kurta: false,
          aLine: true,
          dupatta: false,
          valueChanged: "A Line Kurta",
        });
        break;
      case "Dupatta":
        this.setState({
          kurtaPlazo: false,
          kurta: false,
          aLine: false,
          dupatta: true,
          valueChanged: "Kurta Plazo Dupatta Set",
        });
        break;
    }
  }

  render() {
    return (
      <div>
        <section class="hero-section">
          <div class="hero-items owl-carousel">
            <div
              class="single-hero-items set-bg"
              width=""
              data-setbg="img/01.png"
            >
              <div class="container">
                <div class="row">
                  <div class="col-lg-5">
                    <span>Design for everyone</span>
                    <h1>Kurta Plazo </h1>
                    <p style={{ color: "#000000" }}>
                      We have the best designs for you that would suit your
                      needs{" "}
                    </p>
                    <a href="#" class="primary-btn">
                      See our collection
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="single-hero-items set-bg" data-setbg="img/02.png">
              <div class="container">
                <div class="row">
                  <div class="col-lg-5">
                    <span>See our specials</span>
                    <h1>Kurtas </h1>
                    <p style={{ color: "white" }}>
                      Special collection for special occassions. We have
                      fashionable designs for special occasions to meet your
                      needs.{" "}
                    </p>
                    <a href="#" class="primary-btn">
                      See our specials
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="banner-section spad">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-4">
                <div class="single-banner">
                  <img
                    src="img/banner_1.jpeg"
                    alt=""
                    width="570"
                    height="320"
                  />
                  <div class="inner-text">
                    <h4>Kurta Plazo</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="single-banner">
                  <img src="img/banner_2.jpg" alt="" width="570" height="320" />
                  <div class="inner-text">
                    <h4>A Line Kurta</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="single-banner">
                  <img src="img/banner_3.jpg" alt="" width="570" height="320" />
                  <div class="inner-text">
                    <h4>Dupatta set</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="women-banner spad">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-3">
                <div
                  class="product-large set-bg"
                  style={{ backgroundImage: "url('img/001.jpeg')" }}
                >
                  <h2 style={{ color: "black" }}>Women’s</h2>
                  <a href="#" style={{ color: "black" }}>
                    Discover More
                  </a>
                </div>
              </div>

              <div class="col-lg-8 offset-lg-1">
                <div class="filter-control">
                  <ul>
                    <li
                      className={this.state.kurta ? "active" : null}
                      name="kurta"
                      onClick={(evt) => this.onCategoryChange("Kurta", evt)}
                    >
                      Kurta
                    </li>
                    <li
                      className={this.state.kurtaPlazo ? "active" : null}
                      onClick={(evt) =>
                        this.onCategoryChange("KurtaPlazo", evt)
                      }
                    >
                      Kurta Plazo
                    </li>
                    <li
                      className={this.state.aLine ? "active" : null}
                      onClick={(evt) =>
                        this.onCategoryChange("ALineKurta", evt)
                      }
                    >
                      A Line Kurta
                    </li>
                    <li
                      className={this.state.dupatta ? "active" : null}
                      onClick={(evt) => this.onCategoryChange("Dupatta", evt)}
                    >
                      Kurta Plazo Dupatta set
                    </li>
                  </ul>
                </div>

                {this.state.valueChanged && (
                  <ImageSlider
                    key={this.state.valueChanged}
                    category={this.state.valueChanged}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <section class="latest-blog spad">
          <div class="container">
            <div class="benefit-items">
              <div class="row">
                <div class="col-lg-4">
                  <div class="single-benefit">
                    <div class="sb-icon">
                      <img src="img/icon-1.png" alt="" />
                    </div>
                    <div class="sb-text">
                      <h6>Cheap Shipping</h6>
                      <p>Locan and International shipping</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="single-benefit">
                    <div class="sb-icon">
                      <img src="img/icon-2.png" alt="" />
                    </div>
                    <div class="sb-text">
                      <h6>Delivery On Time</h6>
                      <p>If good have prolems</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="single-benefit">
                    <div class="sb-icon">
                      <img src="img/icon-1.png" alt="" />
                    </div>
                    <div class="sb-text">
                      <h6>Secure Payment</h6>
                      <p>100% secure payment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="instagram-photo">
          <div
            class="insta-item set-bg"
            style={{ backgroundImage: "url('img/inst_1.jpg')" }}
          >
            <div class="inside-text">
              <i class="ti-instagram"></i>
              <h5>
                <a href="#">colorlib_Collection</a>
              </h5>
            </div>
          </div>
          <div
            class="insta-item set-bg"
            style={{ backgroundImage: "url('img/inst_2.jpg')" }}
          >
            <div class="inside-text">
              <i class="ti-instagram"></i>
              <h5>
                <a href="#">colorlib_Collection</a>
              </h5>
            </div>
          </div>
          <div
            class="insta-item set-bg"
            style={{ backgroundImage: "url('img/inst_7.jpg')" }}
          >
            <div class="inside-text">
              <i class="ti-instagram"></i>
              <h5>
                <a href="#">colorlib_Collection</a>
              </h5>
            </div>
          </div>
          <div
            class="insta-item set-bg"
            style={{ backgroundImage: "url('img/inst_4.jpeg')" }}
          >
            <div class="inside-text">
              <i class="ti-instagram"></i>
              <h5>
                <a href="#">colorlib_Collection</a>
              </h5>
            </div>
          </div>
          <div
            class="insta-item set-bg"
            style={{ backgroundImage: "url('img/inst_5.jpg')" }}
          >
            <div class="inside-text">
              <i class="ti-instagram"></i>
              <h5>
                <a href="#">colorlib_Collection</a>
              </h5>
            </div>
          </div>
          <div
            class="insta-item set-bg"
            style={{ backgroundImage: "url('img/inst_6.jpg')" }}
          >
            <div class="inside-text">
              <i class="ti-instagram"></i>
              <h5>
                <a href="#">colorlib_Collection</a>
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
