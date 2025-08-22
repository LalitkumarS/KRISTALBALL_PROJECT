import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🎖️ Military Assets</div>
      <ul className="nav-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/purchases">Purchases</Link></li>
        <li><Link to="/assignments">Assignments</Link></li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
