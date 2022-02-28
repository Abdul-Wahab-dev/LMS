import React, { useState } from "react";
import { Nav, NavItem, NavLink } from "shards-react";
import { NavLink as RouteNavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import arrow from "../../../images/dropdownarrows.png";
import store from "../../../store";
import { logoutUser } from "../../../actions/authActions";

const SidebarNavItems = props => {
  const [subNav, setSubNav] = useState(false);
  const [teamNav, setTeamNav] = useState(false);
  const [landingPageNav, setLandingPageNav] = useState(false);

  // initialize useDispatch
  const dispatch = useDispatch();
  const userNav = e => {
    if (
      e.target === document.getElementById("user-data") ||
      e.target === document.getElementById("user-data-span") ||
      e.target === document.getElementById("user-data-img")
    ) {
      setSubNav(!subNav);
    }
  };
  const teamNavHandle = e => {
    if (
      e.target === document.getElementById("team-data") ||
      e.target === document.getElementById("team-data-span") ||
      e.target === document.getElementById("team-data-img")
    ) {
      setTeamNav(!teamNav);
    }
  };

  const landingPageNavHandle = e => {
    if (
      e.target === document.getElementById("landing-page") ||
      e.target === document.getElementById("landing-page-span") ||
      e.target === document.getElementById("landing-page-img")
    ) {
      setLandingPageNav(!landingPageNav);
    }
  };

  const pecMember = useSelector(state => state.pec.members);
  const cspMember = useSelector(state => state.csp.members);
  const auth = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  switch (store.getState().auth.user.role) {
    case "admin":
      return (
        <div className="nav-wrapper">
          <Nav className="nav--no-borders flex-column">
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/"}
                className="d-flex align-items-center"
              >
                <ion-icon name="speedometer"></ion-icon>
                <span>Home</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/dashboard"}
                className="d-flex align-items-center"
              >
                <ion-icon name="speedometer"></ion-icon>
                <span>Dashboard</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/user-profile-lite"}
                className="d-flex align-items-center"
              >
                <ion-icon name="person-circle"></ion-icon>
                <span>Profile Info</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/user-approve"}
                className="d-flex align-items-center"
              >
                <ion-icon name="person-add"></ion-icon>
                <span>Approve User</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="user-data"
                style={{ position: "relative" }}
                onClick={e => userNav(e)}
              >
                <ion-icon name="people"></ion-icon>
                <span
                  className="position-absolute"
                  style={{ cursor: "pointer" }}
                  id="user-data-span"
                >
                  User Data
                </span>

                <img
                  width="15px"
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "20px",
                    cursor: "pointer"
                  }}
                  src={arrow}
                  alt="arrow"
                  id="user-data-img"
                />
                {subNav === true ? (
                  <Nav className="nav--no-borders flex-column">
                    <NavItem>
                      <NavLink
                        tag={RouteNavLink}
                        to={"/user-data"}
                        className="d-flex align-items-center"
                      >
                        <ion-icon name="person"></ion-icon>
                        <span>Student</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        tag={RouteNavLink}
                        to={"/user-faculty"}
                        className="d-flex align-items-center"
                      >
                        <ion-icon name="person"></ion-icon>
                        <span>Faculty</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        tag={RouteNavLink}
                        to={"/user-coord"}
                        className="d-flex align-items-center"
                      >
                        <ion-icon name="person"></ion-icon>
                        <span>Coordinator</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                ) : null}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/latest-news"}
                exact
                className="d-flex align-items-center"
              >
                <ion-icon name="newspaper"></ion-icon>
                <span>Latest News</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/add-new-post"}
                className="d-flex align-items-center"
              >
                <ion-icon name="warning"></ion-icon>
                <span>Complaint Form</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/fyp-block"}
                className="d-flex align-items-center"
              >
                <ion-icon name="documents"></ion-icon>
                <span>FYP Coordinator Block</span>
              </NavLink>
            </NavItem>
            {auth.role === "admin" ||
            auth.role === "coordinator" ||
            cspMember.filter(
              member => member.enrollmentNo === auth.enrollmentNo
            ).length > 0 ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/csp"}
                  className="d-flex align-items-center"
                >
                  <ion-icon name="document-text"></ion-icon>
                  <span>CSP Coordinator Block</span>
                </NavLink>
              </NavItem>
            ) : null}

            {auth.role === "admin" ||
            auth.role === "coordinator" ||
            pecMember.map(pec => {
              return (
                pec.docSubmittedBy &&
                pec.docSubmittedBy.filter(
                  filtermeber =>
                    filtermeber.enrollmentNo === auth.enrollmentNo ||
                    (filtermeber.program === auth.program &&
                      filtermeber.batch === auth.batch)
                )
              );
            }).length > 0 ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/pec-docs"}
                  className="d-flex align-items-center"
                >
                  <ion-icon name="document-text"></ion-icon>
                  <span>PEC Coordinator Block</span>
                </NavLink>
              </NavItem>
            ) : null}

            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/internship"}
                className="d-flex align-items-center"
              >
                <ion-icon name="business"></ion-icon>
                <span>Internship Block</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                id="landing-page"
                style={{ position: "relative" }}
                onClick={e => landingPageNavHandle(e)}
              >
                <ion-icon name="receipt"></ion-icon>
                <span
                  style={{ cursor: "pointer" }}
                  className="position-absolute"
                  id="landing-page-span"
                >
                  Landing Page
                </span>
                <img
                  width="15px"
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "20px",
                    cursor: "pointer"
                  }}
                  src={arrow}
                  alt="arrow"
                  id="landing-page-img"
                />
                {landingPageNav === true ? (
                  <Nav className="nav--no-borders flex-column">
                    <NavItem>
                      <NavLink
                        tag={RouteNavLink}
                        to={"/"}
                        className="d-flex align-items-center"
                      >
                        <ion-icon name="home"></ion-icon>
                        <span>Home</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        tag={RouteNavLink}
                        to={"/events"}
                        className="d-flex align-items-center"
                      >
                        <ion-icon name="calendar-number"></ion-icon>
                        <span>Events</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        tag={RouteNavLink}
                        to={"/slider"}
                        className="d-flex align-items-center"
                      >
                        <ion-icon name="bookmarks"></ion-icon>
                        <span>Slider</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        tag={RouteNavLink}
                        to={"/quotes"}
                        className="d-flex align-items-center"
                      >
                        <ion-icon name="logo-twitch"></ion-icon>
                        <span>Quotes</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                ) : null}
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                id="team-data"
                style={{ position: "relative" }}
                onClick={e => teamNavHandle(e)}
              >
                <ion-icon name="people-circle"></ion-icon>
                <span
                  className="position-absolute"
                  style={{ cursor: "pointer" }}
                  id="team-data-span"
                >
                  Team
                </span>

                <img
                  width="15px"
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "20px",
                    cursor: "pointer"
                  }}
                  src={arrow}
                  alt="arrow"
                  id="team-data-img"
                />
                {teamNav === true ? (
                  <Nav className="nav--no-borders flex-column">
                    <NavItem>
                      <NavLink
                        tag={RouteNavLink}
                        to={"/teams"}
                        className="d-flex align-items-center"
                      >
                        <ion-icon name="people-circle"></ion-icon>
                        <span>Teams</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        tag={RouteNavLink}
                        to={"/team-member"}
                        className="d-flex align-items-center"
                      >
                        <ion-icon name="people"></ion-icon>
                        <span>Members</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        tag={RouteNavLink}
                        to={"/team-assignment"}
                        className="d-flex align-items-center"
                      >
                        <ion-icon name="document-text"></ion-icon>
                        <span>Assignments</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                ) : null}
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

            {isAuthenticated === true ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/user-login"}
                  className="d-flex align-items-center"
                  onClick={() => dispatch(logoutUser())}
                >
                  <ion-icon name="log-out"></ion-icon>
                  <span>Logout</span>
                </NavLink>
              </NavItem>
            ) : null}
          </Nav>
        </div>
      );
    case "faculty":
      return (
        <div className="nav-wrapper">
          <Nav className="nav--no-borders flex-column">
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/"}
                className="d-flex align-items-center"
              >
                <ion-icon name="speedometer"></ion-icon>
                <span>Home</span>
              </NavLink>
            </NavItem>
            {auth.permissions &&
            auth.permissions.NEWS &&
            auth.permissions.NEWS.read === true ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/latest-news"}
                  exact
                  className="d-flex align-items-center"
                >
                  <ion-icon name="newspaper"></ion-icon>
                  <span>Latest News</span>
                </NavLink>
              </NavItem>
            ) : null}

            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/user-profile-lite"}
                className="d-flex align-items-center"
              >
                <ion-icon name="person-circle"></ion-icon>
                <span>Profile Info</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/user-data"}
                className="d-flex align-items-center"
              >
                <ion-icon name="people"></ion-icon>
                <span>Student Data</span>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/add-new-post"}
                className="d-flex align-items-center"
              >
                <ion-icon name="warning"></ion-icon>
                <span>Complaint Form</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/assignment"}
                className="d-flex align-items-center"
              >
                <ion-icon name="document"></ion-icon>
                <span>Assignment</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/offical-docs"}
                className="d-flex align-items-center"
              >
                <ion-icon name="document-attach"></ion-icon>
                <span>Official Documents</span>
              </NavLink>
            </NavItem>
            {auth.permissions &&
            auth.permissions.CSP &&
            auth.permissions.CSP.read === true ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/csp"}
                  className="d-flex align-items-center"
                >
                  <ion-icon name="document-text"></ion-icon>
                  <span>CSP Coordinator Block</span>
                </NavLink>
              </NavItem>
            ) : null}

            {auth.permissions &&
            auth.permissions.PEC &&
            auth.permissions.PEC.read === true ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/pec-docs"}
                  className="d-flex align-items-center"
                >
                  <ion-icon name="document-text"></ion-icon>
                  <span>PEC Coordinator Block</span>
                </NavLink>
              </NavItem>
            ) : null}
            {auth.permissions &&
            auth.permissions.FYP &&
            auth.permissions.FYP.read === true ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/fyp-block"}
                  className="d-flex align-items-center"
                >
                  <ion-icon name="documents"></ion-icon>
                  <span>FYP Coordinator Block</span>
                </NavLink>
              </NavItem>
            ) : null}
            {auth.permissions &&
            auth.permissions.INTERNSHIP &&
            auth.permissions.INTERNSHIP.read === true ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/internship"}
                  className="d-flex align-items-center"
                >
                  <ion-icon name="business"></ion-icon>
                  <span>Internship Block</span>
                </NavLink>
              </NavItem>
            ) : null}
            {auth.permissions &&
            auth.permissions.TEAM &&
            auth.permissions.TEAM.read === true ? (
              <NavItem>
                <NavLink
                  id="team-data"
                  style={{ position: "relative" }}
                  onClick={e => teamNavHandle(e)}
                >
                  <ion-icon name="people-circle"></ion-icon>
                  <span
                    className="position-absolute"
                    style={{ cursor: "pointer" }}
                    id="team-data-span"
                  >
                    Team
                  </span>

                  <img
                    width="15px"
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "20px",
                      cursor: "pointer"
                    }}
                    src={arrow}
                    alt="arrow"
                    id="team-data-img"
                  />
                  {teamNav === true ? (
                    <Nav className="nav--no-borders flex-column">
                      <NavItem>
                        <NavLink
                          tag={RouteNavLink}
                          to={"/teams"}
                          className="d-flex align-items-center"
                        >
                          <ion-icon name="people-circle"></ion-icon>
                          <span>Teams</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          tag={RouteNavLink}
                          to={"/team-member"}
                          className="d-flex align-items-center"
                        >
                          <ion-icon name="people"></ion-icon>
                          <span>Members</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          tag={RouteNavLink}
                          to={"/team-assignment"}
                          className="d-flex align-items-center"
                        >
                          <ion-icon name="document-text"></ion-icon>
                          <span>Assignments</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  ) : null}
                </NavLink>
              </NavItem>
            ) : null}
            <NavItem>
              <a
                // tag={RouteNavLink}
                target="_blank"
                href={"https://cms.bahria.edu.pk/Logins/Faculty/Login.aspx"}
                className="d-flex align-items-center nav-link"
                rel="noopener noreferrer"
              >
                <ion-icon name="business"></ion-icon>
                <span>CMS</span>
              </a>
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
            {isAuthenticated === true ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/user-login"}
                  className="d-flex align-items-center"
                  onClick={() => dispatch(logoutUser())}
                >
                  <ion-icon name="log-out"></ion-icon>
                  <span>Logout</span>
                </NavLink>
              </NavItem>
            ) : null}
          </Nav>
        </div>
      );

    case "student":
      return (
        <div className="nav-wrapper">
          <Nav className="nav--no-borders flex-column">
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/"}
                className="d-flex align-items-center"
              >
                <ion-icon name="speedometer"></ion-icon>
                <span>Home</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/user-profile-lite"}
                className="d-flex align-items-center"
              >
                <ion-icon name="person-circle"></ion-icon>
                <span>Profile Info</span>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/latest-news"}
                exact
                className="d-flex align-items-center"
              >
                <ion-icon name="newspaper"></ion-icon>
                <span>Latest News</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/add-new-post"}
                className="d-flex align-items-center"
              >
                <ion-icon name="warning"></ion-icon>
                <span>Complaint Form</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/assignment"}
                className="d-flex align-items-center"
              >
                <ion-icon name="document"></ion-icon>
                <span>Assignment</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouteNavLink} to={"/offical-docs"}>
                <ion-icon name="document-attach"></ion-icon>
                <span>Official Documents</span>
              </NavLink>
            </NavItem>
            {auth.permissions &&
            auth.permissions.CSP &&
            auth.permissions.CSP.read === true ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/csp"}
                  className="d-flex align-items-center"
                >
                  <ion-icon name="document-text"></ion-icon>
                  <span>CSP Coordinator Block</span>
                </NavLink>
              </NavItem>
            ) : null}
            {auth.permissions &&
            auth.permissions.PEC &&
            auth.permissions.PEC.read === true ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/pec-docs"}
                  className="d-flex align-items-center"
                >
                  <ion-icon name="document-text"></ion-icon>
                  <span>PEC Coordinator Block</span>
                </NavLink>
              </NavItem>
            ) : null}
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/fyp-block"}
                className="d-flex align-items-center"
              >
                <ion-icon name="documents"></ion-icon>
                <span>FYP Coordinator Block</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <a
                target="_blank"
                href={"https://cms.bahria.edu.pk/Logins/Student/Login.aspx"}
                className="d-flex align-items-center nav-link"
                rel="noopener noreferrer"
              >
                <ion-icon name="business"></ion-icon>
                <span>CMS</span>
              </a>
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
            {isAuthenticated === true ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/user-login"}
                  className="d-flex align-items-center"
                  onClick={() => dispatch(logoutUser())}
                >
                  <ion-icon name="speedometer"></ion-icon>
                  <span>Logout</span>
                </NavLink>
              </NavItem>
            ) : null}
          </Nav>
        </div>
      );

    case "coordinator":
      return (
        <div className="nav-wrapper">
          <Nav className="nav--no-borders flex-column">
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/"}
                className="d-flex align-items-center"
              >
                <ion-icon name="speedometer"></ion-icon>
                <span>Home</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/user-profile-lite"}
                className="d-flex align-items-center"
              >
                <ion-icon name="person-circle"></ion-icon>
                <span>Profile Info</span>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/user-data"}
                className="d-flex align-items-center"
              >
                <ion-icon name="people"></ion-icon>
                <span>Student Data</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/latest-news"}
                exact
                className="d-flex align-items-center"
              >
                <ion-icon name="newspaper"></ion-icon>
                <span>Latest News</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/add-new-post"}
                className="d-flex align-items-center"
              >
                <ion-icon name="warning"></ion-icon>
                <span>Complaint Form</span>
              </NavLink>
            </NavItem>

            {auth.permissions &&
            auth.permissions.FYP &&
            auth.permissions.FYP.read === true ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/fyp-block"}
                  className="d-flex align-items-center"
                >
                  <ion-icon name="documents"></ion-icon>
                  <span>FYP Coordinator Block</span>
                </NavLink>
              </NavItem>
            ) : null}
            {auth.permissions &&
            auth.permissions.CSP &&
            auth.permissions.CSP.read === true ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/csp"}
                  className="d-flex align-items-center"
                >
                  <ion-icon name="document-text"></ion-icon>
                  <span>CSP Coordinator Block</span>
                </NavLink>
              </NavItem>
            ) : null}

            {auth.permissions &&
            auth.permissions.PEC &&
            auth.permissions.PEC.read === true ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/pec-docs"}
                  className="d-flex align-items-center"
                >
                  <ion-icon name="document-text"></ion-icon>
                  <span>PEC Coordinator Block</span>
                </NavLink>
              </NavItem>
            ) : null}
            {auth.permissions &&
            auth.permissions.INTERNSHIP &&
            auth.permissions.INTERNSHIP.read === true ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/internship"}
                  className="d-flex align-items-center"
                >
                  <ion-icon name="business"></ion-icon>
                  <span>Internship Block</span>
                </NavLink>
              </NavItem>
            ) : null}

            <NavItem>
              <NavLink
                tag={RouteNavLink}
                to={"/events"}
                className="d-flex align-items-center"
              >
                <ion-icon name="calendar-number"></ion-icon>
                <span>Events</span>
              </NavLink>
            </NavItem>
            {auth.permissions &&
            auth.permissions.TEAM &&
            auth.permissions.TEAM.read === true ? (
              <NavItem>
                <NavLink
                  id="team-data"
                  style={{ position: "relative" }}
                  onClick={e => teamNavHandle(e)}
                >
                  <ion-icon name="people-circle"></ion-icon>
                  <span
                    className="position-absolute"
                    style={{ cursor: "pointer" }}
                    id="team-data-span"
                  >
                    Team
                  </span>

                  <img
                    width="15px"
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "20px",
                      cursor: "pointer"
                    }}
                    src={arrow}
                    alt="arrow"
                    id="team-data-img"
                  />
                  {teamNav === true ? (
                    <Nav className="nav--no-borders flex-column">
                      <NavItem>
                        <NavLink
                          tag={RouteNavLink}
                          to={"/teams"}
                          className="d-flex align-items-center"
                        >
                          <ion-icon name="people-circle"></ion-icon>
                          <span>Teams</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          tag={RouteNavLink}
                          to={"/team-member"}
                          className="d-flex align-items-center"
                        >
                          <ion-icon name="people"></ion-icon>
                          <span>Members</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          tag={RouteNavLink}
                          to={"/team-assignment"}
                          className="d-flex align-items-center"
                        >
                          <ion-icon name="document-text"></ion-icon>
                          <span>Assignments</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  ) : null}
                </NavLink>
              </NavItem>
            ) : null}
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
            {isAuthenticated === true ? (
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={"/user-login"}
                  className="d-flex align-items-center"
                  onClick={() => dispatch(logoutUser())}
                >
                  <ion-icon name="log-out"></ion-icon>
                  <span>Logout</span>
                </NavLink>
              </NavItem>
            ) : null}
          </Nav>
        </div>
      );

    default:
      return null;
  }
};
// }

export default SidebarNavItems;
