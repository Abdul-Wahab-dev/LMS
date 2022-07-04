import React, { lazy } from "react";
import { Col } from "shards-react";
import { Route } from "react-router-dom";

// component
import PrivateRoute from "./utils/privateRoute";
const OfficalDocs = lazy(() => import("./views/OfficalDocs"));
const Assignment = lazy(() => import("./views/Assignment"));
const FYPBlock = lazy(() => import("./views/FYPBlock"));
const Events = lazy(() => import("./views/Events"));
const BlogPosts = lazy(() => import("./views/BlogPosts"));
const ApprovedUser = lazy(() => import("./views/ApprovedUser"));
const UserData = lazy(() => import("./views/UserData"));
const FacultyData = lazy(() => import("./views/FacultyData"));
const CoordData = lazy(() => import("./views/CoordData"));
const UserProfileLite = lazy(() => import("./views/UserProfileLite"));
const AddNewPost = lazy(() => import("./views/AddNewPost"));
const Slider = lazy(() => import("./views/Slider"));
const AdminDashBoard = lazy(() => import("./views/AdminDashBoard"));
const Quotes = lazy(() => import("./views/Quote"));
// store
const Routes = () => {
  return (
    <Col className="main-content p-0">
      <PrivateRoute exact path="/latest-news" component={BlogPosts} />
      <PrivateRoute exact path="/slider" component={Slider} />
      <Route exact path="/dashboard" component={AdminDashBoard} />
      <PrivateRoute
        exact
        path="/user-profile-lite"
        component={UserProfileLite}
      />
      <PrivateRoute exact path="/add-new-post" component={AddNewPost} />
      <PrivateRoute exact path="/user-approve" component={ApprovedUser} />
      <PrivateRoute path="/user-data" component={UserData} />
      <PrivateRoute exact path="/user-faculty" component={FacultyData} />
      <PrivateRoute path="/user-Coord" component={CoordData} />
      <PrivateRoute exact path="/offical-docs" component={OfficalDocs} />
      <PrivateRoute path="/assignment" component={Assignment} />
      <PrivateRoute path="/fyp-block" component={FYPBlock} />
      <PrivateRoute path="/events" component={Events} />
      <PrivateRoute path="/quotes" component={Quotes} />
    </Col>
  );
};
export default Routes;
