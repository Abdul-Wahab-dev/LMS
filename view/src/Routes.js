import React from "react";
import { Col } from "shards-react";

// component

// import Errors from "./views/Errors";
import OfficalDocs from "./views/OfficalDocs";
import Assignment from "./views/Assignment";
import FYPBlock from "./views/FYPBlock";
import Teams from "./views/Teams";
import TeamMembers from "./views/TeamMembers";
import TeamAssignments from "./views/TeamAssignments";
import Internship from "./views/Internships";
import CSP from "./views/CSP";
import PECDocs from "./views/PECDocs";
import Events from "./views/Events";
import BlogPosts from "./views/BlogPosts";
import ApprovedUser from "./views/ApprovedUser";
import UserData from "./views/UserData";
import FacultyData from "./views/FacultyData";
import CoordData from "./views/CoordData";

import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";

import PrivateRoute from "./utils/privateRoute";

import Slider from "./views/Slider";
import AdminDashBoard from "./views/AdminDashBoard";
import Quotes from "./views/Quote";
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
