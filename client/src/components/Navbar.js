import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Supply Chain</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/roles">Assign Roles</Link></li>
        <li><Link to="/additem">Add Item</Link></li>
        <li><Link to="/supply">Supply</Link></li>
        <li><Link to="/track">Track</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
