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
  Container,
  CardBody,
} from "shards-react";
// Page Title
import PageTitle from "../components/common/PageTitle";
// User data detail
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
// action
import {
  studentData,
  assignPermission,
  getAllUser,
  changeUserRole,
  deleteUser,
} from "../actions/authActions";
// loader
import Loader from "../utils/Loader";

const CoorData = (props) => {
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

  const userData = useSelector((state) => state.auth.studentData);
  const loading = useSelector((state) => state.auth.loading);
  const auth = useSelector((state) => state.auth.user);
  // initialize useDispatch
  const dispatch = useDispatch();
  // Get Student Data
  const searchStudent = (type) => {
    if (enrollment.length > 0 && type === "single") {
      dispatch(
        studentData({
          enrollment: enrollment.toLowerCase(),
          program: "null",
          batch: "null",
          role: "coordinator",
          type: "single",
        })
      );
    }
  };

  useEffect(() => {
    setUsers(userData);
  }, [userData]);
  // set permission modal to true and set states
  const handlePermissionModal = (user) => {
    setData(user);
    setPermissionModal(true);
    setCSP({ ...user.permissions.CSP });
    setPEC({ ...user.permissions.PEC });
    setNEWS({ ...user.permissions.NEWS });
    setINTERNSHIP({ ...user.permissions.INTERNSHIP });
    setFYP({ ...user.permissions.FYP });
    setTEAM({ ...user.permissions.TEAM });
  };
  // Handle Check box
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
        NEWS: {
          read: NEWS.read,
          write: NEWS.write,
        },
        FYP: {
          read: FYP.read,
          write: FYP.write,
        },
      },
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
          title="Coordinator"
          subtitle="Record"
          md="12"
          className="ml-sm-auto mr-sm-auto"
        />
      </Row>
      <Card small className="h-100 p-4">
        <Row>
          <Col sm="4">
            <FormInput
              id="feEnrollment"
              type="text"
              placeholder="username"
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
            />
          </Col>
          <Col sm="2" className="mt-sm">
            <Button size="md" onClick={() => searchStudent("single")}>
              Search
            </Button>
          </Col>
          <Col sm="3" className="mt-sm">
            <Button
              size="md"
              className="btn btn-secondary"
              onClick={() => dispatch(getAllUser("coordinator"))}
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
                  Email
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
              {users.filter(
                (user) =>
                  user.role !== "student" &&
                  user.role !== "faculty" &&
                  user.role !== "admin"
              ).length > 0 ? (
                users
                  .filter(
                    (user) =>
                      user.role !== "student" &&
                      user.role !== "faculty" &&
                      user.role !== "admin"
                  )
                  .map((user, i) => (
                    <tr key={user._id}>
                      <td>{i + 1}</td>
                      <td>{user.name}</td>

                      <td>{user.enrollmentNo}</td>
                      <td>{user.contact ? user.contact : user.mobile}</td>
                      <td>
                        {user.personalEmail
                          ? user.personalEmail
                          : user.universityEmail}
                      </td>
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
                                      role: "admin",
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
                                      role: "coordinator",
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
                                      role: "admin",
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
                                      role: "faculty",
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
                                      role: "faculty",
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
                                      role: "coordinator",
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
        <ModalHeader>Permissions</ModalHeader>
        <ModalBody>
          <Row className="mb-4">
            <Col md="4">{data && data.name && data.name}</Col>
            <Col md="4">{data.enrollmentNo}</Col>
            <Col md="4">{data.role}</Col>
          </Row>
          <Row className="pt-2">
            <Col md="6">
              <h5>News Block</h5>
            </Col>
            <Col md="3">
              {" "}
              <FormCheckbox
                checked={NEWS.read}
                onChange={(e) => handleCheckBox("NEWS", "read")}
              >
                read
              </FormCheckbox>
            </Col>
            <Col md="3">
              <FormCheckbox
                checked={NEWS.write}
                onChange={(e) => handleCheckBox("NEWS", "write")}
              >
                write
              </FormCheckbox>
            </Col>
          </Row>

          <Row className="pt-2">
            <Col md="6">
              <h5>FYP Block</h5>
            </Col>
            <Col md="3">
              {" "}
              <FormCheckbox
                checked={FYP.read}
                onChange={(e) => handleCheckBox("FYP", "read")}
              >
                read
              </FormCheckbox>
            </Col>
            <Col md="3">
              <FormCheckbox
                checked={FYP.write}
                onChange={(e) => handleCheckBox("FYP", "write")}
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
export default CoorData;
