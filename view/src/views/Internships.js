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
// Program component
import Program from "../utils/Program";
import Batch from "../utils/Batch";

// action
import {
  createInternship,
  getInternships,
  deleteInternships,
  updateInternship
} from "../actions/internshipAction";
import { getUsers } from "../actions/authActions";
// loader
import Loader from "../utils/Loader";
// custom file uploader
import CustomFileUpload from "../components/components-overview/CustomFileUpload";

const Internship = props => {
  const [program, setProgram] = useState("");
  const [batch, setBatch] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [file, setFile] = useState({});
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [searchEnrollemnt, setSearchEnrollment] = useState("");
  const [searchProgram, setSearchProgram] = useState("");
  const [searchBatch, setSearchBatch] = useState("");
  const [searchBy, setSearchBy] = useState("enrollment");
  const [errors, setErrors] = useState({});

  // get state from store
  const loading = useSelector(state => state.internship.loading);
  const internships = useSelector(state => state.internship.internships);
  const auth = useSelector(state => state.auth.user);
  const users = useSelector(state => state.auth.users);
  const errorsFromStore = useSelector(state => state.errors);
  // initialize useDispatch()
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    setErrors(errorsFromStore);
  }, [errorsFromStore]);

  useEffect(() => {
    dispatch(
      getInternships({
        program: undefined,
        batch: undefined,
        enrollmentNo: undefined
      })
    );
    dispatch(getUsers());
  }, []);
  // get Formate date
  const getFullyFormateDate = fullDate => {
    const date = new Date(fullDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}-${month + 1}-${year}`;
  };
  // create internship
  const createInternshipFunc = e => {
    const internship = {
      from: {
        Id: auth.enrollmentNo,
        Name: auth.name
      },
      program: program.toLowerCase(),
      batch: batch.toLowerCase(),
      startDate: startDate,
      company: company.toLowerCase(),
      enrollmentNo,
      name
    };
    dispatch(createInternship(internship, clearState));
  };
  // set state to empty
  const clearState = () => {
    setProgram("");
    setBatch("");
    setName("");
    setBatch("");
    setCompany("");
    setStartDate("");
    setEnrollmentNo("");
    setModal(false);
  };
  // delete internship
  const deleteInternshipFunc = id => {
    if (window.confirm("If you want to delete Intersnship then press OK")) {
      dispatch(deleteInternships(id));
    }
  };
  // update internship
  const updateInternshipFunc = e => {
    const internship = {
      id,
      program,
      batch,
      startDate: startDate,
      company,
      enrollmentNo,
      name,
      endDate
    };
    dispatch(updateInternship(internship, clearState));
  };
  // update state for update
  const handleUpdate = data => {
    setProgram(data.program);
    setBatch(data.batch);
    setEnrollmentNo(data.enrollmentNo);
    setStartDate(data.startDate);
    setEndDate(data.endDate);
    setCompany(data.company);
    setName(data.name);
    setId(data._id);
    setModal(true);
  };
  return (
    <Container fluid className="main-content-container px-4 pb-4 complain-page">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Internships"
          subtitle="Internship"
          className="text-sm-left"
        />
      </Row>
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
                  <Col sm="2">
                    <Button
                      size="md"
                      onClick={() =>
                        dispatch(
                          getInternships({
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
                          getInternships({
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
                      Company
                    </th>

                    <th scope="col" className="border-0">
                      Start Date
                    </th>

                    <th scope="col" className="border-0">
                      End Date
                    </th>
                    <th scope="col" className="border-0">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {internships.length > 0 ? (
                    internships.map((internship, i) => (
                      <tr key={internship._id}>
                        <td>{i + 1}</td>
                        <td>{internship.name}</td>
                        <td>{internship.enrollmentNo}</td>
                        <td>{internship.company}</td>
                        <td>{getFullyFormateDate(internship.startDate)}</td>
                        <td>
                          {internship.endDate
                            ? getFullyFormateDate(internship.endDate)
                            : "pending"}
                        </td>
                        <td>
                          {internship.from &&
                          internship.from.Id === auth.enrollmentNo ? (
                            <>
                              <Button
                                className="btn mr-3"
                                onClick={e => handleUpdate(internship)}
                              >
                                Update
                              </Button>
                              <Button
                                className="btn btn-danger"
                                onClick={() =>
                                  deleteInternshipFunc(internship._id)
                                }
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
      {auth.role !== "student" ? (
        <>
          {" "}
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="New Internship"
              subtitle="Internship"
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
                      <Col md="4" className="mt-md">
                        <label>Batch</label>
                        <Batch
                          batch={batch}
                          setBatch={setBatch}
                          errors={errors}
                        />
                      </Col>

                      <Col md="4" className="mt-md">
                        <label>Company</label>
                        <FormInput
                          type="text"
                          placeholder="company"
                          value={company}
                          onChange={e => setCompany(e.target.value)}
                          required
                          invalid={
                            errors.validation &&
                            errors.validation.company &&
                            true
                          }
                        />
                        {errors.validation && errors.validation.company && (
                          <FormFeedback className="mb-2">
                            {errors.validation.company}
                          </FormFeedback>
                        )}
                      </Col>
                    </Row>
                    <Row className="mb-4">
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
                                    {user.name}
                                  </p>
                                ))}
                            </div>
                          ) : null}
                        </div>
                        {errors.validation &&
                          errors.validation.enrollmentNo && (
                            <FormFeedback className="mb-2">
                              {errors.validation.enrollmentNo}
                            </FormFeedback>
                          )}
                      </Col>

                      <Col md="4" className="mt-md">
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

                      <Col md="4" className="mt-md">
                        <label>Start Date</label>
                        <FormInput
                          type="date"
                          value={startDate}
                          onChange={e => setStartDate(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <div className="mt-4 pt-4">
                      <Button
                        type="button"
                        onClick={e => createInternshipFunc(e)}
                      >
                        Create New
                      </Button>
                      <Button
                        className="ml-2 btn btn-danger"
                        onClick={e => clearState()}
                      >
                        Reset
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      ) : null}

      <Modal open={modal} toggle={() => setModal(!modal)}>
        <ModalHeader>Internsip</ModalHeader>
        <ModalBody>
          <Row>
            <Col lg="12" md="12">
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
                  <Col md="4" className="mt-md">
                    <label>Batch</label>
                    <Batch batch={batch} setBatch={setBatch} />
                  </Col>
                  <Col md="4" className="mt-md">
                    <label>Enrollment No</label>
                    <FormInput
                      type="text"
                      placeholder="Enrollment No"
                      value={enrollmentNo}
                      onChange={e => setEnrollmentNo(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md="4">
                    <label>Name</label>
                    <FormInput
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Col>
                  <Col md="4" className="mt-md">
                    <label>Company</label>
                    <FormInput
                      type="text"
                      placeholder="comoany"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                    />
                  </Col>
                  <Col md="4" className="mt-md">
                    <label>Start Date</label>
                    <FormInput
                      type="date"
                      value={startDate}
                      onChange={e => setStartDate(e.target.value)}
                      defaultValue={startDate}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <label>End Date</label>
                    <FormInput
                      type="date"
                      value={endDate}
                      onChange={e => setEndDate(e.target.value)}
                      defaultValue={endDate}
                    />
                  </Col>
                  <Col md="5">
                    <label>Report File</label>
                    <CustomFileUpload file={file} setFile={setFile} />
                  </Col>
                </Row>
                <Button type="button" onClick={e => updateInternshipFunc(e)}>
                  Update
                </Button>
              </Form>
            </Col>
          </Row>
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
export default Internship;
