import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaShippingFast } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaShippingFast size={24} />
        <h2>Supply Chain</h2>
      </div>
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
