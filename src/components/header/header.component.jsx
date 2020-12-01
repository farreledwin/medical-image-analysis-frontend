import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="container background-add" data-aos="fade-right">
    <nav className="navbar navbar-light">
      <a className="navbar-brand text-white visibility-none">
        Medical Image Analysis
      </a>
      <form className="form-inline">
        <Link to="/" className="navbar-brand text-white">
          Home
        </Link>
        <Link to="/pre-processing" className="navbar-brand text-white">
          Pre Processing
        </Link>
        <Link to="/image-segmentation" className="navbar-brand text-white">
          Image Segmentation
        </Link>
      </form>
    </nav>
  </div>
);

export default Header;
