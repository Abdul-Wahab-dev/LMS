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
  Form,
  FormFeedback
} from "shards-react";

import { useDispatch, useSelector } from "react-redux";
// page title
import PageTitle from "../components/common/PageTitle";
// Program
import Program from "../utils/Program";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
// action
import {
  getTeamAssignments,
  getTeamsNames,
  createTeamAssignment,
  deleteAssignment
} from "../actions/team";
// loader
import Loader from "../utils/Loader";
// custom file uploader
import CustomFileUpload from "../components/components-overview/CustomFileUpload";
// download file on click function
import downloadFile from "../utils/downloadFile";
// Batch
import Batch from "../utils/Batch";

const TeamAssignments = props => {
  const [program, setProgram] = useState("");
  const [batch, setBatch] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState({});
  const [teamName, setTeamName] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [errors, setErrors] = useState({});
  // get state from store
  const loading = useSelector(state => state.team.loading);
  const team = useSelector(state => state.team.assignments);
  const teamsNames = useSelector(state => state.team.teamsNames);
  const auth = useSelector(state => state.auth.user);
  const errorsFromStore = useSelector(state => state.errors);
  // initialize useDispatch()
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    setErrors(errorsFromStore);
  }, [errorsFromStore]);

  useEffect(() => {
    dispatch(getTeamsNames());
    dispatch(getTeamAssignments());
  }, []);
  // get formate date
  const getFullyFormateDate = fullDate => {
    const date = new Date(fullDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}-${month + 1}-${year}`;
  };
  // create assignment
  const CreateAssignmentFunc = e => {
    const assi = {
      id: teamName,
      assignment: {
        title,
        batch: batch.toLowerCase(),
        program: program.toLowerCase(),
        enrollmentNo: enrollmentNo.toLowerCase(),
        deadline: getFullyFormateDate(deadline),
        assignmentCreatedBy: {
          enrollmentNo: auth.enrollmentNo,
          name: auth.name
        }
      }
    };
    dispatch(createTeamAssignment(assi, file, clearState));
  };
  // clear State
  const clearState = () => {
    setTitle("");
    setProgram("");
    setBatch("");
    setDeadline("");
    setFile({});
    setTeamName("");
    setEnrollmentNo("");
  };
  // delete assignment
  const deleteAssignmentFunc = (teamID, assignmentID) => {
    if (window.confirm("If you want to delete Assignment then press OK")) {
      dispatch(deleteAssignment({ teamID, assignmentID }));
    }
  };
  return (
    <Container fluid className="main-content-container px-4 pb-4 complain-page">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Assignment"
          subtitle="Team"
          className="text-sm-left"
        />
      </Row>
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Assignments</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Sr#
                    </th>
                    <th scope="col" className="border-0">
                      Title
                    </th>
                    <th scope="col" className="border-0">
                      Assignment
                    </th>
                    <th scope="col" className="border-0">
                      Assignment From
                    </th>
                    {/* <th scope="col" className="border-0">
                      Remarks
                    </th> */}
                    <th scope="col" className="border-0">
                      Submission Date
                    </th>
                    <th scope="col" className="border-0">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {team.length > 0 ? (
                    team.map(team =>
                      team.assignment.length > 0 ? (
                        team.assignment.map((assignment, i) => (
                          <tr key={assignment._id}>
                            <td>{i + 1}</td>
                            <td id="download-file-team-assignment">
                              {assignment.fileName ? (
                                <span
                                  style={{
                                    cursor: "pointer",
                                    textDecoration: "underline"
                                  }}
                                  onClick={() =>
                                    downloadFile(
                                      "download-file-team-assignment",
                                      assignment.fileName
                                    )
                                  }
                                >
                                  {assignment.fileName}
                                </span>
                              ) : (
                                "No File"
                              )}
                            </td>
                            <td>{capitalizeFirstLetter(assignment.title)}</td>
                            <td>
                              {assignment.assignmentCreatedBy &&
                                capitalizeFirstLetter(
                                  assignment.assignmentCreatedBy.name
                                )}
                              <br />
                              {assignment.assignmentCreatedBy &&
                                assignment.assignmentCreatedBy.enrollmentNo}
                            </td>
                            <td>{assignment.deadline}</td>
                            <td>
                              {assignment.assignmentCreatedBy &&
                              auth.enrollmentNo ===
                                assignment.assignmentCreatedBy.enrollmentNo ? (
                                <Button
                                  className="btn btn-danger"
                                  onClick={() =>
                                    deleteAssignmentFunc(
                                      team._id,
                                      assignment._id
                                    )
                                  }
                                >
                                  Delete
                                </Button>
                              ) : null}
                            </td>
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
          {" "}
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="New Assignment"
              subtitle="Team"
              className="text-sm-left"
            />
          </Row>
          <Row>
            <Col lg="9" md="12">
              <Card small className="mb-3">
                <CardBody>
                  <Form>
                    <Row className="mb-3">
                      <Col md="4">
                        <label>Team Name </label>
                        <FormSelect
                          value={capitalizeFirstLetter(teamName)}
                          onChange={e => setTeamName(e.target.value)}
                          required
                          invalid={
                            errors.validation && errors.validation.id && true
                          }
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
                      <Col md="4"></Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md="4">
                        <label>Program</label>
                        <Program
                          program={program}
                          setProgram={setProgram}
                          errors={errors}
                        />
                      </Col>
                      <Col md="4" className="mt-md">
                        <label>Batch</label>
                        <Batch
                          batch={batch}
                          setBatch={setBatch}
                          errors={errors}
                        />
                      </Col>
                      <Col md="4" className="mt-md">
                        <label>Deadline</label>
                        <FormInput
                          type="date"
                          value={deadline}
                          onChange={e => setDeadline(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <label>Enrollment No</label>
                        <FormInput
                          type="text"
                          placeholder="Enrollment No"
                          value={enrollmentNo}
                          onChange={e => setEnrollmentNo(e.target.value)}
                          required
                          invalid={
                            errors.validation &&
                            errors.validation.enrollmentNo &&
                            true
                          }
                        />
                        {errors.validation &&
                          errors.validation.enrollmentNo && (
                            <FormFeedback className="mb-2">
                              {errors.validation.enrollmentNo}
                            </FormFeedback>
                          )}
                      </Col>
                      <Col md="4" className="mt-md">
                        <label>Title</label>
                        <FormInput
                          type="text"
                          placeholder="Title"
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                          required
                          invalid={
                            errors.validation && errors.validation.title && true
                          }
                        />
                        {errors.validation && errors.validation.title && (
                          <FormFeedback className="mb-2">
                            {errors.validation.title}
                          </FormFeedback>
                        )}
                      </Col>
                      <Col md="4" className="mt-md">
                        <label>File</label>
                        <CustomFileUpload file={file} setFile={setFile} />
                      </Col>
                    </Row>
                    <Button
                      type="button"
                      onClick={e => CreateAssignmentFunc(e)}
                    >
                      Create New
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
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
export default TeamAssignments;
