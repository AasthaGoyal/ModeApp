import React from "react";;
import axios from "axios";
import Details from "./Details";
import ReactDOM from "react-dom";

const main = {
  textAlign: "center",
  height: "500px",
  display: "flex",
  flexDirection: "column",
  border: "none",
  justifyContent: "space-around",
};

const image = {
  height: "300px",
  width: "300px",
  fontSize: "50px",
  background: "blue",
  margin: "10px",
  display: "inline-block",
  lineHeight: "100px",
};

const imageContainer = {
  verticalAlign: "middle",
  display: "inline-block",
  width: "640px",
  height: "500px",
  whiteSpace: "nowrap",
  overflow: "scroll",
  overflowX: "auto",
  overflowY: "hidden",
};

const prev = {
  paddingTop: "10px",
  paddingBottom: "10px",
  height: "100%",
  cursor: "pointer",
  color: "black",
  transition: "0.6s ease",
  marginRight: "5px",
};

const next = {
  paddingTop: "10px",
  paddingBottom: "10px",
  height: "100%",
  cursor: "pointer",
  color: "black",
  transition: "0.6s ease",
  marginLeft: "5px",
};

const modalRoot = document.getElementById("details");

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      <Details itemId={this.props.itemId} />,
      // A DOM element
      this.el
    );
  }
}

class ImageSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = { item: [] };
    this.scroll = this.scroll.bind(this);
  }

  componentDidMount() {
    console.log(this.props.category);
    axios
      .get(
        "/api/items/getItemByCategory/" + this.props.category
      )
      .then((res) => {
        if (res.data.success === true) {
          this.setState({
            item: res.data.data,
          });
        } else {
          alert("Some error occured ", res.error);
        }
      });
  }

  scroll(direction) {
    let far = (`$( '.image-container' )`.width() / 2) * direction;
    let pos = `$('.image-container')`.scrollLeft() + far;
    `$('.image-container')`.animate({ scrollLeft: pos }, 1000);
    // let item = document.getElementById("image-container");
    // console.log(item.style.width, item.style.scrollLeft);
    // let far = (Number(item.style.width) / 2) * direction;
    // let pos = item.style.scrollLeft + far;
    // console.log(far, pos);
    // item.animate({ scrollLeft: pos }, 1000);
  }

  imageClick = (id) => {
    console.log(id);
    this.setState({
      showDetails: true,
      itemId: id,
    });

  
  };

  render() {
    console.log(this.state.itemId);
    if (this.state.showDetails) {
      return (
       <Modal itemId={this.state.itemId}/>
      );
    } else {
      if (this.state.item.length === 0) {
        return (
          <div class="loading-more">
            <i class="icon_loading"></i>
            Loading More
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
      
                      }}
                      // onClick={() => this.imageClick(it._id)}
                    />
                  </a>
                </div>
                <div class="pi-text">
                  <div class="catagory-name">{it.category}</div>
                  <a href={it.id}>
                    <h5>
                      {" "}
                      <label>
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
          <div style={main} className="form-control">
            <div className="wrapper">
              {/* <a style={prev} onClick={this.scroll.bind(null, -1)}>
            &#10094;
          </a> */}
              <div id="image-container" style={imageContainer}>
                <div class="product-list">
                  <div class="row">{items}</div>
                </div>
              </div>
              {/* <a style={next} onClick={this.scroll.bind(null, 1)}>
            &#10095;
          </a> */}
            </div>
          </div>
        );
      }
    }
  }
}

export default ImageSlider;
