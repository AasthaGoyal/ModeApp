import React from "react";
import { NavLink } from "react-router-dom";

class AdminHeader extends React.Component {
  handleLogout(e) {
    console.log(e);
    window.location.reload(false);
  }
  render() {
    return (
      <div>
        <header className="header-section">
          <div className="nav-item">
            <div className="container">
              <nav className="nav-menu mobile-menu">
                <ul>
                  <li>
                    <NavLink
                      exact
                      className="navvar-item"
                      activeClassName="is-active"
                      id="home"
                      to="/AddNewItem"
                    >
                      Add New Item
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      exact
                      className="navvar-item"
                      activeClassName="is-active"
                      to="/ManageItems"
                    >
                      Edit/Delete Items
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      exact
                      className="navvar-item"
                      activeClassName="is-active"
                      to="/Register"
                    >
                      Register User
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      exact
                      className="navvar-item"
                      activeClassName="is-active"
                      to="/ManageUsers"
                    >
                      Edit/Delete Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      exact
                      className="navvar-item"
                      activeClassName="is-active"
                      onClick={this.handleLogout.bind(this)}
                      to="/Home"
                    >
                      Logout
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

export default AdminHeader;
