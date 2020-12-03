import React from "react";

function NavBar() {
  return (
    <>
      <div className="col-md-2 p-0">
        <div className="leftBarpopl">
          <nav className="navbar navbar-expand-lg navbar-light leftBarpoplTop flex-column ">
            <a className="navbar-brand" href="#1">
              <img className src="./assets/img/logo 5.png" alt="logo 5" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse NavList"
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav flex-column">
                <li className="nav-item ">
                  <a className="nav-link" href="#1">
                    <img className src="./assets/img/eye.png" alt="eye" />{" "}
                    Overview
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className={`nav-item active`}>
                  <a className="nav-link " href="#1">
                    <img
                      className
                      src="./assets/img/poplIcon.png"
                      alt="poplIcon"
                    />{" "}
                    Popls
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#1">
                    <img
                      className
                      src="./assets/img/compaigns.png"
                      alt="compaigns"
                    />{" "}
                    Campaigns
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#1"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      className
                      src="./assets/img/analytics.png"
                      alt="analytics"
                    />{" "}
                    Analytics
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a className="dropdown-item" href="#1">
                      Real time
                    </a>
                    <a className="dropdown-item" href="#1">
                      Locations
                    </a>
                    <a className="dropdown-item" href="#1">
                      CRM Integrations
                    </a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#1"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      className
                      src="./assets/img/setting.png"
                      alt="setting"
                    />{" "}
                    Setting
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a className="dropdown-item" href="#1">
                      Login
                    </a>
                    <a className="dropdown-item" href="#1">
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default NavBar;
