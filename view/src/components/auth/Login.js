import React from "react";
import { useSelector } from "react-redux";
// Component
import LoginForm from "../components-overview/LoginForm";
import Loader from "../../utils/Loader";
import LoginPageIcon from "../../images/img-13.png";
import { Row, Col } from "shards-react";
const Login = props => {
  const loading = useSelector(state => state.auth.loading);

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <div
        className="box-shadow"
        style={{
          width: "800px",
          height: "500px",
          margin: "30px auto 30px auto",
          overflow: "hidden",
          backgroundColor: "#fff"
        }}
      >
        <Row className="h-100">
          <Col
            md="6"
            className="d-flex justify-content-center align-items-center h-100"
          >
            <LoginForm />
          </Col>
          <Col
            md="6"
            className="d-flex justify-content-center align-items-center h-100"
          >
            <img src={LoginPageIcon} alt="login-icon" width="400" />
          </Col>
        </Row>
      </div>
      {loading === true ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : null}
    </div>
  );
};
export default Login;
