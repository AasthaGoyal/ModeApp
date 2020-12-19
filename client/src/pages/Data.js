import React from "react";
import Details from "./Details";
import axios from "axios";
import { NavLink } from "react-router-dom";

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      item: [],
    };
  }

  componentDidMount() {
    console.log(
      this.props.sort,
      this.props.limit,
      this.props.priceRange,
      this.props.color,
      this.props.size
    );
    if (this.props.sort || this.props.limit) {
      this.getSortedData();
    } else {
      this.getAllData();
    }

    if (this.props.priceRange || this.props.color || this.props.size) {
      this.getFilteredData();
    }
  }

  getFilteredData() {
    console.log("getting filtered data");
    console.log(this.props.color, this.props.size, this.props.priceRange);
    axios
      .get("/api/items/getSizeFiltered", {
        params: {
          size: this.props.size,
        },
        // params: {
        //   sort: this.props.sort,
        //   limit: this.props.limit,
        //   price: this.props.priceRange,
        //   color: this.props.color,
        //   size: this.props.size,
        // },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          this.setState({ item: res.data.data });
        } else {
          alert("Some error occured ", res.error);
        }
      })
      .catch((err) => console.log("Some error occured", err));
  }

  getSortedData() {
    console.log("getting sorted data");
    axios
      .get(
        "/api/items/getSortedItems/" + this.props.category,
        {
          params: {
            sort: this.props.sort || "1",
            limit: this.props.limit || "100",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          this.setState({ item: res.data.data });
        } else {
          alert("Some error occured ", res.error);
        }
      })
      .catch((err) => console.log("Some error occured", err));
  }

  getAllData() {
    console.log("getting all data");
    axios
      .get("/api/items/getItemByCategory/" + "Kurta")
      .then((res) => {
        if (res.data.success === true) {
          this.setState({
            item: res.data.data,
          });
        } else {
          alert("Some error occured ", res.error);
        }
      })
      .catch((err) => console.log("Some error occured", err));
  }

  imageClick = (id) => {
    this.setState({
      showDetails: true,
      itemId: id,
    });
  };

  render() {
  
    if (this.state.showDetails) {
      return <Details itemId={this.state.itemId} category={this.props.category}/>;
    } else {
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
              </div>
            </div>
          );
        });
       
        return (
          <div class="product-list">
            <div class="row">{items}</div>
          </div>
        );
      }
    }
  }
}

// class Data extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     console.log(this.props.priceRange);
//     axios
//       .get(
//         "http://localhost:3001/items/getSortedItems/" + this.props.category,
//         {
//           params: {
//             sort: this.props.sort || "1",
//             limit: this.props.limit || "100",
//             price: this.props.priceRange,
//             color: this.props.color,
//             size: this.props.size,
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res);
//         if (res.data.success === true) {
//           this.setState({ item: res.data.data });
//         } else {
//           alert("Some error occured ", res.error);
//         }
//       })
//       .catch((err) => console.log("Some error occured", err));
//     // } else {
//     //   axios
//     //     .get("http://localhost:3001/items/getItemByCategory/" + "Kurta")
//     //     .then((res) => {
//     //       if (res.data.success === true) {
//     //         this.setState({
//     //           item: res.data.data,
//     //         });
//     //       } else {
//     //         alert("Some error occured ", res.error);
//     //       }
//     //     })
//     //     .catch((err) => console.log("Some error occured", err));
//     // }
//   }

//     return (
//       <div>
//         Hi i m one {this.props.sort} and limit {this.props.limit} and price rnge{" "}
//         {this.props.priceRange} and color {this.props.color} and size{" "}
//         {this.props.size}
//       </div>
//     );

// const PlayData = (props) => {

//   const [items, setItems] = useState([]);
//     console.log(props.price);
//   props.price && axios
//     .get("http://localhost:3001/items/getSortedItems/" + props.category, {
//       params: {
//         sort: props.sort || "1",
//         limit: props.limit || "100",
//         price: props.price,
//         color: props.color,
//         size: props.size,
//       },
//     })
//     .then((res) => {
//       console.log(res);
//       if (res.data.success === true) {
//         let list = res.data.data;
//         setItems([...items, { list }]);
//       } else {
//         alert("Some error occured ", res.error);
//       }
//     })
//     .catch((err) => console.log("Some error occured", err));

//     console.log(items);

//     return (
//        <div>
//            {/* <ul>
//                {items.map(item => (
//                    <li key={item._id}> {item.name} </li>
//                ))}
//            </ul> */}
//            i m here
//        </div>
//     )
// };

export default Data;
