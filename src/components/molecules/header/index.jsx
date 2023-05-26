import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "../../atoms";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

const Header = () => {
  const location = useLocation();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      title: "Do you want to logout?",
      confirmButtonText: "Yes",
      confirmButtonColor: "#0d6efd",
      showCancelButton: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete("http://localhost:3001/v1/auth/logout");
          // setCookies("access_token", "");
          // window.localStorage.removeItem("userId");
          navigate("/login");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            <div className="navbar-nav ms-auto">
              <Link className={`nav-link m-0 ${location.pathname === "/" ? "active" : ""}`} to={"/"}>
                <Navigation title={"Home"} />
              </Link>
              <Navigation title={"Logout"} className="nav-link m-0" style={{ cursor: "pointer" }} onClick={logout} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
