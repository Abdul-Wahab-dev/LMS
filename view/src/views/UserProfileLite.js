import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
import Loader from "../utils/Loader";
import { useSelector } from "react-redux";
const UserProfileLite = () => {
  const loading = useSelector(state => state.auth.loading);
  const profile = useSelector(state => state.auth.profile);
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="User Profile"
          subtitle="Overview"
          md="12"
          className="ml-sm-auto mr-sm-auto"
        />
      </Row>
      <Row>
        {/* <Col lg="4">
        <UserDetails />
      </Col> */}
        <Col lg="10">
          <UserAccountDetails profile={profile} />
        </Col>
      </Row>
      {loading === true ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : null}
    </Container>
  );
};

export default UserProfileLite;
