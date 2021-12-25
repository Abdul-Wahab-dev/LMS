import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import { logoutUser } from "../../../../actions/authActions";
import profileThumbNail from "../../../../images/profile-thumbnail.png";
const UserActions = props => {
  const [drop, setDrop] = useState(false);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const signOut = e => {
    dispatch(logoutUser());
  };

  const toggleDropDown = e => {
    if (document.getElementsByClassName("nav-drop-down")[0]) {
      if (
        e.target === document.getElementsByClassName("nav-drop-down")[0] ||
        e.target === document.getElementsByClassName("dropdown-toggle")[0] ||
        e.target ===
          document.getElementsByClassName("user-avatar-dropdown")[0] ||
        e.target === document.getElementsByClassName("dropdown-span")[0]
      ) {
        setDrop(true);
      } else {
        setDrop(false);
      }
    }
  };

  window.addEventListener("click", e => toggleDropDown(e));
  return (
    // <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
    props.user.isAuthenticated === true ? (
      <>
        <NavItem
          tag={Dropdown}
          caret
          // id="nav-drop-down"
          className="nav-drop-down  d-lg-none-c"
          toggle={() => setDrop(!drop)}
          // onClick={() => setDrop(true)}
        >
          <DropdownToggle
            caret
            tag={NavLink}
            className="text-nowrap px-3"
            style={{ cursor: "pointer" }}
          >
            <img
              className="user-avatar user-avatar-dropdown rounded-circle mr-2"
              src={
                props.user.user.profile
                  ? `https://files-uni.s3.us-east-2.amazonaws.com/${props.user.user.profile}`
                  : profileThumbNail
              }
              alt="User Avatar"
              style={{
                width: "45px",
                height: "45px",
                maxWidth: "45px",
                borderRadius: "50%",
                margin: "0"
              }}
            />{" "}
            <span className="d-none d-md-inline-block dropdown-span">
              {props.user.user.name}
            </span>
          </DropdownToggle>

          <Collapse tag={DropdownMenu} right small open={drop}>
            <DropdownItem
              to="/"
              // className="text-danger"
              onClick={e => {
                props.setModal(true);
                setDrop(false);
              }}
            >
              {/* <i className="material-icons text-danger">&#xE879;</i> */}
              Change Password
            </DropdownItem>
            <DropdownItem divider={true} />

            <DropdownItem
              to="/"
              className="text-danger"
              onClick={e => signOut(e)}
            >
              <i className="material-icons text-danger">&#xE879;</i> Logout
            </DropdownItem>
          </Collapse>
        </NavItem>
        <NavItem>
          <Link
            to={auth.user.role === "admin" ? "/dashboard" : "/latest-news"}
            className="custom-btn dashboard-btn d-lg-block-c d-none-c d-xl-none-c"
          >
            Dashboard
          </Link>
        </NavItem>
      </>
    ) : (
      <div className="d-flex justify-content-center align-items-center ">
        <Link to="/user-login" className="mr-3 custom-btn m-md-0">
          Login
        </Link>
        <Link to="/user-register" className="custom-btn d-md-none">
          Register
        </Link>
      </div>
    )
  );
};

export default UserActions;
