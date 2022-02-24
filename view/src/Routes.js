import React, { lazy } from "react";
import { Col } from "shards-react";

// component
import PrivateRoute from "./utils/privateRoute";

// import Errors from "./views/Errors";

const OfficalDocs = lazy(() => import("./views/OfficalDocs"));
// import OfficalDocs from "./views/OfficalDocs";
const Assignment = lazy(() => import("./views/Assignment"));
// import Assignment from "./views/Assignment";
const FYPBlock = lazy(() => import("./views/FYPBlock"));
// import FYPBlock from "./views/FYPBlock";
const Teams = lazy(() => import("./views/Teams"));
// import Teams from "./views/Teams";
const TeamAssignments = lazy(() => import("./views/TeamAssignments"));
// import TeamAssignments from "./views/TeamAssignments";
const TeamMembers = lazy(() => import("./views/TeamMembers"));
// import TeamMembers from "./views/TeamMembers";
const Internship = lazy(() => import("./views/Internships"));
// import Internship from "./views/Internships";

const CSP = lazy(() => import("./views/CSP"));
// import CSP from "./views/CSP";
const PECDocs = lazy(() => import("./views/PECDocs"));
// import PECDocs from "./views/PECDocs";
const Events = lazy(() => import("./views/Events"));
// import Events from "./views/Events";

const BlogPosts = lazy(() => import("./views/BlogPosts"));
// import BlogPosts from "./views/BlogPosts";

const ApprovedUser = lazy(() => import("./views/ApprovedUser"));
// import ApprovedUser from "./views/ApprovedUser";
const UserData = lazy(() => import("./views/UserData"));
// import UserData from "./views/UserData";
const FacultyData = lazy(() => import("./views/FacultyData"));
// import FacultyData from "./views/FacultyData";
const CoordData = lazy(() => import("./views/CoordData"));
// import CoordData from "./views/CoordData";

const UserProfileLite = lazy(() => import("./views/UserProfileLite"));
// import UserProfileLite from "./views/UserProfileLite";
const AddNewPost = lazy(() => import("./views/AddNewPost"));
// import AddNewPost from "./views/AddNewPost";

const Slider = lazy(() => import("./views/Slider"));

// import Slider from "./views/Slider";
const AdminDashBoard = lazy(() => import("./views/AdminDashBoard"));
// import AdminDashBoard from "./views/AdminDashBoard";
const Quotes = lazy(() => import("./views/Quote"));
// import Quotes from "./views/Quote";
// store
const Routes = () => {
  return (
    <Col
      className="main-content p-0"
      // lg={{ size: 10, offset: 2 }}
      // md={{ size: 10, offset: 2 }}
    >
      <PrivateRoute exact path="/latest-news" component={BlogPosts} />
      {/* <PrivateRoute exact path="/latest-news" component={Errors} /> */}
      <PrivateRoute exact path="/slider" component={Slider} />
      {/* <PrivateRoute exact path="/slider" component={Errors} /> */}
      <PrivateRoute exact path="/dashboard" component={AdminDashBoard} />
      {/* <PrivateRoute exact path="/dashboard" component={Errors} /> */}
      <PrivateRoute
        exact
        path="/user-profile-lite"
        component={UserProfileLite}
      />
      {/* <PrivateRoute exact path="/user-profile-lite" component={Errors} /> */}
      <PrivateRoute exact path="/add-new-post" component={AddNewPost} />
      {/* <PrivateRoute exact path="/add-new-post" component={Errors} /> */}

      <PrivateRoute exact path="/user-approve" component={ApprovedUser} />
      {/* <PrivateRoute exact path="/user-approve" component={Errors} /> */}
      <PrivateRoute path="/user-data" component={UserData} />
      {/* <PrivateRoute path="/user-data" component={Errors} /> */}
      <PrivateRoute exact path="/user-faculty" component={FacultyData} />
      {/* <PrivateRoute exact path="/user-faculty" component={Errors} /> */}
      <PrivateRoute path="/user-Coord" component={CoordData} />
      {/* <PrivateRoute path="/user-Coord" component={Errors} /> */}
      <PrivateRoute exact path="/offical-docs" component={OfficalDocs} />
      {/* <PrivateRoute exact path="/offical-docs" component={Errors} /> */}
      <PrivateRoute path="/assignment" component={Assignment} />
      {/* <PrivateRoute path="/assignment" component={Errors} /> */}
      <PrivateRoute path="/fyp-block" component={FYPBlock} />
      {/* <PrivateRoute path="/fyp-block" component={Errors} /> */}
      <PrivateRoute path="/teams" component={Teams} />
      {/* <PrivateRoute path="/teams" component={Errors} /> */}
      <PrivateRoute path="/team-member" component={TeamMembers} />
      {/* <PrivateRoute path="/team-member" component={Errors} /> */}
      <PrivateRoute path="/team-assignment" component={TeamAssignments} />
      {/* <PrivateRoute path="/team-assignment" component={Errors} /> */}
      <PrivateRoute path="/internship" component={Internship} />
      {/* <PrivateRoute path="/internship" component={Errors} /> */}
      <PrivateRoute path="/csp" component={CSP} />
      {/* <PrivateRoute path="/csp" component={Errors} /> */}
      <PrivateRoute path="/pec-docs" component={PECDocs} />
      {/* <PrivateRoute path="/pec-docs" component={Errors} /> */}
      <PrivateRoute path="/events" component={Events} />
      {/* <PrivateRoute path="/events" component={Errors} /> */}
      {/* <PrivateRoute path="/quotes" component={Errors} /> */}
      <PrivateRoute path="/quotes" component={Quotes} />
    </Col>
  );
};
export default Routes;
