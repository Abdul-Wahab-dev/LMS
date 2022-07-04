import React from "react";
import classNames from "classnames";
import { Col } from "shards-react";
// component
import SidebarNavItems from "./SidebarNavItems";

const MainSidebar = () => {
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
      <SidebarNavItems />
    </Col>
  );
};

export default MainSidebar;
