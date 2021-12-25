import React, { useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import {
  Container,
  Navbar,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "shards-react";
import { Link } from "react-router-dom";
import NavbarNav from "./NavbarNav/NavbarNav";
import LOGO from "../../../images/logo5.png";
import MenuIcon from "../../../images/menuIcon.png";

const MainNavbar = ({ stickyTop }) => {
  const [aboutUs, setAboutUs] = useState(false);
  const [program, setProgram] = useState(false);

  const auth = useSelector(state => state.auth);
  // console.log(auth.user.role)
  // const classes = classNames(
  //   "main-navbar",
  //   "bg-white",
  //   stickyTop && "sticky-top"
  // );
  let classes;
  if (auth.user.role === "admin") {
    classes = classNames(
      "main-navbar",
      "bg-white",
      "header-color-for-admin",
      stickyTop && "sticky-top"
    );
  } else if (auth.user.role === "faculty" || auth.user.role === "coordinator") {
    classes = classNames(
      "main-navbar",
      "bg-white",
      "header-color-for-faculty",
      stickyTop && "sticky-top"
    );
  } else {
    classes = classNames(
      "main-navbar",
      "bg-white",
      "header-color-for-student",
      stickyTop && "sticky-top"
    );
  }

  // Side bar Toggle
  const sideBarToggle = () => {
    if (document.getElementById("side-bar")) {
      document.getElementById("side-bar").classList.toggle("main-sidebar-hide");
    }
  };
  return (
    <div className={classes} style={{ padding: "0 25px" }}>
      <Navbar
        type="light"
        // className="align-items-stretch p-0 flex-md-nowrap w-100 "
        className="p-0 flex-md-nowrap w-100 "
      >
        {/* <h3
              style={{ color: "#fff", marginRight: "10px", marginBottom: "0" }}
              >
              {" "}
              LOGO
            </h3> */}

        <img
          src={MenuIcon}
          style={{ width: "40px", height: "40px" }}
          alt="menu icon"
          onClick={() => sideBarToggle()}
          className="d-none-c d-xl-none-c d-lg-block-c"
        />

        <img
          src={LOGO}
          alt="logo"
          width="150"
          style={{ width: "200px" }}
          className="mr-3 d-lg-none-c d-block-c"
        />
        {/* <Container className="p-0 d-md-none nav-bar-links d-md-none d-sm-none d-xs-none"> */}
        <Container className="p-0 nav-bar-links  d-lg-none-c d-block-c">
          <div className="d-flex justify-content-center align-items-center">
            <Link to="/" className="custom-btn">
              HOME
            </Link>
            {auth.isAuthenticated === true ? (
              <Link
                to={auth.user.role === "admin" ? "/dashboard" : "/latest-news"}
                className="custom-btn dashboard-btn"
              >
                Dashboard
              </Link>
            ) : null}
            <a
              href="https://www.bahria.edu.pk/buic/ee/"
              className="custom-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              EE FACULTY
            </a>
            <Dropdown open={aboutUs} toggle={() => setAboutUs(!aboutUs)}>
              <DropdownToggle className="custom-btn" nav caret>
                ABOUT US
              </DropdownToggle>
              <DropdownMenu>
                <a
                  href="https://www.bahria.edu.pk/buic/ee/department-overview/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DropdownItem>Department Overview</DropdownItem>
                </a>
                <a
                  href="https://www.bahria.edu.pk/buic/ee/vision/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DropdownItem>Department Vision</DropdownItem>
                </a>
                <a
                  href="https://www.bahria.edu.pk/buic/ee/message-form-hod/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DropdownItem>Message of HOD</DropdownItem>
                </a>
              </DropdownMenu>
            </Dropdown>
            <Dropdown open={program} toggle={() => setProgram(!program)}>
              <DropdownToggle className="custom-btn" nav caret>
                OBE Framework
              </DropdownToggle>
              <DropdownMenu>
                <a
                  href="https://www.bahria.edu.pk/academics/under-graduate-programs/bee/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DropdownItem>
                    Bachelors of Electrical Engineering
                  </DropdownItem>
                </a>
                <a
                  href="https://www.bahria.edu.pk/academics/graduate-programs/ms-electrical-engineering/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DropdownItem>Master of Electrical Engineering</DropdownItem>
                </a>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Container>
        {auth.isAuthenticated === true ? (
          <Link
            to={auth.user.role === "admin" ? "/dashboard" : "/latest-news"}
            className="custom-btn dashboard-btn d-lg-block-c d-none-c d-xl-none-c"
          >
            Dashboard
          </Link>
        ) : null}
        <NavbarNav />
      </Navbar>
    </div>
  );
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
