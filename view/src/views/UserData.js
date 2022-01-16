import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  FormRadio,
  Modal,
  Button,
  FormInput,
  Container,
  CardBody
} from "shards-react";
// Page Title
import PageTitle from "../components/common/PageTitle";
// Check User Details
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
// Program
import Program from "../utils/Program";
import Batch from "../utils/Batch";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

// action
import { studentData, getPrograms, deleteUser } from "../actions/authActions";
// Loader
import Loader from "../utils/Loader";
// Icon
import eyeIcon from "../images/eye.png";
const UserData = props => {
  const [enrollment, setEnrollment] = useState("");
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [userProgram, setUserProgram] = useState("");
  const [batch, setBatch] = useState("");
  const [searchBy, setSearchBy] = useState("enrollment");
  const userData = useSelector(state => state.auth.studentData);
  const loading = useSelector(state => state.auth.loading);
  const auth = useSelector(state => state.auth.user);

  // initialize useDispatch()
  const dispatch = useDispatch();
  // Get Student Data
  const searchStudent = () => {
    dispatch(
      studentData({
        enrollment: enrollment.toLowerCase(),
        program: undefined,
        batch: undefined,
        role: "student",
        type: "single"
      })
    );
  };
  // search user by Program
  const searchStudentByProgram = () => {
    dispatch(
      studentData({
        program: userProgram.toLowerCase(),
        batch: batch.toLowerCase(),
        enrollmentNo: "Null",
        role: "student",
        type: "multiple"
      })
    );
  };
  // useEffect
  useEffect(() => {
    setUsers(userData);
  }, [userData]);

  useEffect(() => {
    setData({});
    setUsers([]);
    dispatch(getPrograms());
  }, []);

  return (
    <Container fluid className="main-content-container p-4 complain-page">
      <Row noGutters className="page-header pb-4">
        <PageTitle
          title="Student"
          subtitle="Records"
          md="12"
          className="ml-sm-auto mr-sm-auto"
        />
      </Row>
      <Card small className="h-100 p-4">
        <Row className="mb-3">
          <Col
            md="3"
            sm="3"
            xs="4"
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
              checked={searchBy === "program"}
              onChange={e => setSearchBy("program")}
            >
              Program
            </FormRadio>
          </Col>
        </Row>

        {searchBy === "enrollment" ? (
          <Row>
            <Col sm="4">
              <FormInput
                id="feEnrollment"
                type="text"
                placeholder="Enrollment No"
                value={enrollment}
                onChange={e => setEnrollment(e.target.value)}
              />
            </Col>
            <Col sm="2" xs="3" className="mt-sm">
              <Button size="md" onClick={() => searchStudent()}>
                Search
              </Button>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col sm="4" xs="4">
              <Program program={userProgram} setProgram={setUserProgram} />
            </Col>
            <Col sm="4" xs="4">
              <Batch batch={batch} setBatch={setBatch} />
            </Col>
            <Col sm="2" xs="2">
              <Button size="md" onClick={() => searchStudentByProgram()}>
                Search
              </Button>
            </Col>
          </Row>
        )}
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
                  Father Name
                </th>
                <th scope="col" className="border-0">
                  Username
                </th>

                <th scope="col" className="border-0">
                  Email
                </th>

                <th scope="col" className="border-0">
                  Action
                </th>
                {auth.role === "admin" ? (
                  <th scope="col" className="border-0">
                    Delete User
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {users.filter(user => user.role === "student").length > 0 ? (
                users
                  .filter(user => user.role === "student")
                  .map((user, i) => (
                    <tr key={user._id}>
                      <td>{i + 1}</td>
                      <td>{capitalizeFirstLetter(user.name)}</td>
                      <td>{capitalizeFirstLetter(user.fatherName)}</td>
                      <td>{user.enrollmentNo}</td>
                      <td>
                        {user.personalEmail
                          ? user.personalEmail
                          : user.universityEmail}
                      </td>
                      <td>
                        <span
                          className="view-detail-icon"
                          onClick={() => {
                            setData(user);
                            setModal(true);
                          }}
                        >
                          <img src={eyeIcon} alt="eye" width="18px" />
                        </span>
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
      {loading === true ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : null}
    </Container>
  );
};
export default UserData;
