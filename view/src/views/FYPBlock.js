import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardHeader,
  Card,
  FormSelect,
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
// Batch
import Batch from "../utils/Batch";
// action
import {
  getFyp,
  addRemarks,
  createFYP,
  getProjectNames,
  deleteFYP,
  deleteIdea,
  addMembersToFYPAct
} from "../actions/fyp";
import { getUsers } from "../actions/authActions";
// loader
import Loader from "../utils/Loader";
const FYPBlock = () => {
  const [eventName, setEventName] = useState("");
  const [eventNameSearch, setEventNameSearch] = useState("");
  const [batch, setBatch] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorId, setSupervisorId] = useState("");

  const [batchSearch, setBatchSearch] = useState("");
  const [presentationDate, setPresentationDate] = useState("");
  const [presentationTime, setPresentationTime] = useState("");
  const [idea, setIdea] = useState("");
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);
  const [comment, setComment] = useState("");
  const [remarks, setRemarks] = useState("");
  const [errors, setErrors] = useState({});
  const [eventIdForMember, setEventIdForMember] = useState("");

  const [eventMembers, setEventMembers] = useState([
    {
      name: "",
      enrollmentNo: ""
    }
  ]);

  // get state from store
  const errorsFromStore = useSelector(state => state.errors);
  const loading = useSelector(state => state.fyp.loading);
  const projects = useSelector(state => state.fyp.projects);
  const names = useSelector(state => state.fyp.names);
  const auth = useSelector(state => state.auth.user);
  const users = useSelector(state => state.auth.users);
  // initialize useDispatch()
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    setErrors(errorsFromStore);
  }, [errorsFromStore]);

  useEffect(() => {
    if (auth.role !== "student") {
      dispatch(getProjectNames());
    }
    dispatch(getFyp({ eventName: "", batch: "" }));
    dispatch(getUsers());
  }, []);
  // get formate date
  const getFullyFormateDate = fullDate => {
    const date = new Date(fullDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}-${month + 1}-${year}`;
  };
  // search project
  const searchProject = () => {
    dispatch(
      getFyp({
        eventName: eventNameSearch.toLowerCase(),
        batch: batchSearch.toLowerCase()
      })
    );
  };
  // add remarks
  const addRemarksFunc = id => {
    const remarksObj = {
      comment: comment.toLowerCase(),
      Satisification: remarks,
      name: auth.name,
      enrollmentNo: auth.enrollmentNo
    };
    dispatch(addRemarks(remarksObj, id, data.fyp._id, clearRemarksState));
  };

  // Handle Members
  const addMembers = (value, i, type) => {
    const array = [...eventMembers];
    if (type === "name") array[i].name = value;
    if (type === "enrollment") array[i].enrollmentNo = value;
    setEventMembers([...array]);
  };
  const addNewMembers = () => {
    if (eventMembers.length < 3) {
      const array = [...eventMembers];
      array.push({
        name: "",
        enrollmentNo: ""
      });

      setEventMembers([...array]);
    }
  };
  // remove member
  const removeMember = index => {
    const array = [...eventMembers].filter((member, i) => i !== index);
    setEventMembers([...array]);
  };
  // get time 12 hours formate
  function onTimeChange(time) {
    var timeSplit = time.split(":"),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = "PM";
      hours -= 12;
    } else if (hours < 12) {
      meridian = "AM";
      if (hours === 0) {
        hours = 12;
      }
    } else {
      meridian = "PM";
    }
    return hours + ":" + minutes + " " + meridian;
  }
  // create function
  const createFYPFunc = e => {
    const fypObj = {
      eventName: eventName.toLowerCase(),
      batch: batch.toLowerCase(),
      eventProvider: {
        providerId: auth.enrollmentNo,
        providerName: auth.name
      }
    };
    dispatch(createFYP(fypObj, clearRemarksState));
  };

  // add member
  const addMemberToFYP = () => {
    const memberObj = {
      id: eventIdForMember,
      project: {
        eventMembers: eventMembers,
        presentationDate:
          presentationDate.length > 0
            ? getFullyFormateDate(presentationDate)
            : presentationDate,
        presentationTime:
          presentationTime.length > 0
            ? onTimeChange(presentationTime)
            : presentationTime,
        idea,
        supervisor: {
          name: supervisorName.toLowerCase(),
          enrollmentNo: supervisorId.toLowerCase()
        }
      }
    };
    dispatch(addMembersToFYPAct(memberObj, clearRemarksState));
  };
  // clear state
  const clearRemarksState = () => {
    setBatch("");
    setEventMembers([
      {
        name: "",
        enrollmentNo: ""
      }
    ]);

    setEventName("");
    setPresentationTime("");
    setPresentationDate("");
    setIdea("");
    setRemarks("");
    setComment("");
    setEventIdForMember("");
    setSupervisorId("");
    setSupervisorName("");
    setModal(false);
  };

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="FYP-block"
          subtitle="FYP"
          className="text-sm-left"
        />
      </Row>
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              {auth.role !== "student" ? (
                <Form>
                  <Row>
                    <Col md="3">
                      <Batch batch={batchSearch} setBatch={setBatchSearch} />
                    </Col>
                    <Col md="3">
                      <FormSelect
                        id="feInputState"
                        value={eventNameSearch}
                        onChange={e => setEventNameSearch(e.target.value)}
                        required
                      >
                        {names.length > 0 ? (
                          <>
                            <option value="">Choose...</option>
                            {names
                              .filter(
                                name =>
                                  name.batch.toLowerCase() ===
                                  batchSearch.toLowerCase()
                              )
                              .map((name, i) => (
                                <option key={name._id} value={`${name._id}`}>
                                  {name.eventName.charAt(0).toUpperCase() +
                                    name.eventName.slice(1)}{" "}
                                  {`( ${name.batch} )`}
                                </option>
                              ))}
                            )
                          </>
                        ) : (
                          <option>Loading...</option>
                        )}
                      </FormSelect>
                    </Col>

                    <Col md="2">
                      <Button type="button" onClick={() => searchProject()}>
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <h6 className="m-0">Projects</h6>
              )}
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Sr#
                    </th>
                    <th scope="col" colSpan="2" className="border-0">
                      Members
                    </th>

                    <th scope="col" className="border-0">
                      Project
                    </th>
                    <th scope="col" className="border-0">
                      Date and Time
                    </th>
                    <th scope="col" className="border-0">
                      Supervisor
                    </th>
                    <th scope="col" className="border-0">
                      Remarks
                    </th>
                    {auth.role !== "student" ? (
                      <th scope="col" className="border-0" colSpan="2">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {projects.length > 0 ? (
                    projects.map(project =>
                      project.projects.map((fyp, i) => (
                        <tr key={fyp._id}>
                          <td>{i + 1}</td>
                          <td colSpan="2">
                            {fyp.eventMembers.map(member => (
                              <Row className="mb-2" key={member._id}>
                                <Col
                                  md="6"
                                  className="d-flex justify-content-center align-items-center"
                                >
                                  {member.name}
                                </Col>
                                <Col
                                  md="6"
                                  className="d-flex justify-content-center align-items-center"
                                >
                                  {member.enrollmentNo}
                                </Col>
                              </Row>
                            ))}
                          </td>
                          <td>{fyp.idea}</td>
                          <td>
                            {fyp.presentationDate} <br />
                            {fyp.presentationTime}
                          </td>
                          <td>
                            {fyp.supervisor ? fyp.supervisor.name : "Null"}
                          </td>

                          <td>
                            <Button
                              className="btn"
                              onClick={() => {
                                setModal(true);
                                setData({ id: project._id, fyp });
                              }}
                            >
                              Remarks
                            </Button>
                          </td>

                          {auth.role !== "student" ? (
                            <td colSpan="2">
                              <div className="d-flex justify-content-center align-items-center">
                                <Button
                                  className="mr-1"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "If you want to delete Project then press OK"
                                      )
                                    ) {
                                      dispatch(
                                        deleteIdea({
                                          id: project._id,
                                          projectId: fyp._id
                                        })
                                      );
                                    }
                                  }}
                                >
                                  Delete Idea
                                </Button>
                                <Button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "If you want to delete Complete FYP then press OK"
                                      )
                                    ) {
                                      dispatch(deleteFYP(project._id));
                                    }
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          ) : null}
                        </tr>
                      ))
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
      {auth.role !== "student" && auth.role !== "faculty" ? (
        <>
          {" "}
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="New FYP"
              subtitle="FYP"
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
                        <label>Event Name</label>
                        <FormInput
                          type="text"
                          placeholder="Presentation no 1"
                          value={eventName}
                          onChange={e => setEventName(e.target.value)}
                          required
                          invalid={
                            errors.validation &&
                            errors.validation.eventName &&
                            true
                          }
                        />
                        {errors.validation && errors.validation.eventName && (
                          <FormFeedback>
                            {errors.validation.eventName}
                          </FormFeedback>
                        )}
                      </Col>
                      <Col md="4">
                        <label>Batch</label>
                        <Batch
                          batch={batch}
                          setBatch={setBatch}
                          errors={errors}
                        />
                      </Col>
                    </Row>

                    <Button type="button" onClick={e => createFYPFunc(e)}>
                      Create New
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      ) : null}

      {auth.role !== "student" && auth.role !== "faculty" ? (
        <>
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="Add Member"
              subtitle="FYP"
              className="text-sm-left"
            />
          </Row>
          <Row>
            <Col lg="9" md="12">
              <Card small>
                <CardBody>
                  <Form>
                    <Row>
                      <Col sm="4">
                        <label>Event Name</label>
                        <FormSelect
                          id="feInputState"
                          value={eventIdForMember}
                          onChange={e => setEventIdForMember(e.target.value)}
                          required
                        >
                          {names.length > 0 ? (
                            <>
                              <option value="">Choose</option>
                              {names.map((name, i) => (
                                <option value={`${name._id}`} key={name._id}>
                                  {name.eventName.charAt(0).toUpperCase() +
                                    name.eventName.slice(1)}{" "}
                                  {`( ${name.batch} )`}
                                </option>
                              ))}
                            </>
                          ) : (
                            <option>Loading...</option>
                          )}
                        </FormSelect>
                      </Col>

                      <Col md="4">
                        <label>Supervisor name</label>
                        <FormInput
                          type="text"
                          placeholder="enrollment No"
                          value={supervisorName}
                          onChange={e => {
                            setSupervisorName(e.target.value);
                            setSupervisorId("");
                          }}
                        />
                        {users.length > 0 &&
                        supervisorId.length < 1 &&
                        supervisorName.length > 0 &&
                        users.filter(
                          user =>
                            user.name
                              .toLowerCase()
                              .indexOf(supervisorName.toLowerCase()) !== -1
                        ).length > 0 ? (
                          <div className="user-filter-div">
                            {users
                              .filter(
                                user =>
                                  user.name
                                    .toLowerCase()
                                    .indexOf(supervisorName.toLowerCase()) !==
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
                                    setSupervisorName(user.name);
                                    setSupervisorId(user.enrollmentNo);
                                  }}
                                >
                                  {user.name}
                                </p>
                              ))}
                          </div>
                        ) : null}
                      </Col>
                    </Row>
                    <Row className="my-2">
                      <Col md="4">
                        <label> Project Name </label>
                        <FormInput
                          type="text"
                          placeholder="Idea"
                          value={idea}
                          onChange={e => setIdea(e.target.value)}
                          required
                          invalid={
                            errors.validation && errors.validation.idea && true
                          }
                        />
                        {errors.validation && errors.validation.idea && (
                          <FormFeedback>{errors.validation.idea}</FormFeedback>
                        )}
                      </Col>
                      <Col md="4">
                        <label> Date </label>
                        <FormInput
                          type="date"
                          placeholder="Idea"
                          value={presentationDate}
                          onChange={e => setPresentationDate(e.target.value)}
                          required
                          invalid={
                            errors.validation &&
                            errors.validation.presentationDate &&
                            true
                          }
                        />
                        {errors.validation &&
                          errors.validation.presentationDate && (
                            <FormFeedback>
                              {errors.validation.presentationDate}
                            </FormFeedback>
                          )}
                      </Col>
                      <Col md="4">
                        <label> Time </label>
                        <FormInput
                          type="time"
                          placeholder="Idea"
                          value={presentationTime}
                          onChange={e => setPresentationTime(e.target.value)}
                          required
                          invalid={
                            errors.validation &&
                            errors.validation.presentationTime &&
                            true
                          }
                        />
                        {errors.validation &&
                          errors.validation.presentationTime && (
                            <FormFeedback>
                              {errors.validation.presentationTime}
                            </FormFeedback>
                          )}
                      </Col>
                    </Row>
                    <div className="mt-3">
                      <label>Members</label>
                    </div>
                    <div className="mb-4">
                      {eventMembers.map((member, i) => (
                        <Row key={member._id} className="mb-4">
                          <Col md="4" style={{ position: "relative" }}>
                            <div>
                              <FormInput
                                type="text"
                                placeholder="Enrollmnet NO"
                                value={member.enrollmentNo}
                                onChange={e =>
                                  addMembers(e.target.value, i, "enrollment")
                                }
                              />
                              {users.length > 0 &&
                              member.enrollmentNo.length > 0 &&
                              member.name.length < 1 &&
                              users.filter(
                                user =>
                                  user.enrollmentNo.indexOf(
                                    member.enrollmentNo
                                  ) !== -1
                              ).length > 0 ? (
                                <div className="user-filter-div">
                                  {users
                                    .filter(
                                      user =>
                                        user.enrollmentNo.indexOf(
                                          member.enrollmentNo
                                        ) !== -1
                                    )
                                    .map(user => (
                                      <p
                                        key={user._id}
                                        style={{
                                          margin: "5px 0 0 0",
                                          cursor: "pointer"
                                        }}
                                        onClick={() => {
                                          addMembers(user.name, i, "name");
                                          // setEnrollmentNo(user.enrollmentNo);
                                          addMembers(
                                            user.enrollmentNo,
                                            i,
                                            "enrollment"
                                          );
                                        }}
                                      >
                                        {user.name}
                                      </p>
                                    ))}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                          <Col md="4">
                            <FormInput
                              type="text"
                              placeholder="Name"
                              value={member.name}
                              onChange={e =>
                                addMembers(e.target.value, i, "name")
                              }
                            />
                          </Col>
                          <Col md="4" className="position-relative">
                            <div
                              className="position-absolute"
                              style={{ bottom: "0px" }}
                            >
                              {i < 2 && i === eventMembers.length - 1 ? (
                                <Button
                                  type="button"
                                  className="mr-2 btn"
                                  onClick={() => addNewMembers()}
                                >
                                  Add
                                </Button>
                              ) : null}

                              {i !== 0 || eventMembers.length > 1 ? (
                                <Button
                                  type="button"
                                  onClick={() => removeMember(i)}
                                  className="btn btn-danger "
                                >
                                  Remove
                                </Button>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                      ))}
                    </div>
                    {eventMembers.length > 0 && eventIdForMember.length > 1 ? (
                      <Button className="mt-3" onClick={() => addMemberToFYP()}>
                        Add Member
                      </Button>
                    ) : null}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      ) : null}
      <Modal open={modal} toggle={() => setModal(!modal)}>
        <ModalHeader>Remarks</ModalHeader>
        <ModalBody>
          <div className="complain-modal-container">
            {/* <h3>Title</h3> */}
            <h6>{data.fyp && data.fyp.idea ? data.fyp.idea : ""}</h6>
            {auth.role === "student" ||
            (data.fyp &&
              data.fyp.remarks &&
              data.fyp.remarks.filter(
                remark => remark.enrollmentNo === auth.enrollmentNo
              ).length > 0) ? null : (
              <>
                <FormInput
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
                  onClick={e => addRemarksFunc(data.id, data.fyp._id)}
                >
                  Remarks
                </Button>
              </>
            )}

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
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.fyp && data.fyp.remarks && data.fyp.remarks.length > 0 ? (
                  data.fyp.remarks.map((remark, i) => (
                    <tr key={remark._id}>
                      <td>{i + 1}</td>
                      <td>{remark.name}</td>
                      <td>{remark.enrollmentNo}</td>
                      <td>{remark.Satisification}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-4 m-0 border-0">No Record</td>
                  </tr>
                )}
              </tbody>
            </table>
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
export default FYPBlock;
