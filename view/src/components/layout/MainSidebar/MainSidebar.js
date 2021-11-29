import React from "react";
import classNames from "classnames";
import { Col } from "shards-react";
// component
import SidebarNavItems from "./SidebarNavItems";

const MainSidebar = () => {
  const classes = classNames("main-sidebar", "px-0", "col-12");

  return (
    <Col tag="aside" className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
      <SidebarNavItems />
    </Col>
  );
};

export default MainSidebar;
