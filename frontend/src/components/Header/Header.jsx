import React from "react";
import "./Header.style.scss"; // Import the CSS for styling
import LogoIcon from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Avatar from 'react-avatar';

const Header = ({ isLoggedIn, userProfile }) => {
  const navigate = useNavigate();
  const onProfile = () => {};
  const onLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  const onLogin = () => {
    navigate("/login");
  };
  return (
    <header className="header">
      <div className="header__logo">
        <img
          src={LogoIcon}
          alt="Logo"
          className="header__logo-image"
          style={{ width: "100px", height: "50px", borderRadius: "10px" }}
        />
      </div>

      <div className="header__actions">
        {isLoggedIn ? (
          <div className="header__profile">
            <Avatar name={isLoggedIn} round={true} size="30"/>
            <button className="header__logout" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="header__login" onClick={onLogin}>
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
