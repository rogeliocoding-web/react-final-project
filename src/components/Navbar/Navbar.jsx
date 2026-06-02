import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>
            Find thousands of movies and TV shows from our extended library
          </li>
        </ul>
      </div>
      <div className="navbar-right"></div>
    </div>
  );
};

export default Navbar;
