import React from "react";
import "./Footer.style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import LogoIcon from "../../assets/logo.png"

const Footer = () => {
  return (
    <footer className="footer">
      {/* Left Section */}
      <div className="footer__left">
        <p className="footer__copyright">
          &copy; 2025 Designed by - Paras Mahto
        </p>
      </div>

      {/* Middle Divider */}
      <div className="footer__divider"></div>

      {/* Right Section */}
      <div className="footer__right">
        <div className="footer__links">
          <a href="#contact" className="footer__link">Contact Us</a>
          <a href="#about" className="footer__link">About Us</a>
          <a href="#home" className="footer__link">Home</a>
        </div>
        <div className="footer__social">
          <span className="footer__social-title">Follow Us:</span>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
