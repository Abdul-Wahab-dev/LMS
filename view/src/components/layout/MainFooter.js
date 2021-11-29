import React from "react";
import { Container } from "shards-react";
import { Link } from "react-router-dom";
import LOGO from "../../images/logo5.png";
import "./footer.css";
const MainFooter = ({ contained, menuItems, copyright }) => (
  <>
    <footer className="footer-distributed">
      <Container>
        <div className="footer-left">
          <h3>
            <img src={LOGO} alt="logo" width="150" style={{width:"200px"}} />
          </h3>
          <p className="footer-company-about w-50 mt-3">
            To become a knowledge and creativity driven international university
            that contributes towards development of society.
          </p>

          <div className="footer-icons">
            <a
              href="https://www.facebook.com/officialBU"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/official_bu" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com/school/bahria-university/"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.youtube.com/" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer-right">
          <div className=" d-flex flex-column mt-2">
            <Link to="/" className="quick-link">
              Home
            </Link>
            <a
              href="https://www.bahria.edu.pk/why-bahria/"
              target="_blank"
              className="quick-link"
              rel="noopener noreferrer"
            >
              About Us
            </a>
            <a
              href="https://www.bahria.edu.pk/contact-us/"
              target="_blank"
              className="quick-link"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              {/* <span>444 S. Cedros Ave</span> Solana Beach, California */}
              Shangrilla Road, Sector E-8 Islamabad
            </p>
          </div>

          <div>
            <i className="fa fa-phone"></i>
            <p>+92-51-111-111-028</p>
          </div>

          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <a href="mailto:info@bahria.edu.pk">info@bahria.edu.pk</a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
    <div
      className="d-flex justify-content-center align-items-center w-100 py-3"
      style={{ backgroundColor: "#0d6ff1" }}
    >
      <span className="copyright" style={{ color: "#fff" }}>
        {copyright}
      </span>
    </div>
  </>
);

MainFooter.defaultProps = {
  contained: false,
  copyright: "Copyright © 2021"
};

export default MainFooter;
