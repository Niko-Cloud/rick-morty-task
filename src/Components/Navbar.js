import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container d-flex justify-content-between align-items-center">
      <div>
        <Link className="navbar-brand" to="/">
          Rick and Morty
        </Link>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/characters">
              Characters
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/locations">
              Locations
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/episodes">
              Episodes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavigationBar;
