import React from "react";
import classNames from "classnames";
import { Col } from "shards-react";

import { Nav, NavItem, NavLink } from "shards-react";
import { NavLink as RouteNavLink } from "react-router-dom";

const SimpleSideBar = props => {
  const classes = classNames(
    "main-sidebar",
    "px-0",
    "col-12",
    "main-sidebar-hide",
    "main-sidebar-show"
  );
  return (
    <Col
      tag="aside"
      className={classes}
      lg={{ size: 2 }}
      md={{ size: 3 }}
      id="side-bar"
    >
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          <NavItem>
            <NavLink
              tag={RouteNavLink}
              to={"/"}
              className="d-flex align-items-center"
            >
              <ion-icon name="person-circle"></ion-icon>
              <span>Home</span>
            </NavLink>
          </NavItem>

          <NavItem>
            <a
              href="https://www.bahria.edu.pk/buic/ee/"
              className="d-flex align-items-center nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ion-icon name="person-circle"></ion-icon>
              <span style={{ marginLeft: "14px" }}>EE FACULTY</span>
            </a>
          </NavItem>
          <NavItem>
            <a
              href="https://www.bahria.edu.pk/buic/ee/department-overview/"
              className="d-flex align-items-center nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ion-icon name="person-circle"></ion-icon>
              <span style={{ marginLeft: "14px" }}>Department Overview</span>
            </a>
          </NavItem>
          <NavItem>
            <a
              href="https://www.bahria.edu.pk/buic/ee/vision/"
              className="d-flex align-items-center nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ion-icon name="person-circle"></ion-icon>
              <span style={{ marginLeft: "14px" }}>Department Vision</span>
            </a>
          </NavItem>
          <NavItem>
            <a
              href="https://www.bahria.edu.pk/buic/ee/message-form-hod/"
              className="d-flex align-items-center nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ion-icon name="person-circle"></ion-icon>
              <span style={{ marginLeft: "14px" }}>Message of HOD</span>
            </a>
          </NavItem>
          <NavItem>
            <a
              href="https://www.bahria.edu.pk/academics/under-graduate-programs/bee/"
              className="d-flex align-items-center nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ion-icon name="person-circle"></ion-icon>
              <span style={{ marginLeft: "14px" }}>BEE</span>
            </a>
          </NavItem>
          <NavItem>
            <a
              href="https://www.bahria.edu.pk/academics/graduate-programs/ms-electrical-engineering/"
              className="d-flex align-items-center nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ion-icon name="person-circle"></ion-icon>
              <span style={{ marginLeft: "14px" }}>MEE</span>
            </a>
          </NavItem>
        </Nav>
      </div>
    </Col>
  );
};
export default SimpleSideBar;
