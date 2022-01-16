import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardHeader,
  Card,
  FormSelect,
  FormInput,
  Button,
  FormFeedback
} from "shards-react";

import { useDispatch, useSelector } from "react-redux";
// page title
import PageTitle from "../components/common/PageTitle";
import Batch from "../utils/Batch";
// action
import {
  getMember,
  getTeamsNames,
  addMember,
  deleteMember
} from "../actions/team";
import { studentData } from "../actions/authActions";
// loader
import Loader from "../utils/Loader";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const TeamMembers = props => {
  const [teamName, setTeamName] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [userTeamName, setUserTeamName] = useState("");

  const [designation, setDesignation] = useState("");
  const [user, setUser] = useState([]);
  const [batch, setBatch] = useState("");
  const [errors, setErrors] = useState({});

  // get State from store
  const loading = useSelector(state => state.team.loading);
  const members = useSelector(state => state.team.members);
  const teamsNames = useSelector(state => state.team.teamsNames);
  const userData = useSelector(state => state.auth.studentData);
  const auth = useSelector(state => state.auth.user);
  const errorsFromStore = useSelector(state => state.errors);
  // initialize useDispatch
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    setErrors(errorsFromStore);
  }, [errorsFromStore]);

  useEffect(() => {
    setUser(userData);
  }, [userData.length]);
  useEffect(() => {
    dispatch(getTeamsNames());
  }, []);
  // search member
  const searchMember = e => {
    dispatch(
      getMember({
        teamName: teamName.toLowerCase(),
        batch: batch.toLowerCase()
      })
    );
  };
  // delete member
  const deleteMemberFunc = (teamID, memberID) => {
    if (window.confirm("If you want to delete Team Member then Press OK")) {
      dispatch(
        deleteMember({
          teamName,
          batch: batch.toLowerCase(),
          teamID,
          memberID
        })
      );
    }
  };
  // search user to add in member
  const searchUser = () => {
    dispatch(
      studentData({
        enrollment: enrollment.toLowerCase(),
        program: "Null",
        batch: "Null",
        type: "single"
      })
    );
  };
  // add member
  const addMemberFunc = e => {
    const member = {
      id: userTeamName,
      member: {
        name: userData[0].name,
        enrollmentNo: userData[0].enrollmentNo,
        personalEmail: userData[0].personalEmail,
        phone: userData[0].mobile,
        program: userData[0].program,
        batch: userData[0].batch,
        designation: designation.toLowerCase(),
        memberAddedBy: {
          name: auth.name,
          enrollmentNo: auth.enrollmentNo
        }
      }
    };
    dispatch(addMember(member, clearState));
  };
  // clear state
  const clearState = () => {
    setDesignation("");
    setUser([]);
    setEnrollment("");
  };
  return (
    <Container fluid className="main-content-container px-4 pb-4 complain-page">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Team Member"
          subtitle="Members"
          className="text-sm-left"
        />
      </Row>
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader>
              <Row className="mb-2">
                <Col md="3">
                  <FormSelect
                    value={capitalizeFirstLetter(teamName)}
                    onChange={e => setTeamName(e.target.value)}
                  >
                    {teamsNames.length > 0 ? (
                      <>
                        <option>Choose Name...</option>
                        {teamsNames.map(name => (
                          <option key={name._id} value={name._id}>
                            {capitalizeFirstLetter(name.teamName)}
                          </option>
                        ))}
                      </>
                    ) : (
                      <option>Loading...</option>
                    )}
                  </FormSelect>
                </Col>
                <Col md="3" className="mt-md">
                  <Batch batch={batch} setBatch={setBatch} />
                </Col>
                <Col md="1" className="mt-md">
                  <Button type="button" onClick={e => searchMember(e)}>
                    Search
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Sr#
                    </th>
                    <th scope="col" className="border-0">
                      name
                    </th>
                    {/* <th scope="col" className="border-0">
                      Assignment
                    </th> */}
                    <th scope="col" className="border-0">
                      Enrollment
                    </th>
                    <th scope="col" className="border-0">
                      personalEmail
                    </th>

                    <th scope="col" className="border-0">
                      phone
                    </th>

                    <th scope="col" className="border-0">
                      designation
                    </th>
                    {auth.role === "coordinator" || auth.role === "admin" ? (
                      <th scope="col" className="border-0">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {members.length > 0 ? (
                    members.map((team, i) =>
                      team.members.length > 0 ? (
                        team.members.map((member, index) => (
                          <tr key={member._id}>
                            <td>{index + 1}</td>
                            <td>{capitalizeFirstLetter(member.name)}</td>
                            <td>{member.enrollmentNo}</td>
                            <td>
                              {member.personalEmail
                                ? member.personalEmail
                                : "Nil"}
                            </td>
                            <td>{member.phone ? member.phone : "Nil"}</td>
                            <td>
                              {member.designation
                                ? capitalizeFirstLetter(member.designation)
                                : "Nil"}
                            </td>
                            {(member.memberAddedBy &&
                              member.memberAddedBy.enrollmentNo ===
                                auth.enrollment) ||
                            auth.role === "admin" ? (
                              <td>
                                <Button
                                  className="btn btn-danger"
                                  onClick={() =>
                                    deleteMemberFunc(team._id, member._id)
                                  }
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
                      )
                    )
                  ) : (
                    <tr>
                      <td className="p-4 m-0 border-0">No Record</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {auth.role !== "student" ? (
        <>
          <Row noGutters className="page-header pb-4">
            <PageTitle
              title="Add Member"
              subtitle="Members"
              md="12"
              className="ml-sm-auto mr-sm-auto"
            />
          </Row>
          <Card small className="h-100 p-4">
            {" "}
            {/* <CardHeader className="border-bottom"> */}
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
              <Col sm="2">
                <Button
                  size="md"
                  onClick={() => searchUser()}
                  // className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
                >
                  Search
                </Button>
              </Col>
            </Row>
            <CardBody className="pt-0 ">
              <table className="my-4">
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
                      Program
                    </th>
                    <th scope="col" className="border-0">
                      Batch
                    </th>

                    <th scope="col" className="border-0">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user.length > 0 ? (
                    user.map((user, i) => (
                      <tr key={user._id}>
                        <td>{i + 1}</td>
                        <td>{capitalizeFirstLetter(user.name)}</td>

                        <td>{user.enrollmentNo}</td>
                        <td>{user.program ? user.program : "Nil"}</td>
                        <td>{user.batch ? user.batch : "Nil"}</td>
                        <td>
                          {user.personalEmail
                            ? user.personalEmail
                            : user.universityEmail}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="p-4 m-0 border-0">No Record</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* </CardHeader> */}
            </CardBody>
            <Row className="my-3 border-top py-3">
              <Col md="3">
                <label>Team Name </label>
                <FormSelect
                  value={capitalizeFirstLetter(userTeamName)}
                  onChange={e => setUserTeamName(e.target.value)}
                  required
                  invalid={errors.validation && errors.validation.id && true}
                >
                  {teamsNames.length > 0 ? (
                    <>
                      <option>Choose Name...</option>
                      {teamsNames.map(name => (
                        <option key={name._id} value={name._id}>
                          {capitalizeFirstLetter(name.teamName)}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option>Loading...</option>
                  )}
                </FormSelect>
                {errors.validation && errors.validation.id && (
                  <FormFeedback className="mb-2">
                    {errors.validation.id}
                  </FormFeedback>
                )}
              </Col>

              <Col md="3" className="mt-md">
                <label>Designation </label>
                <FormInput
                  type="text"
                  placeholder="designation"
                  value={designation}
                  onChange={e => setDesignation(e.target.value)}
                  required
                  invalid={
                    errors.validation && errors.validation.designation && true
                  }
                />
                {errors.validation && errors.validation.designation && (
                  <FormFeedback className="mb-2">
                    {errors.validation.designation}
                  </FormFeedback>
                )}
              </Col>
              {enrollment.length > 0 && userData.length > 0 ? (
                <Col md="2" className="position-relative">
                  <Button
                    type="button"
                    style={{ position: "absolute", bottom: "2px" }}
                    onClick={e => addMemberFunc(e)}
                  >
                    Add Member
                  </Button>
                </Col>
              ) : null}
            </Row>
          </Card>
        </>
      ) : null}
      {loading === true ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : null}
    </Container>
  );
};
export default TeamMembers;
