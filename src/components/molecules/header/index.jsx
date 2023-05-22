import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to={"/"}>
                Home
              </Link>
              <Link className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} to={"/login"}>
                Login
              </Link>
              <Link className={`nav-link ${location.pathname === "/register" ? "active" : ""}`} to={"/register"}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
