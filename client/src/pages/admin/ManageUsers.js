import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

class ManageUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/users/getAllUsers")
      .then((res) => this.setState({ users: res.data }))
      .catch((err) => console.log("Some error occured", err));
  }

  deleteUser = (id) => {
    console.log("id being deleted", id);
    axios
      .post("users/deleteUserById/" + id)
      .then((res) =>
        res.data.success === true
          ? alert(res.data.message)
          : alert("Some error occured")
      );
    window.location.reload(false);
  };

  render() {
    console.log(this.state.users);
    if (this.state.users.length === 0) {
      return (
        <div class="loading-more">
          <i class="icon_loading"></i>
         Loading More
        </div>
      );
    } else {
      let userLists = this.state.users;
      let users = userLists.map((it) => {
        return (
          <div class="col-lg-4 col-sm-6">
            <div class="product-item">
              <div class="pi-text">
                <div class="catagory-name">User </div>
                <div
                  class="pi-pic"
                  style={{
                    height: "3",
                    width: "3",
                  }}
                >
                  <img src="uploads/user.png" alt="" />
                </div>

                <h5> {it.name}</h5>

                <div class="product-price">{it.email}</div>
              </div>
              <button
                onClick={() => this.deleteUser(it._id)}
                class="form-control"
                style={{ backgroundColor: "red" }}
              >
                {" "}
                Delete
              </button>
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
                      to="/Login"
                    >
                      <i className="fa fa-home"></i>Admin Login
                    </NavLink>
                    <span>Edit/Delete Users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />
          <section class="product-shop spad">
            <div class="container">
              <div class="row">
                <div class="col-lg-12 order-1 order-lg-2">
                  <div class="product-list">
                    <div class="row">{users}</div>
                  </div>

                  <div class="loading-more">
                    <i class="icon_loading"></i>
                    Loading More
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

export default ManageUsers;
