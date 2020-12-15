import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Kurta from "./pages/Kurta";
import KurtaPlazo from "./pages/KurtaPlazo";
import ALineKurta from "./pages/ALineKurta";
import Dupatta from "./pages/Dupatta";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import React from "react";
import Register from "./pages/admin/Register";
import Login from "./pages/Login";
import ImageSlider from "./pages/ImageSlider";

//admin pages
import AddNewItem from "./pages/admin/AddNewItem";
import AdminHeader from "./components/AdminHeader";
import ManageItems from "./pages/admin/ManageItems";
import ManageUsers from "./pages/admin/ManageUsers";


class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("allow value is", this.props.login);
  }

  render() {
    if (this.props.login) {
      return (
        <Router>
          <div>
            <AdminHeader />
            <Switch>
              <Route exact path="/" component={AddNewItem} />
              <Route exact path="/AddNewItem" component={AddNewItem} />

              <Route exact path="/Register" component={Register} />
              <Route exact path="/ManageItems" component={ManageItems} />
              <Route exact path="/ManageUsers" component={ManageUsers} />
            </Switch>
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div>
            <Header />
            <br />
            <Switch>
              <Route exact path="/Register" component={Register} />
              
              <Route exact path="/ImageSlider" component={ImageSlider} />

              <Route exact={true} path="/" component={Home} />
              <Route exact path="/Home" component={Home} />
              <Route exact path="/Kurta" component={Kurta} />
              <Route exact path="/KurtaPlazo" component={KurtaPlazo} />
              <Route exact path="/ALineKurta" component={ALineKurta} />
              <Route exact path="/Dupatta" component={Dupatta} />
              <Route exact path="/ManageItems" component={ManageItems} />
              <Route exact path="/ManageUsers" component={ManageUsers} />

              <Route exact path="/Login" component={Login} />

              <Route exact path="/ContactUs" component={ContactUs} />
            </Switch>
            <br />
            <Footer />
          </div>
        </Router>
      );
    }
  }
}

export default App;
