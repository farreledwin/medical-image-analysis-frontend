import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import {Dropdown} from 'react-bootstrap';

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
        <Dropdown>
            <Dropdown.Toggle className="navbar-brand text-white background-transparent border-transparent">
              Image Processing
            </Dropdown.Toggle>
              <Dropdown.Menu>
                  <Dropdown.Item href="/pre-processing">Image Enhancement</Dropdown.Item>
                  <Dropdown.Item href="/image-segmentation">Image Segmentation</Dropdown.Item>
              </Dropdown.Menu>
        </Dropdown>
      </form>
    </nav>
  </div>
);

export default Header;
