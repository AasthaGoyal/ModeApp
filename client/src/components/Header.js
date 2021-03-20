import React from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

class Header extends React.Component {
 constructor() {
  super();

  this.state = {
   home: true,
   cat1: false,
   cat2: false,
   cat3: false,
   cat4: false,
   contact: false,
   selectedOption: "",
  };
  this.handleClick = this.handleClick.bind(this);
 }

 handleClick = (e) => {
  e.preventDefault();

  switch (e.target.id) {
   case "home":
    this.setState({
     home: true,
     cat1: false,
     cat2: false,
     cat3: false,
     cat4: false,
     contact: false,
    });
    break;
   case "cat1":
    this.setState({
     home: false,
     cat1: true,
     cat2: false,
     cat3: false,
     cat4: false,
     contact: false,
    });
    break;
   case "cat2":
    this.setState({
     home: false,
     cat1: false,
     cat2: true,
     cat3: false,
     cat4: false,
     contact: false,
    });
    break;
   case "cat3":
    this.setState({
     home: false,
     cat1: false,
     cat2: false,
     cat3: true,
     cat4: false,
     contact: false,
    });
    break;
   case "cat4":
    this.setState({
     home: false,
     cat1: false,
     cat2: false,
     cat3: false,
     cat4: true,
     contact: false,
    });
    break;
   case "contact":
    this.setState({
     home: false,
     cat1: false,
     cat2: false,
     cat3: false,
     cat4: false,
     contact: true,
    });
    break;
  }

  //e.target.className="navvar-item active is-active ";
  //e.target.backgroundColor="#E7AB3C";
 };

 categorySelected(e) {
  e.preventDefault();
  console.log(e);
  this.setState({
   selectedOption: e.target.value,
  });
 }

 render() {
  const data = [
   "Kurta",
   "Kurta Plazo Set",
   "A Line Kurta",
   "Kurta Plazo Dupatta Set",
  ];
  let cats = data.map((ex) => {
   return (
    <option value={ex} key={ex} onClick={this.handleDropdown}>
     {" "}
     {ex}
    </option>
   );
  });
  return (
   <div>
    <header className="header-section">
     <div className="header-top">
      <div className="container">
       <div className="ht-left">
        <div className="mail-service">
         <i className=" fa fa-envelope"></i>
         202,Udhyog vihar phase V,Gurgaon(Haryana)
        </div>
        <div className="phone-service">
         <i className=" fa fa-phone"></i>
         9958065877
        </div>
       </div>
       <div className="ht-right">
        <NavLink
         exact
         className="login-panel"
         activeClassName="is-active"
         to="/Login"
        >
         <i className="fa fa-user"></i>Admin Login
        </NavLink>

        <div className="top-social">
         <a href="https://www.facebook.com/modeZara6/">
          <i className="ti-facebook"></i>
         </a>

         <a href="#">
          <i className="ti-linkedin"></i>
         </a>
        </div>
       </div>
      </div>
     </div>
     <div className="container">
      <center>
       <br />
       <NavLink
        exact
        className="login-panel"
        activeClassName="is-active"
        to="/Home"
       >
        <img src="img/main_icon.jfif" />
        <img src="img/main_logo.jfif" />
       </NavLink>
      </center>
     </div>
     <div className="container">
      <div className="inner-header">
       <div className="row">
        <div className="col-lg-2 col-md-2">
         <div className="logo">
          {/* <NavLink
           exact
           className="login-panel"
           activeClassName="is-active"
           to="/Home"
          >
           <img src="img/logo_image.jpeg" />
           <img src="img/logo_name.jpeg" />
          </NavLink>{" "} */}
         </div>
        </div>
        <div className="col-lg-7 col-md-7">
         <div className="advanced-search">
          {/* <select
                      placeholder="Choose category"
                      value={this.state.selectedOption}
                      onChange={this.categorySelected.bind(this)}
                      className="category-btn"
                    >
                      <option selected enabled="false">
                        {" "}
                        Categories
                      </option>
                      {cats}
                    </select> */}
          <Dropdown>
           <Dropdown.Toggle
            variant="warning"
            id="dropdown-variants-warning"
            className="category-btn"
           >
            All categories
           </Dropdown.Toggle>

           <Dropdown.Menu>
            <Dropdown.Item href="/Kurta">Kurta</Dropdown.Item>
            <Dropdown.Item href="/KurtaPlazo">Kurta Plazo Set</Dropdown.Item>
            <Dropdown.Item href="/ALineKurta">A Line Kurta</Dropdown.Item>
            <Dropdown.Item href="/Dupatta">
             Kurta Plazo Dupatta Set
            </Dropdown.Item>
           </Dropdown.Menu>
          </Dropdown>

          <div className="input-group">
           <input type="text" placeholder="What do you need?" />
           <button type="button">
            <i className="ti-search"></i>
           </button>
          </div>
         </div>
        </div>
        <div className="col-lg-3 text-right col-md-3">
         <ul className="nav-right">
          <li className="heart-icon">
           {/* <a href="#">
                        <label className="input">Your saved searches</label>
                        <i className="icon_heart_alt"></i>
                        <span>1</span>
                      </a> */}
          </li>
         </ul>
        </div>
       </div>
      </div>
     </div>
     <div className="nav-item">
      <div className="container">
       <nav className="nav-menu mobile-menu">
        <ul>
         <li
          className={this.state.home ? "active" : null}
          onClick={this.handleClick}
         >
          <NavLink
           exact
           className="navvar-item"
           activeClassName="is-active"
           id="home"
           to="/Home"
          >
           Home
          </NavLink>
         </li>
         <li
          className={this.state.cat1 ? "active" : null}
          onClick={this.handleClick}
         >
          <NavLink
           exact
           className="navvar-item"
           activeClassName="is-active"
           id="cat1"
           to="/Kurta"
          >
           Kurta
          </NavLink>
         </li>
         <li
          className={this.state.cat2 ? "active" : null}
          onClick={this.handleClick}
         >
          <NavLink
           exact
           className="navvar-item"
           activeClassName="is-active"
           id="cat2"
           to="/KurtaPlazo"
          >
           Kurta Plazo
          </NavLink>
         </li>
         <li
          className={this.state.cat3 ? "active" : null}
          onClick={this.handleClick}
         >
          <NavLink
           exact
           className="navvar-item"
           activeClassName="is-active"
           id="cat3"
           to="/ALineKurta"
          >
           A Line Kurta
          </NavLink>
         </li>
         <li
          className={this.state.cat4 ? "active" : null}
          onClick={this.handleClick}
         >
          <NavLink
           exact
           className="navvar-item"
           activeClassName="is-active"
           id="cat4"
           to="/Dupatta"
          >
           Dupatta Set
          </NavLink>
         </li>
         <li
          className={this.state.contact ? "active" : null}
          onClick={this.handleClick}
         >
          <NavLink
           exact
           className="navvar-item"
           activeClassName="is-active"
           id="contact"
           to="/ContactUs"
          >
           Contact Us
          </NavLink>
         </li>
        </ul>
       </nav>
       <div id="mobile-menu-wrap"></div>
      </div>
     </div>
    </header>
   </div>
  );
 }
}

export default Header;
