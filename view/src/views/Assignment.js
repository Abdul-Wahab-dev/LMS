import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardHeader,
  Card,
  Modal,
  FormRadio,
  FormInput,
  Button,
  ModalBody,
  Form
} from "shards-react";
import { useDispatch, useSelector } from "react-redux";
// page title
import PageTitle from "../components/common/PageTitle";
import Program from "../utils/Program";
// action
import {
  getAssignments,
  createAssignment,
  deleteAssignment,
  addwork,
  addRemarks
} from "../actions/assignment";
// loader
import Loader from "../utils/Loader";
// custom file uploader
import CustomFileUpload from "../components/components-overview/CustomFileUpload";
// download file on click function
import downloadFile from "../utils/downloadFile";
import Batch from "../utils/Batch";

const Assignment = props => {
  const [program, setProgram] = useState("");
  const [batch, setBatch] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState({});
  const [addWorkModal, setAddWorkModal] = useState(false);
  const [viewAssignmentsModal, setViewAssignmentsModal] = useState(false);
  const [id, setId] = useState("");
  const [remarksModal, setRemarksModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState("");
  const [stuAssignmentData, setStuAssignmentData] = useState({});
  const [errors] = useState({});
  // get state from store
  const loading = useSelector(state => state.assignment.loading);
  const assignments = useSelector(state => state.assignment.assignments);
  const auth = useSelector(state => state.auth.user);
  // initialize useDispatch()
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    dispatch(getAssignments());
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
      from: {
        providerId: auth.enrollmentNo,
        providerName: auth.name
      },
      deadLineDate: getFullyFormateDate(deadline),
      title,
      program: program.toLowerCase(),
      batch: batch.toLowerCase()
    };
    dispatch(createAssignment(assi, file, clearState));
  };
  // delete assignment
  const deleteAssignmentFunc = id => {
    dispatch(deleteAssignment(id));
  };

  // add work
  const addworkFunc = () => {
    const workObj = {
      id: id,
      work: {
        enrollmentNo: auth.enrollmentNo,
        name: auth.name
      }
    };
    dispatch(addwork(workObj, file, clearState));
  };

  // add remarks
  const addRemarksFunc = () => {
    const remarksObj = {
      id: stuAssignmentData._id,
      remarks: {
        message: message,
        satisfaction: remarks
      }
    };
    dispatch(addRemarks(remarksObj, clearState));
  };
  // clear State
  const clearState = () => {
    setTitle("");
    setProgram("");
    setBatch("");
    setDeadline("");
    setFile({});
    setStuAssignmentData({});
    setRemarksModal(false);
    setMessage("");
    setRemarks("");
  };

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Assignment"
          subtitle="Document"
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

                    <th scope="col" className="border-0">
                      Submission Date
                    </th>
                    <th scope="col" className="border-0">
                      Action / work
                    </th>
                    {assignments &&
                      assignments.map(assignment =>
                        assignment.assignmentSubmitBy.filter(
                          ass => ass.enrollmentNo === auth.enrollmentNo
                        ).length > 0 ? (
                          <th scope="col" className="border-0">
                            Remarks
                          </th>
                        ) : null
                      )}
                  </tr>
                </thead>
                <tbody>
                  {assignments.length > 0 ? (
                    assignments.map((assignment, i) => (
                      <tr key={assignment._id}>
                        <td>{i + 1}</td>
                        <td>{assignment.title}</td>
                        <td>
                          {assignment.fileName ? (
                            <span
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline"
                              }}
                              id="download-file-2"
                              onClick={() =>
                                downloadFile(
                                  "download-file-2",
                                  assignment.fileName
                                )
                              }
                            >
                              {" "}
                              {assignment.fileName}
                            </span>
                          ) : (
                            "No file"
                          )}
                        </td>
                        <td>
                          {assignment.from.providerName} <br />
                          {assignment.from.providerId}
                        </td>
                        {/* <td></td> */}

                        <td>{assignment.deadLineDate}</td>
                        <td id="download-file-stu-assignment">
                          {assignment.assignmentSubmitBy.length > 0 &&
                          assignment.assignmentSubmitBy.filter(
                            assi => assi.enrollmentNo === auth.enrollmentNo
                          ).length > 0 ? (
                            <span
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline"
                              }}
                            >
                              {assignment.assignmentSubmitBy.length > 0 &&
                                assignment.assignmentSubmitBy
                                  .filter(
                                    assi =>
                                      assi.enrollmentNo === auth.enrollmentNo &&
                                      assi.enrollmentNo !==
                                        assignment.from.providerId
                                  )
                                  .map(ass =>
                                    ass.fileName ? (
                                      <span
                                        key={ass._id}
                                        onClick={() =>
                                          downloadFile(
                                            "download-file-stu-assignment",
                                            ass.fileName
                                          )
                                        }
                                        style={{
                                          textDecoration: "underline",
                                          cursor: "pointer"
                                        }}
                                      >
                                        {ass.fileName}
                                      </span>
                                    ) : (
                                      "No file"
                                    )
                                  )}
                            </span>
                          ) : auth.enrollmentNo !==
                            assignment.from.providerId ? (
                            <Button
                              className="btn"
                              type="button"
                              onClick={() => {
                                setId(assignment._id);
                                setAddWorkModal(true);
                              }}
                            >
                              Add Work
                            </Button>
                          ) : null}
                          {auth.enrollmentNo === assignment.from.providerId ? (
                            <>
                              <Button
                                className="btn mr-3"
                                onClick={() => {
                                  setId(assignment._id);
                                  setViewAssignmentsModal(true);
                                }}
                              >
                                Check
                              </Button>
                              <Button
                                className="btn btn-danger"
                                onClick={() =>
                                  deleteAssignmentFunc(assignment._id)
                                }
                              >
                                Delete
                              </Button>
                            </>
                          ) : null}
                        </td>
                        {assignment.assignmentSubmitBy &&
                        assignment.assignmentSubmitBy.length > 0
                          ? assignment.assignmentSubmitBy.map(ass =>
                              ass.enrollmentNo === auth.enrollmentNo ? (
                                <td key={ass._id}>
                                  {ass.remarks && ass.remarks.satisfaction}
                                </td>
                              ) : null
                            )
                          : null}
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
        </Col>
      </Row>
      {auth.role !== "student" ? (
        <>
          {" "}
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="New Assignment"
              subtitle="Documents"
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
                        <label>Program</label>
                        <Program
                          program={program}
                          setProgram={setProgram}
                          errors={errors}
                        />
                      </Col>
                      <Col md="4">
                        <label>Batch</label>
                        <Batch batch={batch} setBatch={setBatch} />
                      </Col>
                      <Col md="4">
                        <label>Deadline</label>
                        <FormInput
                          type="date"
                          value={deadline}
                          onChange={e => setDeadline(e.target.value)}
                          // pattern="\d{2}-\d{4}-\d{3}"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                        <FormInput
                          type="text"
                          placeholder="Title"
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                        />
                      </Col>
                      <Col>
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

      {addWorkModal === true ? (
        <Modal
          open={addWorkModal}
          toggle={() => setAddWorkModal(!addWorkModal)}
        >
          <ModalBody>
            <Row>
              <Col md="6">
                <div>
                  <label>Add File</label>
                  <CustomFileUpload file={file} setFile={setFile} />
                </div>
              </Col>
            </Row>

            <Button className="btn" type="button" onClick={() => addworkFunc()}>
              Add
            </Button>
          </ModalBody>
        </Modal>
      ) : null}
      {viewAssignmentsModal === true ? (
        <Modal
          open={viewAssignmentsModal}
          toggle={() => setViewAssignmentsModal(!viewAssignmentsModal)}
          className="modal-1"
        >
          <ModalBody>
            {remarksModal === true ? (
              <div className="my-4">
                <h4>Remarks</h4>
                <Row className="mb-2">
                  <Col md="3">
                    <strong>Name :</strong>
                  </Col>
                  <Col md="3">
                    {stuAssignmentData.name ? stuAssignmentData.name : null}
                  </Col>
                  <Col md="3">
                    <strong>Enrollment No :</strong>
                  </Col>
                  <Col md="3">
                    {stuAssignmentData.enrollmentNo
                      ? stuAssignmentData.enrollmentNo
                      : null}
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <div>
                      <label>Message</label>
                      <FormInput
                        type="text"
                        placeholder="message"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <div className="mt-3 mb-4">
                  <Row>
                    <Col
                      md="4"
                      className="d-flex justify-content-center align-items-center"
                    >
                      <FormRadio
                        checked={remarks === "Not Satisified"}
                        onChange={e => setRemarks("Not Satisified")}
                      >
                        Not Satisified
                      </FormRadio>
                    </Col>
                    <Col
                      md="4"
                      className="d-flex justify-content-center align-items-center"
                    >
                      <FormRadio
                        checked={remarks === "Partially Satisified"}
                        onChange={e => setRemarks("Partially Satisified")}
                      >
                        Partially Satisified
                      </FormRadio>
                    </Col>
                    <Col
                      md="4"
                      className="d-flex justify-content-center align-items-center"
                    >
                      <FormRadio
                        checked={remarks === "Satisfied"}
                        onChange={e => setRemarks("Satisfied")}
                      >
                        Satisfied
                      </FormRadio>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Button className="btn mr-3" onClick={() => addRemarksFunc()}>
                    Add
                  </Button>
                  <Button
                    className="btn btn-secondary"
                    onClick={e => {
                      setStuAssignmentData({});
                      setRemarksModal(false);
                      setMessage("");
                      setRemarks("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : null}
            <table className="table mb-0 mt-4" style={{ width: "100%" }}>
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    sr#
                  </th>
                  <th scope="col" className="border-0">
                    Name
                  </th>
                  <th scope="col" className="border-0">
                    Enrollment No
                  </th>
                  <th scope="col" className="border-0">
                    Work File
                  </th>
                  <th scope="col" className="border-0">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignments.filter(assignment => assignment._id === id)
                  .length > 0 ? (
                  assignments
                    .filter(assignment => assignment._id === id)
                    .map(assignment =>
                      assignment.assignmentSubmitBy.length > 0 ? (
                        assignment.assignmentSubmitBy.map((ass, i) => (
                          <tr key={ass._id}>
                            <td>{i + 1}</td>
                            <td>{ass.name}</td>
                            <td>{ass.enrollmentNo}</td>
                            <td id="download-file-assignemnt-submitby-stu">
                              {ass.fileName ? (
                                <span
                                  style={{
                                    cursor: "pointer",
                                    textDecoration: "underline"
                                  }}
                                  onClick={() =>
                                    downloadFile(
                                      "download-file-assignemnt-submitby-stu",
                                      ass.fileName
                                    )
                                  }
                                >
                                  {ass.fileName}
                                </span>
                              ) : (
                                "No file"
                              )}
                            </td>
                            <td>
                              {ass.remarks &&
                              ass.remarks.satisfaction.length > 0 ? (
                                ass.remarks.satisfaction
                              ) : stuAssignmentData._id !== ass._id ? (
                                <Button
                                  onClick={() => {
                                    setStuAssignmentData(ass);
                                    setRemarksModal(true);
                                  }}
                                >
                                  Add Remarks
                                </Button>
                              ) : (
                                "---"
                              )}
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
          </ModalBody>
        </Modal>
      ) : null}

      {loading === true ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : null}
    </Container>
  );
};
export default Assignment;
