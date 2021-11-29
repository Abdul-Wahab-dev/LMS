import React, { useState, useEffect } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormFeedback,
  FormSelect,
  Button,
  Modal,
  ModalBody
} from "shards-react";

import { useDispatch, useSelector } from "react-redux";
// Actons
import { registerUser } from "../../actions/authActions";
// custom file uploader
import CustomFileUpload from "./CustomFileUpload";
// profile thumbnail
import profileThumbNail from "../../images/profile-thumbnail.png";
// Program Select
import Program from "../../utils/Program";
import Batch from "../../utils/Batch";
import { Link } from "react-router-dom";

const RegistrationFrom = () => {
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
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [file, setFile] = useState({});
  const [errors, setErrors] = useState({});
  const [messageModal, setMessageModal] = useState(false);
  // initialize useDispatch
  const dispatch = useDispatch();
  // Get Errors state from store
  const errorsFromStore = useSelector(state => state.errors);
  // UseEffect
  useEffect(() => {
    if (errorsFromStore) {
      setErrors(errorsFromStore);
    }
  }, [errorsFromStore]);
  // register
  const registerUserFunc = e => {
    const user = {
      role: role.toLowerCase(),
      enrollmentNo: enrollmentNo.toLowerCase(),
      name: name.toLowerCase(),
      fatherName: fatherName.toLowerCase(),
      program: role !== "student" ? "" : program.toLowerCase(),
      degreeDuration: role !== "student" ? "" : degreeDuration.toLowerCase(),
      batch: role !== "student" ? "" : intakeSemester.toLowerCase(),
      maxSemester: role !== "student" ? "" : maxSemester.toLowerCase(),
      mobile: mobile.toLowerCase(),
      contact: contact.toLowerCase(),
      personalEmail: personalEmail.toLowerCase(),
      universityEmail: universityEmail.toLowerCase(),
      permanentAddress: permanentAddress.toLowerCase(),
      currentAddress: currentAddress.toLowerCase(),
      password,
      passwordConfirm
    };
    dispatch(registerUser(user, file, clearState));
  };
  const clearState = () => {
    setRole("");
    setEnrollmentNo("");
    setName("");
    setFatherName("");
    setProgram("");
    setDegreeDuration("");
    setIntakeSemester("");
    setMaxSemester("");
    setMobile("");
    setContact("");
    setPersonalEmail("");
    setUniversityEmail("");
    setPermanentAddress("");
    setCurrentAddress("");
    setPassword("");
    setPasswordConfirm("");
    setMessageModal(true);
  };
  return (
    <>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          {errors.message && errors.message.length > 0 && !errors.validation ? (
            <div class="error-message alert-danger" role="alert">
              {errors.message}
            </div>
          ) : null}
          <Row>
            <Col>
              <Form>
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <img
                    src={
                      file.name ? URL.createObjectURL(file) : profileThumbNail
                    }
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      marginBottom: "20px"
                    }}
                    alt="profile"
                  />
                  <div style={{ width: "300px" }}>
                    <label>Profile</label>
                    <CustomFileUpload file={file} setFile={setFile} />
                  </div>
                </div>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feInputState">Role</label>
                    <FormSelect
                      id="feInputState"
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      required
                      invalid={
                        errors.validation && errors.validation.role && true
                      }
                    >
                      <option>Choose...</option>
                      <option value="student">Student</option>
                      <option value="faculty">Faculty</option>
                      <option value="coordinator">Coordinator</option>
                    </FormSelect>
                    {errors.validation && errors.validation.role && (
                      <FormFeedback>
                        {errors.validation && errors.validation.role}
                      </FormFeedback>
                    )}
                  </Col>
                  <Col md="6">
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
                        {errors.validation && errors.validation.enrollmentNo}
                      </FormFeedback>
                    )}
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
                      onChange={e => setName(e.target.value)}
                      required
                      invalid={
                        errors.validation && errors.validation.name && true
                      }
                    />
                    {errors.validation && errors.validation.name && (
                      <FormFeedback>
                        {errors.validation && errors.validation.name}
                      </FormFeedback>
                    )}
                  </Col>
                  <Col md="6">
                    <label htmlFor="feFatherName">Father Name</label>
                    <FormInput
                      id="feFatherName"
                      type="text"
                      placeholder="FatherName"
                      value={fatherName}
                      onChange={e => setFatherName(e.target.value)}
                      required
                      invalid={
                        errors.validation &&
                        errors.validation.fatherName &&
                        true
                      }
                    />
                    {errors.validation && errors.validation.fatherName && (
                      <FormFeedback>
                        {errors.validation && errors.validation.fatherName}
                      </FormFeedback>
                    )}
                  </Col>
                </Row>
                {role === "student" ? (
                  <>
                    <Row form>
                      <Col md="6" className="form-group">
                        <label htmlFor="feProgram">Program</label>

                        <Program
                          program={program}
                          setProgram={setProgram}
                          errors={errors}
                        />

                        {errors.validation && errors.validation.program && (
                          <FormFeedback>
                            {errors.validation && errors.validation.program}
                          </FormFeedback>
                        )}
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
                          onChange={e => setDegreeDuration(e.target.value)}
                          required
                          invalid={
                            errors.validation &&
                            errors.validation.degreeDuration &&
                            true
                          }
                        />
                        {errors.validation &&
                          errors.validation.degreeDuration && (
                            <FormFeedback>
                              {errors.validation &&
                                errors.validation.degreeDuration}
                            </FormFeedback>
                          )}
                      </Col>
                    </Row>
                    <Row form>
                      <Col md="6" className="form-group">
                        <label htmlFor="feIntakeSemester">Batch</label>
                        <Batch
                          batch={intakeSemester}
                          setBatch={setIntakeSemester}
                          errors={errors}
                        />
                      </Col>
                      <Col md="6">
                        <label htmlFor="feMaxSemester">Max Semester</label>
                        <FormInput
                          id="feMax Semester"
                          type="number"
                          placeholder="Max Semester"
                          value={maxSemester}
                          onChange={e => setMaxSemester(e.target.value)}
                          required
                          invalid={
                            errors.validation &&
                            errors.validation.maxSemester &&
                            true
                          }
                        />
                        {errors.validation && errors.validation.maxSemester && (
                          <FormFeedback>
                            {errors.validation && errors.validation.maxSemester}
                          </FormFeedback>
                        )}
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
                      onChange={e => setMobile(e.target.value)}
                      required
                      invalid={
                        errors.validation && errors.validation.mobile && true
                      }
                    />
                    {errors.validation && errors.validation.mobile && (
                      <FormFeedback>
                        {errors.validation && errors.validation.mobile}
                      </FormFeedback>
                    )}
                  </Col>
                  <Col md="6">
                    <label htmlFor="fePhoneNumber">Phone number</label>
                    <FormInput
                      id="fePhoneNumber"
                      type="number"
                      placeholder="Phone Number"
                      value={contact}
                      onChange={e => setContact(e.target.value)}
                      required
                      invalid={
                        errors.validation && errors.validation.contact && true
                      }
                    />
                    {errors.validation && errors.validation.contact && (
                      <FormFeedback>
                        {errors.validation && errors.validation.contact}
                      </FormFeedback>
                    )}
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
                      onChange={e => setPersonalEmail(e.target.value)}
                      required
                      invalid={
                        errors.validation &&
                        errors.validation.personalEmail &&
                        true
                      }
                    />
                    {errors.validation && errors.validation.personalEmail && (
                      <FormFeedback>
                        {errors.validation && errors.validation.personalEmail}
                      </FormFeedback>
                    )}
                  </Col>
                  <Col md="6">
                    <label htmlFor="fePhoneNumber">University Email</label>
                    <FormInput
                      id="feUniversityEmail"
                      type="email"
                      placeholder="University Email"
                      value={universityEmail}
                      onChange={e => setUniversityEmail(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6">
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
                      <FormFeedback>
                        {errors.validation && errors.validation.password}
                      </FormFeedback>
                    )}
                  </Col>
                  <Col md="6">
                    <label htmlFor="feConfirmPassword">Confirm Password</label>
                    <FormInput
                      id="feConfirmPassword"
                      type="password"
                      placeholder="ConfirmPassword"
                      value={passwordConfirm}
                      onChange={e => setPasswordConfirm(e.target.value)}
                      required
                      invalid={
                        errors.validation &&
                        errors.validation.passwordConfirm &&
                        true
                      }
                    />
                    {errors.validation && errors.validation.passwordConfirm && (
                      <FormFeedback>
                        {errors.validation && errors.validation.passwordConfirm}
                      </FormFeedback>
                    )}
                  </Col>
                </Row>
                <br />
                <FormGroup>
                  <label htmlFor="feInputAddress">Current Address</label>
                  <FormInput
                    id="feInputAddress"
                    placeholder="1234 Main St"
                    value={currentAddress}
                    onChange={e => setCurrentAddress(e.target.value)}
                    required
                    invalid={
                      errors.validation &&
                      errors.validation.currentAddress &&
                      true
                    }
                  />
                  {errors.validation && errors.validation.currentAddress && (
                    <FormFeedback>
                      {errors.validation && errors.validation.currentAddress}
                    </FormFeedback>
                  )}
                </FormGroup>

                <FormGroup>
                  <label htmlFor="feInputAddress2">Permanent Address</label>
                  <FormInput
                    id="feInputAddress2"
                    placeholder="Apartment, Studio or Floor"
                    value={permanentAddress}
                    onChange={e => setPermanentAddress(e.target.value)}
                    required
                    invalid={
                      errors.validation &&
                      errors.validation.permanentAddress &&
                      true
                    }
                  />
                  {errors.validation && errors.validation.permanentAddress && (
                    <FormFeedback>
                      {errors.validation && errors.validation.permanentAddress}
                    </FormFeedback>
                  )}
                </FormGroup>
                <Button type="button" onClick={e => registerUserFunc(e)}>
                  Create New Account
                </Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
      <Modal open={messageModal} toggle={() => setMessageModal(!messageModal)}>
        <ModalBody>
          <div className="d-flex justify-content-center align-items-center flex-column register-success-message">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            <h4 className="mt-4">You have successfully registered</h4>
            <span className="mb-3">Please wait for approval</span>
            <Link to="/">
              <Button>Home</Button>
            </Link>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default RegistrationFrom;
