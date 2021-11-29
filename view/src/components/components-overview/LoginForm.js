import React, { useState, useEffect } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormFeedback,
  Button
} from "shards-react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

// Actons
import { loginUser } from "../../actions/authActions";

const LoginForm = props => {
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  // initialize useDispatch
  const dispatch = useDispatch();
  // Get Errors state from store
  const errorsFromStore = useSelector(state => state.errors);
  useEffect(() => {
    setErrors(errorsFromStore);
  }, [errorsFromStore]);

  // Login User
  const loginUserFunc = e => {
    e.preventDefault();

    setErrors({});

    const user = {
      enrollmentNo: enrollmentNo.toLowerCase(),
      password
    };
    dispatch(loginUser(user, pushToHomePage));
  };
  const history2 = useHistory();

  const pushToHomePage = () => {
    history2.push("/");
  };
  return (
    <ListGroup flush>
      <ListGroupItem className="p-4">
        {errors.message && errors.message.length > 0 && !errors.validation ? (
          <div className="error-message alert-danger" role="alert">
            {errors.message}
          </div>
        ) : null}

        <Row>
          <Col>
            <Form>
              <Row form>
                <Col md="12" className="mb-4">
                  <div className="d-flex justify-content-center align-item-center">
                    <h3 className="section-heading">Login to LMS</h3>
                  </div>
                </Col>
                <Col md="12" className="mb-2">
                  <label htmlFor="feEnrollment">Enrollment</label>
                  <FormInput
                    id="feEnrollment"
                    type="text"
                    placeholder="Enrollment"
                    value={enrollmentNo}
                    onChange={e => setEnrollmentNo(e.target.value)}
                    required
                    invalid={
                      errors.validation &&
                      errors.validation.enrollmentNo &&
                      true
                    }
                  />
                  {errors.validation && errors.validation.enrollmentNo && (
                    <FormFeedback>
                      {errors.validation.enrollmentNo}
                    </FormFeedback>
                  )}
                </Col>
                <Col md="12">
                  <label htmlFor="fePassword">Password</label>
                  <FormInput
                    id="fePassword"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    invalid={
                      errors.validation && errors.validation.password && true
                    }
                  />

                  {errors.validation && errors.validation.password && (
                    <FormFeedback>{errors.validation.password}</FormFeedback>
                  )}
                </Col>
              </Row>
              <div className="py-4">
                <Row form>
                  <Col md="12">
                    <Button
                      type="button"
                      className="w-100"
                      onClick={e => loginUserFunc(e)}
                    >
                      Login
                    </Button>
                  </Col>
                </Row>
                <p className="mt-3">
                  <span className="text-mute">Do you have an account?</span>
                  <Link to={"/user-register"}>
                    <span
                      style={{
                        marginLeft: "10px",
                        color: "#1976d2",
                        fontWeight: "500",
                        cursor: "pointer"
                      }}
                    >
                      Register Now
                    </span>
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  );
};

export default withRouter(LoginForm);
