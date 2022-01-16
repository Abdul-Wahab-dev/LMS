import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardHeader,
  Card,
  Modal,
  ModalHeader,
  FormInput,
  Button,
  ModalBody,
  Form,
  FormRadio,
  FormFeedback
} from "shards-react";
import { useDispatch, useSelector } from "react-redux";
// page title
import PageTitle from "../components/common/PageTitle";
import Program from "../utils/Program";
import Batch from "../utils/Batch";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
// action
import {
  createCSP,
  getCSPS,
  deleteCSPS,
  addCSPWork,
  addCSPRemarks
} from "../actions/cspAction";
import { getUsers } from "../actions/authActions";
// loader
import Loader from "../utils/Loader";
// custom file uploader
import CustomFileUpload from "../components/components-overview/CustomFileUpload";
// download file on click function
import downloadFile from "../utils/downloadFile";
const CSP = props => {
  const [program, setProgram] = useState("");
  const [batch, setBatch] = useState("");
  const [name, setName] = useState("");
  const [deadLineDate, setDeadLine] = useState("");
  const [addWorkModal, setAddWorkModal] = useState(false);
  const [file, setFile] = useState({});
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);
  const [comment, setComment] = useState("");
  const [remarks, setRemarks] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [searchEnrollemnt, setSearchEnrollment] = useState("");
  const [searchProgram, setSearchProgram] = useState("");
  const [searchBatch, setSearchBatch] = useState("");
  const [searchBy, setSearchBy] = useState("enrollment");
  const [errors, setErrors] = useState({});

  // get state from store
  const loading = useSelector(state => state.csp.loading);
  const csps = useSelector(state => state.csp.csps);
  const auth = useSelector(state => state.auth.user);
  const users = useSelector(state => state.auth.users);
  const errorsFromStore = useSelector(state => state.errors);
  // initialize useDispatch()
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    setErrors(errorsFromStore);
  }, [errorsFromStore]);
  // get formate date
  const getFullyFormateDate = fullDate => {
    const date = new Date(fullDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}-${month + 1}-${year}`;
  };

  // create CSP
  const createCSPFunc = e => {
    const csp = {
      from: {
        Id: auth.enrollmentNo,
        Name: auth.name
      },
      program: program.toLowerCase(),
      batch: batch.toLocaleLowerCase(),
      deadLineDate: getFullyFormateDate(deadLineDate),
      enrollmentNo: enrollmentNo.toLowerCase(),
      name: name.toLowerCase()
    };
    dispatch(createCSP(csp, file, clearState));
  };
  // useEffect
  useEffect(() => {
    if (auth.role === "student") {
      dispatch(
        getCSPS({
          program: undefined,
          batch: undefined,
          enrollmentNo: undefined
        })
      );
    }
    dispatch(getUsers());
  }, []);

  // clear State
  const clearState = () => {
    setProgram("");
    setBatch("");
    setName("");
    setEnrollmentNo("");
    setDeadLine("");
    setFile({});
    setAddWorkModal(false);
    setRemarks("");
    setComment("");
    setModal(false);
  };
  // delete CSP
  const deleteCSPFunc = id => {
    if (window.confirm("If you want to delete CSP then press OK")) {
      dispatch(deleteCSPS(id));
    }
  };

  // submit work
  const addWork = () => {
    const obj = {
      id: data._id
    };
    dispatch(addCSPWork(obj, file, clearState));
  };
  // add remarks
  const addCSPRemarksFunc = () => {
    const obj = {
      id: data._id,
      remarks: {
        message: comment.toLowerCase(),
        satisfaction: remarks
      }
    };
    dispatch(addCSPRemarks(obj, clearState));
  };
  return (
    <Container fluid className="main-content-container px-4 pb-4 complain-page">
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="CSP" subtitle="CSP" className="text-sm-left" />
      </Row>
      {auth.permissions.CSP.read === true ? (
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
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
                        value={searchEnrollemnt}
                        onChange={e => setSearchEnrollment(e.target.value)}
                      />
                    </Col>
                    <Col sm="2" xs="3" className="mt-sm">
                      <Button
                        size="md"
                        onClick={() =>
                          dispatch(
                            getCSPS({
                              program: undefined,
                              batch: undefined,
                              enrollmentNo: searchEnrollemnt
                            })
                          )
                        }
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col sm="4" xs="4">
                      <Program
                        program={searchProgram}
                        setProgram={setSearchProgram}
                        errors={errors}
                      />
                    </Col>
                    <Col sm="4" xs="4">
                      <Batch batch={searchBatch} setBatch={setSearchBatch} />
                    </Col>
                    <Col sm="2" xs="2">
                      <Button
                        size="md"
                        onClick={() =>
                          dispatch(
                            getCSPS({
                              program: searchProgram,
                              batch: searchBatch,
                              enrollmentNo: undefined
                            })
                          )
                        }
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                )}
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Sr#
                      </th>
                      <th scope="col" className="border-0">
                        Name
                      </th>
                      <th scope="col" className="border-0">
                        Enrollment
                      </th>
                      <th scope="col" className="border-0">
                        File
                      </th>

                      <th scope="col" className="border-0">
                        Submission Date
                      </th>
                      <th scope="col" className="border-0">
                        User File
                      </th>
                      <th scope="col" className="border-0">
                        Remarks
                      </th>
                      {auth.role !== "student" ? (
                        <th scope="col" className="border-0">
                          Action
                        </th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {csps.length > 0 ? (
                      csps.map((csp, i) => (
                        <tr key={csp._id}>
                          <td>{i + 1}</td>
                          <td>{capitalizeFirstLetter(csp.name)}</td>
                          <td>{csp.enrollmentNo}</td>

                          <td id="download-file-csp">
                            {csp.fileName ? (
                              <span
                                onClick={() =>
                                  downloadFile(
                                    "download-file-csp",
                                    csp.fileName
                                  )
                                }
                                style={{
                                  cursor: "pointer",
                                  textDecoration: "underline"
                                }}
                              >
                                {csp.fileName}
                              </span>
                            ) : (
                              "No File"
                            )}
                          </td>
                          <td>{csp.deadLineDate}</td>
                          <td id="download-file-csp-user">
                            {csp.fileNameFromUser ? (
                              <span
                                onClick={() =>
                                  downloadFile(
                                    "download-file-csp-user",
                                    csp.fileNameFromUser
                                  )
                                }
                                style={{
                                  cursor: "pointer",
                                  textDecoration: "underline"
                                }}
                              >
                                {csp.fileNameFromUser}
                              </span>
                            ) : csp.from.Id !== auth.enrollmentNo ? (
                              <Button
                                className="btn"
                                type="button"
                                onClick={() => {
                                  setData(csp);
                                  setAddWorkModal(true);
                                }}
                              >
                                Add Work
                              </Button>
                            ) : (
                              "No File"
                            )}
                          </td>
                          <td>
                            {csp.remarks &&
                            csp.remarks.satisfaction.length > 0 ? (
                              csp.remarks.satisfaction
                            ) : csp.from.Id === auth.enrollmentNo ? (
                              <Button
                                className="btn btn-secondary"
                                onClick={() => {
                                  setData(csp);
                                  setModal(true);
                                }}
                              >
                                {" "}
                                Add Remarks
                              </Button>
                            ) : (
                              "NIL"
                            )}
                          </td>

                          <td>
                            {csp.from && csp.from.Id === auth.enrollmentNo ? (
                              <>
                                <Button
                                  className="btn btn-danger"
                                  onClick={() => deleteCSPFunc(csp._id)}
                                >
                                  Delete
                                </Button>
                              </>
                            ) : null}
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}

      {(auth.role !== "student" &&
        auth.permissions &&
        auth.permissions.CSP.write === true) ||
      auth.role === "admin" ? (
        <>
          {" "}
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="New CSP"
              subtitle="CSP"
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
                      <Col md="4" className="mt-sm">
                        <label>Batch</label>
                        <Batch
                          batch={batch}
                          setBatch={setBatch}
                          errors={errors}
                        />
                      </Col>

                      <Col md="4" className="mt-sm">
                        <label>Deadline</label>
                        <FormInput
                          type="date"
                          value={deadLineDate}
                          onChange={e => setDeadLine(e.target.value)}
                          required
                          invalid={
                            errors.validation &&
                            errors.validation.deadLineDate &&
                            true
                          }
                        />
                        {errors.validation &&
                          errors.validation.deadLineDate && (
                            <FormFeedback className="mb-2">
                              {errors.validation.deadLineDate}
                            </FormFeedback>
                          )}
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md="4" style={{ position: "relative" }}>
                        <label>Enrollment No</label>
                        <div>
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
                          {users.length > 0 &&
                          enrollmentNo.length > 0 &&
                          name.length < 1 &&
                          users.filter(
                            user =>
                              user.enrollmentNo.indexOf(enrollmentNo) !== -1
                          ).length > 0 ? (
                            <div className="user-filter-div">
                              {users
                                .filter(
                                  user =>
                                    user.enrollmentNo.indexOf(enrollmentNo) !==
                                    -1
                                )
                                .map(user => (
                                  <p
                                    key={user._id}
                                    style={{
                                      margin: "5px 0 0 0",
                                      cursor: "pointer"
                                    }}
                                    onClick={() => {
                                      setName(user.name);
                                      setEnrollmentNo(user.enrollmentNo);
                                    }}
                                  >
                                    {capitalizeFirstLetter(user.name)}
                                  </p>
                                ))}
                            </div>
                          ) : null}
                          {errors.validation &&
                            errors.validation.enrollmentNo && (
                              <FormFeedback className="mb-2">
                                {errors.validation.enrollmentNo}
                              </FormFeedback>
                            )}
                        </div>
                      </Col>
                      <Col md="4" className="mt-sm">
                        <label>Name</label>
                        <FormInput
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
                          <FormFeedback className="mb-2">
                            {errors.validation.name}
                          </FormFeedback>
                        )}
                      </Col>

                      <Col md="4" className="mt-sm">
                        <label>File</label>
                        <CustomFileUpload file={file} setFile={setFile} />
                      </Col>
                    </Row>
                    <Button type="button" onClick={e => createCSPFunc(e)}>
                      Create New
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      ) : null}

      <Modal open={addWorkModal} toggle={() => setAddWorkModal(!addWorkModal)}>
        <ModalBody>
          <Row>
            <Col md="6">
              <div>
                <label>Add File</label>
                <CustomFileUpload file={file} setFile={setFile} />
              </div>
            </Col>
          </Row>

          <Button className="btn" type="button" onClick={() => addWork()}>
            Add
          </Button>
        </ModalBody>
      </Modal>

      <Modal open={modal} toggle={() => setModal(!modal)}>
        <ModalHeader>Remarks</ModalHeader>
        <ModalBody>
          <div className="complain-modal-container">
            <FormInput
              type="text"
              placeholder="comment"
              className="my-3"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <div className="my-3">
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
            <Button
              type="button"
              className="my-2"
              onClick={e => addCSPRemarksFunc()}
            >
              Remarks
            </Button>
          </div>
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
export default CSP;
