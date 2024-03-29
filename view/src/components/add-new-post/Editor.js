import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import {
  Card,
  CardBody,
  Form,
  FormInput,
  FormRadio,
  Col,
  FormSelect,
  Button,
  Row,
  FormFeedback,
} from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";
import CustomFileUpload from "../components-overview/CustomFileUpload";
// actions
import { getUsers } from "../../actions/authActions";
import { createComplain } from "../../actions/complainAction";
import { createNews } from "../../actions/newsAndUpdatesAction";
import { createDocs } from "../../actions/officalDocs";
import { createEvent } from "../../actions/eventsAction";

const Editor = (props) => {
  const [complainFor, setComplainFor] = useState("");
  const [complaineeId, setComplaineeId] = useState("");
  const [complaineeName, setComplaineeName] = useState("");
  const [complainerId, setComplainerId] = useState("");
  const [complainerName, setComplainerName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState({});
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");

  const errorsFromStore = useSelector((state) => state.errors);
  const auth = useSelector((state) => state.auth);

  // initialize useDispatch
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  // UseEffect
  useEffect(() => {
    setErrors(errorsFromStore);
  }, [errorsFromStore]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      setComplainerId(auth.user.enrollmentNo);
      setComplainerName(auth.user.name);
    }
  }, [auth.isAuthenticated]);
  // Handle Select
  const handleSelect = (e) => {
    const user = JSON.parse(e.target.value);
    setComplaineeId(user.enrollmentNo);
    setComplaineeName(user.name);
  };

  // Handle quill
  const handleQuill = (value) => {
    setBody(value);
  };
  // Create Complan
  const createComplainFunc = (e) => {
    const complain = {
      from: {
        complainerId,
        complainerName,
      },
      to: {
        complaineeId,
        complaineeName,
      },
      title: title.toLowerCase(),
      complainFor: complainFor.toLowerCase(),
      body,
    };
    dispatch(createComplain(complain, clearState));
  };
  const createNewsFunc = (e) => {
    const news = {
      title: title.toLowerCase(),
      body,
      createBy: {
        userID: complainerId,
        name: complainerName,
      },
    };
    dispatch(createNews(news, clearState));
  };

  // Create Documents

  const createDocuFunc = (e) => {
    const doc = {
      from: {
        providerId: complainerId,
        providerName: complainerName,
      },
      to: {
        id: complaineeId.trim(),
        name: complaineeName.trim(),
      },
      documentFor: complainFor.toLowerCase(),
      title,
    };
    dispatch(createDocs(doc, file, clearState));
  };

  // Event Create
  const createEventFunc = () => {
    const eve = {
      eventProvider: {
        providerId: auth.user.enrollmentNo,
        providerName: auth.user.name,
      },
      eventName: title,
      eventType,
      eventDate,
      body,
    };

    dispatch(createEvent(eve, file, clearState));
  };
  const clearState = () => {
    setTitle("");
    setBody("");
    setComplainFor("");
    setComplaineeId("");
    setComplaineeName("");
    setFile({});
    setEventDate("");
    setEventType("");
  };
  return (
    <Card small className="mb-3">
      <CardBody>
        <Form className="add-new-post">
          <Row>
            <Col md="4">
              <label>Title</label>
              <FormInput
                size="md"
                className="mb-3"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                invalid={errors.validation && errors.validation.title && true}
              />
              {errors.validation && errors.validation.title && (
                <FormFeedback className="mb-2">
                  {errors.validation.title}
                </FormFeedback>
              )}
            </Col>
            {props.for === "events" ? (
              <Col md="4">
                <label>Event Type</label>
                <FormInput
                  type="text"
                  placeholder="Event Type"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                />
              </Col>
            ) : null}
            {props.for === "documents" ? (
              <Col md="4" className="mt-md">
                <label>File</label>
                <CustomFileUpload file={file} setFile={setFile} />
              </Col>
            ) : null}
          </Row>
          {props.for === "events" ? (
            <Row>
              <Col md="4" className="mt-md">
                <label>Event Date</label>
                <FormInput
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </Col>
              <Col md="4" className="mt-md">
                <label>File</label>
                <CustomFileUpload file={file} setFile={setFile} />
              </Col>
            </Row>
          ) : null}
          {props.for !== "documents" ? (
            <>
              <ReactQuill
                className="add-new-post__editor mb-1"
                value={body}
                onChange={handleQuill}
              />
              {errors.validation && errors.validation.body && (
                <FormFeedback>{errors.validation.body}</FormFeedback>
              )}
            </>
          ) : null}
          {props.for !== "news" && props.for !== "events" ? (
            <div className="my-4">
              <Row>
                <Col
                  md="1"
                  sm="1"
                  xs="12"
                  className="d-flex justify-content-center align-items-center justify-content-start"
                >
                  <h5 className="m-0">{props.title}</h5>
                </Col>
                {props.for !== "documents" ? (
                  <Col
                    md="2"
                    sm="2"
                    xs="6"
                    className="d-flex justify-content-center align-items-center justify-content-start"
                  >
                    <FormRadio
                      name="complainFor"
                      checked={complainFor === "admin"}
                      // checked={true}
                      onChange={(e) => setComplainFor("admin")}
                    >
                      Admin
                    </FormRadio>
                  </Col>
                ) : null}
                {props.for === "documents" ? (
                  <>
                    <Col
                      md="1"
                      sm="2"
                      xs="6"
                      className="d-flex justify-content-center align-items-center justify-content-start"
                    >
                      <FormRadio
                        name="complainFor"
                        checked={complainFor === "all"}
                        // checked={true}
                        onChange={(e) => setComplainFor("all")}
                      >
                        All
                      </FormRadio>
                    </Col>
                    <Col
                      md="2"
                      sm="2"
                      xs="6"
                      className="d-flex justify-content-center align-items-center justify-content-start"
                    >
                      <FormRadio
                        name="complainFor"
                        checked={complainFor === "student"}
                        // checked={true}
                        onChange={(e) => setComplainFor("student")}
                      >
                        Student
                      </FormRadio>
                    </Col>
                  </>
                ) : null}

                <Col
                  md="2"
                  sm="2"
                  xs="6"
                  className="d-flex justify-content-center align-items-center justify-content-start"
                >
                  <FormRadio
                    name="complainFor"
                    checked={complainFor === "faculty"}
                    onChange={(e) => setComplainFor("faculty")}
                  >
                    Faculty
                  </FormRadio>
                </Col>
                <Col
                  md="2"
                  sm="2"
                  xs="6"
                  className="d-flex justify-content-center align-items-center justify-content-start"
                >
                  <FormRadio
                    name="complainFor"
                    checked={complainFor === "coordinator"}
                    onChange={(e) => setComplainFor("coordinator")}
                  >
                    Coordinator
                  </FormRadio>
                </Col>
                <Col md="3" sm="3" xs="6">
                  <FormSelect
                    id="feInputState"
                    value={complaineeName}
                    onChange={(e) => handleSelect(e)}
                    required
                    invalid={
                      errors.validation && errors.validation.complainFor && true
                    }
                  >
                    {complaineeName ? (
                      <option>{complaineeName}</option>
                    ) : (
                      <option>Choose...</option>
                    )}
                    {/* <option>Choose...</option> */}
                    {auth.users
                      .filter((user) => user.role === complainFor)
                      .map((user, i) =>
                        user.enrollmentNo !== complaineeId ? (
                          <option key={i} value={JSON.stringify(user)}>
                            {user.name}
                          </option>
                        ) : null
                      )}
                  </FormSelect>
                </Col>
              </Row>
              {errors.validation && errors.validation.complainFor && (
                <FormFeedback tag={"div"}>
                  {errors.validation.complainFor}
                </FormFeedback>
              )}
              {errors.validation && errors.validation.documentFor && (
                <div
                  style={{
                    fontSize: "80%",
                    color: "#c4183c",
                    marginTop: "5px",
                  }}
                >
                  {errors.validation.documentFor}
                </div>
              )}
            </div>
          ) : null}

          {props.for === "complains" ? (
            <Button type="button" onClick={(e) => createComplainFunc(e)}>
              Create Complain
            </Button>
          ) : null}
          {props.for === "news" ? (
            <Button
              type="button"
              className="my-4"
              onClick={(e) => createNewsFunc(e)}
            >
              Create News
            </Button>
          ) : null}
          {props.for === "documents" ? (
            <Button
              type="button"
              className="my-4"
              onClick={(e) => createDocuFunc(e)}
            >
              Create Document
            </Button>
          ) : null}
          {props.for === "events" ? (
            <Button
              type="button"
              className="my-4"
              onClick={(e) => createEventFunc(e)}
            >
              Create Event
            </Button>
          ) : null}
        </Form>
      </CardBody>
    </Card>
  );
};

export default Editor;
