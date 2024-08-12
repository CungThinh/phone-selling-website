import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../services/UserService";
import { resetUser } from "../redux/Slice/UserSlice";
import { UserOutlined } from "@ant-design/icons";
import { ShopContext } from "../context/shop-context";

export const Navbar = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { setSearchKeyword } = useContext(ShopContext);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  useEffect(() => {
    initMDB({ Dropdown, Collapse });
  }, []);

  useEffect(() => {
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
  }, [user?.name, user?.avatar]);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    localStorage.clear();
    dispatch(resetUser());
  };

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "order") {
      navigate(`/orders/${user.id}`, {
        state: {
          id: user?.id,
        },
      });
    } else {
      handleLogout();
    }
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchKeyword(search);
  };

  const handleCartClick = () => {
    if (user?.id) {
      navigate("/cart");
    } else {
      handleNavigateLogin();
    }
  };

  return (
    <div className="navbar">
      <Link to="/" className="shop-link">
        Home
      </Link>
      {!isHiddenSearch && (
        <form className="input-group w-auto my-auto d-flex ms-2 ms-lg-5">
          <input
            onChange={onSearchChange}
            type="search"
            className="form-control rounded"
            placeholder="Search"
            style={{ minWidth: "200px" }}
          />
          <span
            className="input-group-text border-0 d-flex ms-1"
            style={{ backgroundColor: "#48CCCD", borderRadius: 5 }}
            onClick={handleSearchClick}
          >
            <i style={{ cursor: "pointer" }} className="fas fa-search"></i>
          </span>
        </form>
      )}
      <div className="links d-flex">
        <Link to="/">About Us</Link>
        <Link to="/contact">Contact</Link>
        {!isHiddenCart && (
<div onClick={handleCartClick} style={{ cursor: "pointer" }}>
            <ShoppingCart
              style={{ color: "white", margin: "20px" }}
              size={32}
            />
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="dropdown me-5">
        <a
          className="dropdown-toggle d-flex align-items-center hidden-arrow"
          style={{ cursor: "pointer" }}
          role="button"
          aria-expanded="false"
          onClick={() => {
            if (user?.id) setIsOpenPopup(!isOpenPopup);
          }}
        >
          {userAvatar ? (
            <img
              src={userAvatar}
              className="rounded-circle"
              height="25"
              alt="User Avatar"
              loading="lazy"
              style={{ width: "35px", height: "35px" }}
            />
          ) : (
            <UserOutlined style={{ fontSize: "25px", color: "white" }} />
          )}
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
              onClick={handleNavigateLogin}
            >
              Login
            </span>
          )}
        </a>
        {user?.id && (
          <ul
            className={`dropdown-menu dropdown-menu ${
              isOpenPopup ? "show" : ""
            }`}
          >
            <li>
              <a
                style={{ cursor: "pointer" }}
                className="dropdown-item"
                onClick={() => handleClickNavigate("profile")}
              >
                My profile
              </a>
            </li>
            <li>
              {!user?.isAdmin && (
                <a
                  className="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClickNavigate("order")}
                >
                  My order
                </a>
              )}
            </li>
            {user?.isAdmin && (
              <li>
                <a
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onClick={() => handleClickNavigate("admin")}
                >
                  System Manager
                </a>
              </li>
            )}
            <li>
              <a
                style={{ cursor: "pointer" }}
                className="dropdown-item"
                onClick={() => {
                  handleClickNavigate();
                  setIsOpenPopup(false);
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};