import React from "react";
import { Container } from "shards-react";
import "./footer.css";
const MainFooter = ({ contained, menuItems, copyright }) => (
  <>
    <footer className="footer-distributed">
      <Container>
        <div className="footer-left">
          <h3>LOGO</h3>
          <p className="footer-company-about w-50 mt-3">
            To become a knowledge and creativity driven international university
            that contributes towards development of society.
          </p>

          <div className="footer-icons">
            <a href="https://www.facebook.com/" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.youtube.com/" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer-right"></div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              {/* <span>444 S. Cedros Ave</span> Solana Beach, California */}
              ADDRESS CITY , DEMO COUNTRY
            </p>
          </div>

          <div>
            <i className="fa fa-phone"></i>
            <p>+92309 - 6171080</p>
          </div>

          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <a href="mailto:abdulwahabdev0@gmail.com">
                abdulwahabdev0@gmail.com
              </a>
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
  copyright: "Copyright © 2022",
};

export default MainFooter;
