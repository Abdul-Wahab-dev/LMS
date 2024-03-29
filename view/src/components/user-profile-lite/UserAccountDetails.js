import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  Button,
} from "shards-react";

import { useDispatch, useSelector } from "react-redux";
import Program from "../../utils/Program";
import Batch from "../../utils/Batch";
// Actons
import { getCurrentUser, updateUserAction } from "../../actions/authActions";
import profileThumbNail from "../../images/profile-thumbnail.png";

const UserAccountDetails = ({ profile }) => {
  const [role, setRole] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [program, setProgram] = useState("");
  const [degreeDuration, setDegreeDuration] = useState("");
  const [intakeSemester, setIntakeSemester] = useState("");
  const [maxSemester, setMaxSemester] = useState("");
  const [mobile, setMobile] = useState("");

  const [contact, setContact] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [universityEmail, setUniversityEmail] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");

  // initialize useDispatch
  const dispatch = useDispatch();
  // UseEffect
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  // get state from store
  const auth = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (profile.role) {
      setRole(profile.role ? profile.role : "");
      setEnrollmentNo(profile.enrollmentNo ? profile.enrollmentNo : "");
      setName(profile.name ? profile.name : "");
      setFatherName(profile.fatherName ? profile.fatherName : "");
      setProgram(profile.program ? profile.program : "");
      setDegreeDuration(profile.degreeDuration ? profile.degreeDuration : "");
      setIntakeSemester(profile.batch ? profile.batch : "");
      setMaxSemester(profile.maxSemester ? profile.maxSemester : "");
      setMobile(profile.mobile ? profile.mobile : "");

      setContact(profile.contact ? profile.contact : "");
      setPersonalEmail(profile.personalEmail ? profile.personalEmail : "");
      setUniversityEmail(
        profile.universityEmail ? profile.universityEmail : ""
      );
      setPermanentAddress(
        profile.permanentAddress ? profile.permanentAddress : ""
      );
      setCurrentAddress(profile.currentAddress ? profile.currentAddress : "");
    }
  }, [profile]);

  const updateUserFunc = () => {
    const user = {
      id: profile && profile._id,
      role: role.toLowerCase(),
      enrollmentNo: enrollmentNo.toLowerCase(),
      name: name,
      fatherName: fatherName,
      program: role !== "student" ? "" : program.toLowerCase(),
      degreeDuration: role !== "student" ? "" : degreeDuration.toLowerCase(),
      batch: role !== "student" ? "" : intakeSemester.toLowerCase(),
      maxSemester: role !== "student" ? "" : maxSemester.toLowerCase(),
      mobile: mobile.toLowerCase(),
      contact: contact.toLowerCase(),
      personalEmail: personalEmail.toLowerCase(),
      universityEmail: universityEmail.toLowerCase(),
      permanentAddress: permanentAddress,
      currentAddress: currentAddress,
    };
    dispatch(updateUserAction(user));
  };
  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Profile Data</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <div className="my-2 d-flex justify-content-center align-items-center">
            <img
              src={
                profile.profile
                  ? `https://deefile.s3.amazonaws.com/${profile.profile}`
                  : profileThumbNail
              }
              alt="user-profile"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                marginBottom: "20px",
              }}
              className="thumbnail-image"
            />
          </div>
          <Row>
            <Col>
              <Form>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feInputState">Role</label>
                    <FormInput
                      id="feEnrollment"
                      type="text"
                      placeholder="Role"
                      value={role}
                      readOnly={true}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </Col>
                  <Col md="6">
                    <label htmlFor="feEnrollment">Enrollment</label>
                    <FormInput
                      id="feEnrollment"
                      type="text"
                      placeholder="Enrollment"
                      value={enrollmentNo}
                      readOnly={
                        (auth && auth.role !== "student") ||
                        (auth && auth.role !== "coordinator")
                          ? false
                          : true
                      }
                      // readOnly={true}
                      onChange={(e) => setEnrollmentNo(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feName">Name</label>
                    <FormInput
                      id="feName"
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      readOnly={
                        (auth && auth.role !== "student") ||
                        (auth && auth.role !== "coordinator")
                          ? false
                          : true
                      }
                    />
                  </Col>
                  <Col md="6">
                    <label htmlFor="feFatherName">Father Name</label>
                    <FormInput
                      id="feFatherName"
                      type="text"
                      placeholder="FatherName"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      readOnly={
                        (auth && auth.role !== "student") ||
                        (auth && auth.role !== "coordinator")
                          ? false
                          : true
                      }
                    />
                  </Col>
                </Row>
                {profile.role === "student" ? (
                  <>
                    <Row form>
                      <Col md="6" className="form-group">
                        <label htmlFor="feProgram">Program</label>
                        <Program program={program} setProgram={setProgram} />
                      </Col>
                      <Col md="6">
                        <label htmlFor="feDegreeDuration">
                          Degree Duration
                        </label>
                        <FormInput
                          id="feDegreeDuration"
                          type="text"
                          placeholder="Degree Duration"
                          value={degreeDuration}
                          onChange={(e) => setDegreeDuration(e.target.value)}
                          readOnly={
                            (auth && auth.role !== "student") ||
                            (auth && auth.role !== "coordinator")
                              ? false
                              : true
                          }
                        />
                      </Col>
                    </Row>
                    <Row form>
                      <Col md="6" className="form-group">
                        <label htmlFor="feIntakeSemester">Batch</label>
                        <Batch
                          batch={intakeSemester}
                          setBatch={setIntakeSemester}
                        />
                        {/* <FormInput
                          id="feIntakeSemester"
                          type="text"
                          placeholder="Intake Semester"
                          value={intakeSemester}
                          onChange={e => setIntakeSemester(e.target.value)}
                          readOnly={
                            profile && profile.role !== "admin" ? true : false
                          }
                        /> */}
                      </Col>
                      <Col md="6">
                        <label htmlFor="feMaxSemester">Max Semester</label>
                        <FormInput
                          id="feMax Semester"
                          type="number"
                          placeholder="Max Semester"
                          value={maxSemester}
                          onChange={(e) => setMaxSemester(e.target.value)}
                          readOnly={
                            (auth && auth.role !== "student") ||
                            (auth && auth.role !== "coordinator")
                              ? false
                              : true
                          }
                        />
                      </Col>
                    </Row>
                  </>
                ) : null}

                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feMobileNumber">Mobile Number</label>
                    <FormInput
                      id="feMobileNumber"
                      type="text"
                      placeholder="Mobile Number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      readOnly={
                        (auth && auth.role !== "student") ||
                        (auth && auth.role !== "coordinator")
                          ? false
                          : true
                      }
                    />
                  </Col>
                  <Col md="6">
                    <label htmlFor="fePhoneNumber">Phone number</label>
                    <FormInput
                      id="fePhoneNumber"
                      type="number"
                      placeholder="Phone Number"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      readOnly={
                        (auth && auth.role !== "student") ||
                        (auth && auth.role !== "coordinator")
                          ? false
                          : true
                      }
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="fePersonalEmail">Personal Email</label>
                    <FormInput
                      id="fePersonalEmail"
                      type="email"
                      placeholder="Personal Email"
                      value={personalEmail}
                      onChange={(e) => setPersonalEmail(e.target.value)}
                      readOnly={
                        (auth && auth.role !== "student") ||
                        (auth && auth.role !== "coordinator")
                          ? false
                          : true
                      }
                    />
                  </Col>
                  <Col md="6">
                    <label htmlFor="fePhoneNumber">University Email</label>
                    <FormInput
                      id="feUniversityEmail"
                      type="email"
                      placeholder="University Email"
                      value={universityEmail}
                      onChange={(e) => setUniversityEmail(e.target.value)}
                      readOnly={
                        (auth && auth.role !== "student") ||
                        (auth && auth.role !== "coordinator")
                          ? false
                          : true
                      }
                    />
                  </Col>
                </Row>

                <br />
                <FormGroup>
                  <label htmlFor="feInputAddress">Current Address</label>
                  <FormInput
                    id="feInputAddress"
                    placeholder="1234 Main St"
                    value={currentAddress}
                    onChange={(e) => setCurrentAddress(e.target.value)}
                    readOnly={
                      (auth && auth.role !== "student") ||
                      (auth && auth.role !== "coordinator")
                        ? false
                        : true
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="feInputAddress2">Permanent Address</label>
                  <FormInput
                    id="feInputAddress2"
                    placeholder="Apartment, Studio or Floor"
                    value={permanentAddress}
                    onChange={(e) => setPermanentAddress(e.target.value)}
                    readOnly={
                      (auth && auth.role !== "student") ||
                      (auth && auth.role !== "coordinator")
                        ? false
                        : true
                    }
                  />
                </FormGroup>
                {(auth && auth.role === "admin") ||
                auth.role === "faculty" ||
                auth.role === "coordinator" ? (
                  <Button type="button" onClick={() => updateUserFunc()}>
                    Update
                  </Button>
                ) : null}
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
};

UserAccountDetails.defaultProps = {
  title: "Account Details",
};

export default UserAccountDetails;
