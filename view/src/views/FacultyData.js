import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  Button,
  FormInput,
  Modal,
  ModalHeader,
  FormCheckbox,
  ModalBody,
  FormRadio,
  FormSelect,
  Container,
  CardBody
} from "shards-react";

// Page title
import PageTitle from "../components/common/PageTitle";
// check user detail
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";

// action
import {
  studentData,
  assignPermission,
  getAllUser,
  changeUserRole,
  deleteUser,
  getDesignations
} from "../actions/authActions";
// loader
import Loader from "../utils/Loader";

const FacultyData = props => {
  const [enrollment, setEnrollment] = useState("");
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [CSP, setCSP] = useState({ read: false, write: false });
  const [PEC, setPEC] = useState({ read: false, write: false });
  const [NEWS, setNEWS] = useState({ read: false, write: false });
  const [INTERNSHIP, setINTERNSHIP] = useState({ read: false, write: false });
  const [FYP, setFYP] = useState({ read: false, write: false });
  const [TEAM, setTEAM] = useState({ read: false, write: false });
  const [permissionModal, setPermissionModal] = useState(false);
  const [searchBy, setSearchBy] = useState("enrollment");
  const [yearofJoining, setYearofJoining] = useState("");
  const [designation, setDesignation] = useState("");
  const [designationDropDown, setDesignationDropDown] = useState(false);

  const userData = useSelector(state => state.auth.studentData);
  const auth = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);
  const designations = useSelector(state => state.auth.designations);
  console.log(designations);
  // initialize useDispatch()
  const dispatch = useDispatch();
  // Get Student Data
  const searchStudent = () => {
    dispatch(
      studentData({
        enrollment: enrollment.toLowerCase(),
        program: undefined,
        batch: undefined,
        role: "faculty",
        type: "multiple",
        yearofJoining: yearofJoining * 1,
        designation: designation
      })
    );
  };
  //  useEffect
  useEffect(() => {
    dispatch(getDesignations());
  }, []);
  useEffect(() => {
    setUsers(userData);
  }, [userData]);
  // set permission modal to true and set states
  const handlePermissionModal = user => {
    setData(user);
    setPermissionModal(true);
    setCSP({ ...user.permissions.CSP });
    setPEC({ ...user.permissions.PEC });
    setNEWS({ ...user.permissions.NEWS });
    setINTERNSHIP({ ...user.permissions.INTERNSHIP });
    setFYP({ ...user.permissions.FYP });
    setTEAM({ ...user.permissions.TEAM });
  };
  // handle check box
  const handleCheckBox = (permissionFor, permissionType) => {
    if (permissionFor === "CSP") {
      if (permissionType === "read") {
        const cspObj = { ...CSP };
        cspObj.read = !CSP.read;
        setCSP({ ...cspObj });
      } else {
        const cspObj = { ...CSP };
        cspObj.write = !CSP.write;
        setCSP({ ...cspObj });
      }
    } else if (permissionFor === "PEC") {
      if (permissionType === "read") {
        const pecObj = { ...PEC };
        pecObj.read = !PEC.read;
        setPEC({ ...pecObj });
      } else {
        const pecObj = { ...PEC };
        pecObj.write = !PEC.write;
        setPEC({ ...pecObj });
      }
    } else if (permissionFor === "NEWS") {
      if (permissionType === "read") {
        const newsObj = { ...NEWS };
        newsObj.read = !NEWS.read;
        setNEWS({ ...newsObj });
      } else {
        const newsObj = { ...NEWS };
        newsObj.write = !NEWS.write;
        setNEWS({ ...newsObj });
      }
    } else if (permissionFor === "INTERNSHIP") {
      if (permissionType === "read") {
        const newsObj = { ...INTERNSHIP };
        newsObj.read = !INTERNSHIP.read;
        setINTERNSHIP({ ...newsObj });
      } else {
        const newsObj = { ...INTERNSHIP };
        newsObj.write = !INTERNSHIP.write;
        setINTERNSHIP({ ...newsObj });
      }
    } else if (permissionFor === "FYP") {
      if (permissionType === "read") {
        const newsObj = { ...FYP };
        newsObj.read = !FYP.read;
        setFYP({ ...newsObj });
      } else {
        const newsObj = { ...FYP };
        newsObj.write = !FYP.write;
        setFYP({ ...newsObj });
      }
    } else if (permissionFor === "TEAM") {
      if (permissionType === "read") {
        const newsObj = { ...TEAM };
        newsObj.read = !TEAM.read;
        setTEAM({ ...newsObj });
      } else {
        const newsObj = { ...TEAM };
        newsObj.write = !TEAM.write;
        setTEAM({ ...newsObj });
      }
    }
  };
  // assign permissions
  const handleAssignPermission = () => {
    const perObj = {
      id: data._id,
      permissions: {
        CSP: {
          read: CSP.read,
          write: CSP.write
        },
        PEC: {
          read: PEC.read,
          write: PEC.write
        },
        NEWS: {
          read: NEWS.read,
          write: NEWS.write
        },
        INTERNSHIP: {
          read: INTERNSHIP.read,
          write: INTERNSHIP.write
        },
        FYP: {
          read: FYP.read,
          write: FYP.write
        },
        TEAM: {
          read: TEAM.read,
          write: TEAM.write
        }
      }
    };
    dispatch(assignPermission(perObj, clearState));
  };

  const clearState = () => {
    setPermissionModal(false);
  };
  return (
    <Container fluid className="main-content-container p-4 complain-page">
      <Row noGutters className="page-header pb-4">
        <PageTitle
          title="Faculty"
          subtitle="Record"
          md="12"
          className="ml-sm-auto mr-sm-auto"
        />
      </Row>
      <Card small className="h-100 p-4">
        <Row className="mb-3">
          <Col
            md="3"
            sm="3"
            xs="12"
            className="d-flex justify-content-center align-items-center"
          >
            <h5 className="m-0">Search By</h5>
          </Col>

          <Col
            md="2"
            sm="3"
            xs="4"
            className="d-flex justify-content-center align-items-center"
          >
            <FormRadio
              checked={searchBy === "enrollment"}
              onChange={e => setSearchBy("enrollment")}
            >
              Enrollment
            </FormRadio>
          </Col>
          <Col
            md="2"
            sm="3"
            xs="4"
            className="d-flex justify-content-center align-items-center"
          >
            <FormRadio
              checked={searchBy === "designation"}
              onChange={e => setSearchBy("designation")}
            >
              Designation
            </FormRadio>
          </Col>
          <Col
            md="2"
            sm="3"
            xs="4"
            className="d-flex justify-content-center align-items-center"
          >
            <FormRadio
              checked={searchBy === "yearofjoining"}
              onChange={e => setSearchBy("yearofjoining")}
            >
              Joining Year
            </FormRadio>
          </Col>
        </Row>
        <Row>
          <Col sm="4">
            {searchBy === "yearofjoining" ? (
              <FormSelect
                id="feInputState"
                value={yearofJoining}
                onChange={e => setYearofJoining(e.target.value)}
              >
                <option value="">Choose...</option>
                <option value="1990">1990</option>
                <option value="1991">1991</option>
                <option value="1992">1992</option>
                <option value="1993">1993</option>
                <option value="1994">1994</option>
                <option value="1995">1995</option>
                <option value="1996">1996</option>
                <option value="1997">1997</option>
                <option value="1998">1998</option>
                <option value="1999">1999</option>
                <option value="2000">2000</option>
                <option value="2001">2001</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
                <option value="2010">2010</option>
                <option value="2011">2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
              </FormSelect>
            ) : null}

            {searchBy === "enrollment" ? (
              <FormInput
                id="feEnrollment"
                type="text"
                placeholder="Enrollment No"
                value={enrollment}
                onChange={e => setEnrollment(e.target.value)}
              />
            ) : null}
            {searchBy === "designation" ? (
              <>
                {/* <FormInput */}
                <FormInput
                  id="feEnrollment"
                  type="text"
                  placeholder="Designation"
                  value={designation}
                  onChange={e => setDesignation(e.target.value)}
                  onFocus={() => setDesignationDropDown(true)}
                />
                {/* <input  onFocusOut /> */}
                {designations.length > 0 &&
                designation.length > 0 &&
                designationDropDown === true &&
                designations.filter(
                  design => design.designation.indexOf(designation) !== -1
                ).length > 0 ? (
                  <div className="user-filter-div">
                    {designations
                      .filter(
                        design => design.designation.indexOf(designation) !== -1
                      )
                      .filter(
                        (design, i, arrayDesignations) =>
                          arrayDesignations.findIndex(
                            designs =>
                              designs.designation === design.designation
                          ) === i
                      )
                      .map(design => (
                        <p
                          key={design._id}
                          style={{
                            margin: "5px 0 0 0",
                            cursor: "pointer"
                          }}
                          // onBlur={() => }
                          onClick={() => {
                            setDesignation(design.designation);
                            setDesignationDropDown(false);
                            // setEnrollmentNo(user.enrollmentNo);
                            // addMembers(
                            //   user.enrollmentNo,
                            //   i,
                            //   "enrollment"
                            // );
                          }}
                        >
                          {design.designation}
                        </p>
                      ))}
                  </div>
                ) : null}
              </>
            ) : null}
          </Col>
          <Col sm="2" className="mt-sm">
            <Button size="md" onClick={() => searchStudent()}>
              Search
            </Button>
          </Col>
          <Col sm="3" className="mt-sm">
            <Button
              size="md"
              className="btn btn-secondary"
              onClick={() => dispatch(getAllUser("faculty"))}
            >
              Get All
            </Button>
          </Col>
        </Row>
        <CardBody>
          <table className="table my-4">
            <thead className="bg-light">
              <tr>
                <th scope="col" className="border-0">
                  Sr#
                </th>
                <th scope="col" className="border-0">
                  Name
                </th>

                <th scope="col" className="border-0">
                  Username
                </th>

                <th scope="col" className="border-0">
                  Contact
                </th>

                <th scope="col" className="border-0">
                  Designation
                </th>
                <th scope="col" className="border-0">
                  Year of Joining
                </th>
                <th scope="col" className="border-0">
                  Permission
                </th>
                {auth.role === "admin" ? (
                  <th scope="col" className="border-0">
                    Delete User
                  </th>
                ) : null}

                {auth.role === "admin" ? (
                  <th scope="col" className="border-0">
                    Change Role
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {users.filter(user => user.role === "faculty").length > 0 ? (
                users
                  .filter(user => user.role === "faculty")
                  .map((user, i) => (
                    <tr key={user._id}>
                      <td>{i + 1}</td>
                      <td>{user.name}</td>

                      <td>{user.enrollmentNo}</td>
                      <td>{user.contact ? user.contact : user.mobile}</td>
                      <td>{user.designation}</td>
                      <td>{user.yearofJoining ? user.yearofJoining : "NIL"}</td>
                      <td>
                        <Button onClick={() => handlePermissionModal(user)}>
                          Permissions
                        </Button>
                      </td>
                      {auth.role === "admin" ? (
                        <td>
                          <Button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "If you want to delete User then press OK"
                                )
                              ) {
                                dispatch(deleteUser(user._id));
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      ) : null}
                      {auth.role === "admin" ? (
                        <td>
                          {user.role === "faculty" ? (
                            <div className="d-flex justify-content-center align-items-center">
                              <Button
                                className="mr-2 btn btn-secondary"
                                onClick={() =>
                                  dispatch(
                                    changeUserRole({
                                      id: user._id,
                                      role: "admin"
                                    })
                                  )
                                }
                              >
                                Admin
                              </Button>
                              <Button
                                className="btn btn-light"
                                onClick={() =>
                                  dispatch(
                                    changeUserRole({
                                      id: user._id,
                                      role: "coordinator"
                                    })
                                  )
                                }
                              >
                                Coordinator
                              </Button>
                            </div>
                          ) : null}
                          {user.role === "coordinator" ? (
                            <div className="d-flex justify-content-center align-items-center">
                              <Button
                                className="mr-2 btn btn-secondary"
                                onClick={() =>
                                  dispatch(
                                    changeUserRole({
                                      id: user._id,
                                      role: "admin"
                                    })
                                  )
                                }
                              >
                                Admin
                              </Button>
                              <Button
                                className="btn btn-light"
                                onClick={() =>
                                  dispatch(
                                    changeUserRole({
                                      id: user._id,
                                      role: "faculty"
                                    })
                                  )
                                }
                              >
                                Faculty
                              </Button>
                            </div>
                          ) : null}
                          {user.role === "admin" ? (
                            <div className="d-flex justify-content-center align-items-center">
                              <Button
                                className="mr-2 btn btn-secondary"
                                onClick={() =>
                                  dispatch(
                                    changeUserRole({
                                      id: user._id,
                                      role: "faculty"
                                    })
                                  )
                                }
                              >
                                Faculty
                              </Button>
                              <Button
                                className="btn btn-light"
                                onClick={() =>
                                  dispatch(
                                    changeUserRole({
                                      id: user._id,
                                      role: "coordinator"
                                    })
                                  )
                                }
                              >
                                Coordinator
                              </Button>
                            </div>
                          ) : null}
                        </td>
                      ) : null}
                    </tr>
                  ))
              ) : (
                <tr>
                  <td className="p-4 m-0 border-0">No Record</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Modal open={modal} toggle={() => setModal(!modal)}>
        <UserAccountDetails profile={data} />
      </Modal>

      <Modal
        open={permissionModal}
        toggle={() => setPermissionModal(!permissionModal)}
      >
        <ModalHeader>
          <h3>Permissions</h3>
        </ModalHeader>
        <ModalBody>
          <Row className="mb-4">
            <Col md="4">{data && data.name}</Col>
            <Col md="4">{data.enrollmentNo}</Col>
            <Col md="4">{data.role}</Col>
          </Row>
          <Row className="pt-2">
            <Col md="6">
              <h5>CSP Coordinator Block</h5>
            </Col>
            <Col md="3">
              {" "}
              <FormCheckbox
                checked={CSP.read}
                onChange={e => handleCheckBox("CSP", "read")}
              >
                read
              </FormCheckbox>
            </Col>
            <Col md="3">
              <FormCheckbox
                checked={CSP.write}
                onChange={e => handleCheckBox("CSP", "write")}
              >
                write
              </FormCheckbox>
            </Col>
          </Row>
          <Row className="pt-2">
            <Col md="6">
              <h5>PEC Coordinator Block</h5>
            </Col>
            <Col md="3">
              {" "}
              <FormCheckbox
                checked={PEC.read}
                onChange={e => handleCheckBox("PEC", "read")}
              >
                read
              </FormCheckbox>
            </Col>
            <Col md="3">
              <FormCheckbox
                checked={PEC.write}
                onChange={e => handleCheckBox("PEC", "write")}
              >
                write
              </FormCheckbox>
            </Col>
          </Row>
          <Row className="pt-2">
            <Col md="6">
              <h5>News Block</h5>
            </Col>
            <Col md="3">
              {" "}
              <FormCheckbox
                checked={NEWS.read}
                onChange={e => handleCheckBox("NEWS", "read")}
              >
                read
              </FormCheckbox>
            </Col>
            <Col md="3">
              <FormCheckbox
                checked={NEWS.write}
                onChange={e => handleCheckBox("NEWS", "write")}
              >
                write
              </FormCheckbox>
            </Col>
          </Row>
          <Row className="pt-2">
            <Col md="6">
              <h5>Internship Coordinator Block</h5>
            </Col>
            <Col md="3">
              {" "}
              <FormCheckbox
                checked={INTERNSHIP.read}
                onChange={e => handleCheckBox("INTERNSHIP", "read")}
              >
                read
              </FormCheckbox>
            </Col>
            <Col md="3">
              <FormCheckbox
                checked={INTERNSHIP.write}
                onChange={e => handleCheckBox("INTERNSHIP", "write")}
              >
                write
              </FormCheckbox>
            </Col>
          </Row>
          <Row className="pt-2">
            <Col md="6">
              <h5>FYP Coordinator Block</h5>
            </Col>
            <Col md="3">
              {" "}
              <FormCheckbox
                checked={FYP.read}
                onChange={e => handleCheckBox("FYP", "read")}
              >
                read
              </FormCheckbox>
            </Col>
            <Col md="3">
              <FormCheckbox
                checked={FYP.write}
                onChange={e => handleCheckBox("FYP", "write")}
              >
                write
              </FormCheckbox>
            </Col>
          </Row>
          <Row className="pt-2">
            <Col md="6">
              <h5>Team Creation</h5>
            </Col>
            <Col md="3">
              {" "}
              <FormCheckbox
                checked={FYP.read}
                onChange={e => handleCheckBox("TEAM", "read")}
              >
                read
              </FormCheckbox>
            </Col>
            <Col md="3">
              <FormCheckbox
                checked={FYP.write}
                onChange={e => handleCheckBox("TEAM", "write")}
              >
                write
              </FormCheckbox>
            </Col>
          </Row>
          <Button className="my-2" onClick={() => handleAssignPermission()}>
            Assign
          </Button>
        </ModalBody>
      </Modal>
      {loading === true ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : null}
    </Container>
  );
};
export default FacultyData;
