import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Container, Navbar } from "shards-react";
import NavbarNav from "./NavbarNav/NavbarNav";
import MenuIcon from "../../../images/menuIcon.png";
const MainNavbar = ({ stickyTop }) => {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  let classes;
  classes = classNames(
    "main-navbar",
    "bg-white",
    "header-color-for-student",
    stickyTop && "sticky-top"
  );
  // Side bar Toggle
  const sideBarToggle = () => {
    if (document.getElementById("side-bar")) {
      document.getElementById("side-bar").classList.toggle("main-sidebar-hide");
    }
  };
  return (
    <div className={classes} style={{ padding: "0 25px" }}>
      <Container className="p-0 nav-bar-links  d-lg-none-c d-block-c">
        <Navbar type="light" className="p-0 flex-md-nowrap w-100 ">
          <Link to="/">
            <h3
              style={{ color: "#fff", marginRight: "10px", marginBottom: "0" }}
            >
              LOGO
            </h3>
          </Link>

          <img
            src={MenuIcon}
            style={{ width: "40px", height: "40px" }}
            alt="menu icon"
            onClick={() => sideBarToggle()}
            className="d-none-c d-xl-none-c d-lg-block-c"
          />

          <div className="d-flex justify-content-center align-items-center">
            <div
              style={{
                fontSize: "18px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                right: "50px",
                bottom: "30px",
                background: "#1976d2",
                boxShadow: "2px 3px 10px #5e91c296",
                borderRadius: "50%",
                width: "80px",
                height: "80px",
              }}
            >
              Time
              <br />
              {dateState.getHours()}:{dateState.getMinutes()}
            </div>
            {/* <Link to="/" className="custom-btn">
              HOME
            </Link>
            {auth.isAuthenticated === true ? (
              <Link
                to={auth.user.role === "admin" ? "/dashboard" : "/latest-news"}
                className="custom-btn dashboard-btn"
              >
                Dashboard
              </Link>
            ) : null} */}
          </div>

          <NavbarNav />
        </Navbar>
      </Container>
    </div>
  );
};

MainNavbar.defaultProps = {
  stickyTop: true,
};

export default MainNavbar;
