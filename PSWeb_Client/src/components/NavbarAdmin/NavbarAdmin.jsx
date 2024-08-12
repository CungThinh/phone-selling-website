import React, { useEffect, useState } from "react";
import "./NavbarAdmin.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService"; 
import { resetUser } from "../../redux/Slice/UserSlice"; 

const NavbarAdmin = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(user?.name);
  }, [user?.name, user?.avatar]);

  const handleLogout = async () => {
    dispatch(resetUser());
    navigate("/sign-in");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {/* Container wrapper */}
        <div className="container-fluid">
          {/* Navbar brand */}
          <a className="navbar-brand" href="#">
            HyperRaze
          </a>
          {/* Toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars text-light" />
          </button>
          {/* Collapsible wrapper */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Left links */}
            <ul className="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
              <li className="nav-item text-center mx-2 mx-lg-1">
                <Link className="nav-link active" aria-current="page" to={'/'}>
                  <div>
                    <i className="fas fa-home fa-lg mb-1" />
                  </div>
                  Home
                </Link>
              </li>
              <li className="nav-item text-center mx-2 mx-lg-1">
                <a className="nav-link" href="#!">
                  <div>
                    <i className="far fa-envelope fa-lg mb-1" />
                    <span className="badge rounded-pill badge-notification bg-danger">
                      11
                    </span>
                  </div>
                  Link
                </a>
              </li>
              <li className="nav-item text-center mx-2 mx-lg-1">
                <a className="nav-link disabled" aria-disabled="true" href="#!">
                  <div>
                    <i className="far fa-envelope fa-lg mb-1" />
                    <span className="badge rounded-pill badge-notification bg-warning">
                      11
                    </span>
                  </div>
                  Disabled
                </a>
              </li>
              <li className="nav-item dropdown text-center mx-2 mx-lg-1">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div>
                    <i className="far fa-envelope fa-lg mb-1" />
                    <span className="badge rounded-pill badge-notification bg-primary">
                      11
                    </span>
                  </div>
                  Dropdown
                </a>
                {/* Dropdown menu */}
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            {/* Left links */}
            {/* Right links */}
            <ul className="navbar-nav ms-auto d-flex flex-row mt-3 mt-lg-0">
              <li className="nav-item text-center mx-2 mx-lg-1">
                <a className="nav-link" href="#!">
                  <div>
                    <i className="fas fa-bell fa-lg mb-1" />
                    <span className="badge rounded-pill badge-notification bg-info">
                      11
                    </span>
                  </div>
                  Messages
                </a>
              </li>
              <li className="nav-item text-center mx-2 mx-lg-1">
                <a className="nav-link" href="#!">
                  <div>
                    <i className="fas fa-globe-americas fa-lg mb-1" />
                    <span className="badge rounded-pill badge-notification bg-success">
                      11
                    </span>
                  </div>
                  News
                </a>
              </li>
            </ul>
            {/* Right links */}
            {/* Search form */}
            {user?.id ? (
              <span className="ms-2 fw-bold me-2" style={{ color: "#528B8B" }}>
                {userName.length ? userName : user.email}
              </span>
            ) : (
              <span
                style={{
                  fontWeight: "bold",
                  marginLeft: "15px",
                  cursor: "pointer",
                  color: "green",
                }}
              >
                Login
              </span>
            )}
            {user?.id && (
              <span
                style={{
                  fontWeight: "bold",
                  marginLeft: "15px",
                  cursor: "pointer",
                  color: "red",
                }}
                onClick={handleLogout}
              >
                Logout
              </span>
            )}
          </div>
          {/* Collapsible wrapper */}
        </div>
        {/* Container wrapper */}
      </nav>
      {/* Navbar */}
    </>
  );
};

export default NavbarAdmin;
