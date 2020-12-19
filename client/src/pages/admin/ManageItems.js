import React from "react";
import axios from "axios";
import UpdateItem from "./UpdateItem";
import { NavLink } from "react-router-dom";

class ManageItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      showDetails: false,
      itemId: "",
      selectedOption: "",
      setSelectedOption: null,
      searchName: "",
      updateItemId: "",
    };
    this.searchResults = this.searchResults.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/items/getAllItems")
      .then((res) => {
        this.setState({ item: res.data.items });
      })
      .catch((err) => console.log("Some error occured", err));
  }

  searchResults = (e) => {
    e.preventDefault();

    console.log(this.state.selectedOption, this.state.searchName);

    if (this.state.selectedOption && this.state.searchName) {
      var query = {
        name: this.state.searchName,
        category: this.state.selectedOption,
      };
      axios
        .get(
          "/api/items/getItemByCategory/" +
            this.state.selectedOption
        )
        .then((res) => {
          console.log(res);
          res.data.success === true
            ? this.setState({ item: res.data.data })
            : alert("Some error occured ", res.error);
        })
        .catch((err) => console.log("Some error occured", err));
    }
  };

  imageClick = (id) => {
    console.log(id);
    this.setState({
      showDetails: true,
      itemId: id,
    });
  };

  deleteItem = (id) => {
    console.log("id being deleted", id);
    axios
      .post("/api/items/deleteItemById/" + id)
      .then((res) =>
        res.data.success === true
          ? alert(res.data.message)
          : alert("Some error occured")
      );
    window.location.reload(false);
  };

  categoryChange = (e) => {
    console.log(e.target.value);
    this.setState({
      selectedOption: e.target.value,
    });
  };

  updateItem = (id) => {
    this.setState({ showDetails: true, updateItemId: id });
  };

  handleText = (e) => {
    e.preventDefault();
    this.setState({ searchName: e.target.value });
  };

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

    if (this.state.showDetails) {
      return <UpdateItem itemId={this.state.updateItemId} />;
    } else {
      console.log(this.state.item);
      if (this.state.item.length === 0) {
        return (
          <div class="loading-more">
            <i class="icon_loading"></i>
            <a href="#">Loading More</a>
          </div>
        );
      } else {
        let itemLists = this.state.item;
        let items = itemLists.map((it) => {
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
                <button
                  onClick={() => this.deleteItem(it._id)}
                  class="form-control"
                  style={{ backgroundColor: "red" }}
                >
                  {" "}
                  Delete
                </button>
                <button
                  onClick={() => this.updateItem(it._id)}
                  class="form-control"
                  style={{ backgroundColor: "yellow" }}
                >
                  {" "}
                  Update
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

                      <span>Edit/Delete Items</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <section class="product-shop spad">
              <div class="container">
                <div class="row">
                  <div className="group-input">
                    <label for="category">Search by category </label>
                    <select
                      value={this.state.selectedOption} // set selected value
                      // set list of the data
                      onChange={this.categoryChange} // assign onChange function
                      class="form-control"
                    >
                      {cats}
                    </select>
                    <br />
                    Search by Item name:
                    <input
                      type="text"
                      class="form-control"
                      name="name"
                      onChange={this.handleText}
                    />
                    <br />
                    <button
                      onClick={this.searchResults}
                      class="form-control"
                      style={{ backgroundColor: "#E7AB3C", color: "white" }}
                    >
                      {" "}
                      Search{" "}
                    </button>
                  </div>

                  <div class="col-lg-9 order-1 order-lg-2">
                    <div class="product-list">
                      <div class="row">{items}</div>
                    </div>

                    <div class="loading-more">
                      <i class="icon_loading"></i>
                      <a href="#">Loading More</a>
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

export default ManageItems;
