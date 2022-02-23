import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  FormInput,
  Button,
  FormFeedback
} from "shards-react";
import { getSlides } from "../actions/sliderAction";
import { getUsers, createMultipleUsers } from "../actions/authActions";
import { getNews } from "../actions/newsAndUpdatesAction";
import {
  createPECDocType,
  getPECDocType,
  deletePECDocType
} from "../actions/pecAction";
import { getPrivateEvents } from "../actions/eventsAction";
import { getComplainsForAdmin } from "../actions/complainAction";
import {
  createBatch,
  createProgram,
  getPrograms,
  getBatchs,
  deleteBatch,
  deleteProgram
} from "../actions/programAndAction";
import {
  createFYPCategory,
  getFYPCategory,
  deleteFYPCategory,
  getProjectNames,
  deleteFYP
} from "../actions/fyp";
// page title
import PageTitle from "../components/common/PageTitle";
import CustomFileUpload from "../components/components-overview/CustomFileUpload";
// calendar
import Calendar from "../utils/Calendar";
// loader
import Loader from "../utils/Loader";

const AdminDashBoard = () => {
  const [program, setProgram] = useState("");
  const [batch, setBatch] = useState("");
  const [pecType, setPecType] = useState("");
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [file, setFile] = useState({});
  const [category, setCategory] = useState("");
  const events = useSelector(state => state.events.privateEvents);
  const complains = useSelector(state => state.complain.complains);
  const users = useSelector(state => state.auth.users);
  const loadingUser = useSelector(state => state.auth.loading);
  const news = useSelector(state => state.news.news);
  const programAndBatch = useSelector(state => state.programAndBatch);
  const pecTypes = useSelector(state => state.pec.pecDocType);
  const fypCategory = useSelector(state => state.fyp.category);
  const names = useSelector(state => state.fyp.names);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSlides());
    dispatch(getUsers());
    dispatch(getNews());
    dispatch(getPrivateEvents());
    dispatch(getComplainsForAdmin());
    dispatch(getPrograms());
    dispatch(getBatchs());
    dispatch(getPECDocType());
    dispatch(getFYPCategory());
    dispatch(getProjectNames());
  }, []);

  // Create Program
  const createProgramFunc = () => {
    if (program.length < 1) {
      return setErrors({ program: "Program Field is required" });
    }
    const programObj = {
      program
    };
    dispatch(createProgram(programObj, clearState));
  };
  // Create Batch
  const createBatchFunc = () => {
    if (batch.length < 1) {
      return setErrors({ batch: "Program Field is required" });
    }
    const batchObj = {
      batch
    };
    dispatch(createBatch(batchObj, clearState));
  };
  // delete Program
  const deleteProgramFunc = id => {
    if (window.confirm("If you want to delete Program then press OK")) {
      dispatch(deleteProgram(id));
    }
  };
  // delete batch
  const deleteBatchFunc = id => {
    if (window.confirm("If you want to delete batch then press OK")) {
      dispatch(deleteBatch(id));
    }
  };
  // clear State
  const clearState = () => {
    setProgram("");
    setBatch("");
    setPecType("");
    setErrors({});
    setData([]);
    setFile({});
    setCategory("");
  };

  // process CSV data
  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }

    setData(list);
  };

  // handle file upload
  const handleFileUpload = csv => {
    setFile(csv);
    const file = csv;
    const reader = new FileReader();
    reader.onload = evt => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  // delete Pec Type
  const deletePECFunc = id => {
    // const verify = confirm("Do You want to delete PEC type then press OK");
    if (window.confirm("If You want to delete PEC type then press OK")) {
      dispatch(deletePECDocType(id));
    }
  };

  // download File Format
  const downloadCSVFIle = () => {
    const parentElement = document.getElementById("download-csv-file-format");
    const link = document.createElement("a");
    // link.href = "app-debug.apk";
    link.href = `https://files-uni.s3.us-east-2.amazonaws.com/formate.csv`;
    link.setAttribute("download", "formate.csv");
    parentElement.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };
  return (
    <>
      <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Add User" className="text-sm-left" />
        </Row>
        <Row>
          <Col md="4" lg="4" sm="6">
            <div className="admin-dashboard-file-container">
              <label style={{ display: "block" }}>
                Add Users (only csv file)
              </label>
              <CustomFileUpload file={file} setFile={handleFileUpload} />
              {data.length > 0 ? (
                <Button
                  onClick={e => dispatch(createMultipleUsers(data, clearState))}
                >
                  Upload
                </Button>
              ) : null}
              <Button
                id="download-csv-file-format"
                type="button"
                onClick={() => downloadCSVFIle()}
              >
                File Format (CSV)
              </Button>
            </div>
          </Col>
        </Row>

        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Users" className="text-sm-left" />
        </Row>
        <Row className="my-2">
          <Col lg="4" md="4" sm="6">
            <Card className=" admin-user-cards bg-blueShade">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h2 className="mb-2">
                    {" "}
                    {users.length > 0
                      ? `${
                          users.filter(user => user.role === "student").length
                        }`
                      : "00"}
                  </h2>
                  <p className="m-0">Student</p>
                </div>
                <div>
                  <ion-icon name="person"></ion-icon>
                </div>
              </div>
              <Link to="/user-data">
                <div
                  className="w-100 d-flex align-items-center justify-content-center py-1 "
                  style={{ cursor: "pointer" }}
                >
                  More Info
                </div>
              </Link>
            </Card>
          </Col>
          <Col lg="4" md="4" sm="6">
            <Card className="admin-user-cards bg-greenShade">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h2 className="mb-2">
                    {" "}
                    {users.length > 0
                      ? `${
                          users.filter(user => user.role === "faculty").length
                        }`
                      : "00"}
                  </h2>
                  <p className="m-0">Faculty</p>
                </div>
                <div>
                  <ion-icon name="person"></ion-icon>
                </div>
              </div>
              <Link to="/user-faculty">
                <div
                  className="w-100 d-flex align-items-center justify-content-center py-1 "
                  style={{ cursor: "pointer" }}
                >
                  More Info
                </div>
              </Link>
            </Card>
          </Col>
          <Col lg="4" md="4" sm="6">
            <Card className="admin-user-cards bg-redShade">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h2 className="mb-2">
                    {" "}
                    {users.length > 0
                      ? `${
                          users.filter(user => user.role === "coordinator")
                            .length
                        }`
                      : "00"}
                  </h2>
                  <p className="m-0">Coordinator</p>
                </div>
                <div>
                  <ion-icon name="person"></ion-icon>
                </div>
              </div>
              <Link to="/user-coord">
                <div
                  className="w-100 d-flex align-items-center justify-content-center py-1 "
                  style={{ cursor: "pointer" }}
                >
                  More Info
                </div>
              </Link>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="Faculty" className="text-sm-left" />
            </Row>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Faculty</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3 admin-dashboard-table-h ">
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
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter(user => user.role === "faculty").length >
                    0 ? (
                      users
                        .filter(user => user.role === "faculty")
                        .map((user, i) => (
                          <tr key={user._id}>
                            <td>{i + 1}</td>
                            <td>{user.name}</td>
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
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="Coordinator" className="text-sm-left" />
            </Row>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Coordinator</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3 admin-dashboard-table-h">
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
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter(user => user.role === "coordinator").length >
                    0 ? (
                      users
                        .filter(user => user.role === "coordinator")
                        .map((user, i) => (
                          <tr key={user._id}>
                            <td>{i + 1}</td>
                            <td>{user.name}</td>
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
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Complains" className="text-sm-left" />
        </Row>
        <Row className="my-2">
          <Col lg="4" md="4" sm="6">
            <Card className="admin-dashboard-cards">
              <Row>
                <Col xs="4" className="item-col-qty">
                  {complains.length > 0 ? complains.length : "00"}
                </Col>
                <Col xs="8" className="item-col-name justify-content-start">
                  <div className="item-name">
                    <p className="m-0">Total</p>
                    <span className="m-0 text-mute">Complain</span>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg="4" md="4" sm="6">
            <Card className="admin-dashboard-cards">
              <Row>
                <Col xs="4" className="item-col-qty color-green ">
                  {complains.length > 0
                    ? complains.filter(compl => compl.status === "pending")
                        .length
                    : "00"}
                </Col>
                <Col xs="8" className="item-col-name justify-content-start">
                  <div className="item-name">
                    <p className="m-0 color-green">Pending</p>
                    <span className="m-0 text-mute">Complain</span>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg="4" md="4" sm="6">
            <Card className="admin-dashboard-cards">
              <Row>
                <Col xs="4" className="item-col-qty  color-blue">
                  {complains.length > 0
                    ? complains.filter(compl => compl.status === "complete")
                        .length
                    : "00"}
                </Col>
                <Col xs="8" className="item-col-name justify-content-start">
                  <div className="item-name">
                    <p className="m-0  color-blue">Complete</p>
                    <span className="m-0 text-mute">Complain</span>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col lg="4" md="4" sm="6">
            <Card className="admin-dashboard-cards">
              <Row>
                <Col xs="4" className="item-col-qty color-red">
                  {complains.length > 0
                    ? complains.filter(compl => compl.complainFor === "admin")
                        .length
                    : "00"}
                </Col>
                <Col xs="8" className="item-col-name justify-content-start">
                  <div className="item-name">
                    <p className="m-0 color-red">For Admin</p>
                    <span className="m-0 text-mute">Complain</span>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg="4" md="4" sm="6">
            <Card className="admin-dashboard-cards">
              <Row>
                <Col xs="4" className="item-col-qty  color-orange">
                  {complains.length > 0
                    ? complains.filter(compl => compl.complainFor === "faculty")
                        .length
                    : "00"}
                </Col>
                <Col
                  xs="8"
                  className="item-col-name justify-content-start color-orange"
                >
                  <div className="item-name">
                    <p className="m-0 color-orange">For Faculty</p>
                    <span className="m-0 text-mute">Complain</span>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg="4" md="4" sm="6">
            <Card className="admin-dashboard-cards">
              <Row>
                <Col xs="4" className="item-col-qty color-green">
                  {complains.length > 0
                    ? complains.filter(
                        compl => compl.complainFor === "coordinator"
                      ).length
                    : "00"}
                </Col>
                <Col xs="8" className="item-col-name justify-content-start">
                  <div className="item-name">
                    <p className="m-0 color-green">For Coordinator</p>
                    <span className="m-0 text-mute">Complain</span>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row noGutters className="page-header py-2">
          <PageTitle sm="4" title="News & Updates" className="text-sm-left" />
        </Row>
        <Row className="my-4">
          <Col lg="4" md="4" sm="6">
            <Card className="admin-dashboard-cards">
              <Row>
                <Col xs="4" className="item-col-qty">
                  {news.length > 0 ? "0" + news.length : "00"}
                </Col>
                <Col xs="8" className="item-col-name justify-content-start">
                  <div className="item-name">
                    <p className="m-0">Total</p>
                    <span className="m-0 text-mute">News & Updates</span>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Row noGutters className="page-header py-2">
              <PageTitle sm="4" title="Events" className="text-sm-left" />
            </Row>
            <Row className="my-5">
              <Col md="6">
                <Card className="admin-dashboard-cards p-0">
                  <Row>
                    <Col xs="4" className="item-col-qty">
                      {events.length > 0 ? "0" + events.length : "00"}
                    </Col>
                    <Col xs="8" className="item-col-name justify-content-start">
                      <div className="item-name">
                        <p className="m-0">Total</p>
                        <span className="m-0 text-mute">Events</span>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col md="4">
            <Calendar />
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="Programs" className="text-sm-left" />
            </Row>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Programs</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3 admin-dashboard-table-h ">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Sr#
                      </th>
                      <th scope="col" className="border-0">
                        Program
                      </th>
                      <th scope="col" className="border-0">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {programAndBatch.programs.length > 0 ? (
                      programAndBatch.programs.map((pro, i) => (
                        <tr key={pro._id}>
                          <td>{i + 1}</td>
                          <td>{pro.program}</td>
                          <td>
                            <Button
                              className="btn btn-danger"
                              onClick={() => deleteProgramFunc(pro._id)}
                            >
                              Delete
                            </Button>
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
            <Row noGutters className="page-header py-2">
              <PageTitle sm="4" title="New Program" className="text-sm-left" />
            </Row>
            <Card small className="mb-3">
              <CardBody>
                <Row className="mb-4">
                  <Col md="8">
                    <label>Program</label>
                    <FormInput
                      type="text"
                      placeholder="Program"
                      value={program}
                      onChange={e => setProgram(e.target.value)}
                      required
                      invalid={errors.program && true}
                    />
                    {errors.program && (
                      <FormFeedback className="mb-2">
                        {errors.program}
                      </FormFeedback>
                    )}
                  </Col>
                </Row>
                <Button onClick={() => createProgramFunc()}>Add</Button>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="Batchs" className="text-sm-left" />
            </Row>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Batchs</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3 admin-dashboard-table-h ">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Sr#
                      </th>
                      <th scope="col" className="border-0">
                        Batch
                      </th>
                      <th scope="col" className="border-0">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {programAndBatch.batchs.length > 0 ? (
                      programAndBatch.batchs.map((bat, i) => (
                        <tr key={bat._id}>
                          <td>{i + 1}</td>
                          <td>{bat.batch}</td>
                          <td>
                            <Button
                              className="btn btn-danger"
                              onClick={() => deleteBatchFunc(bat._id)}
                            >
                              Delete
                            </Button>
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
            <Row noGutters className="page-header py-2">
              <PageTitle sm="4" title="New Batch" className="text-sm-left" />
            </Row>
            <Card small className="mb-4">
              <CardBody>
                <Row className="mb-4">
                  <Col md="8">
                    <label>Batch</label>
                    <FormInput
                      type="text"
                      placeholder="Batch"
                      value={batch}
                      onChange={e => setBatch(e.target.value)}
                      required
                      invalid={errors.batch && true}
                    />
                    {errors.batch && (
                      <FormFeedback className="mb-2">
                        {errors.batch}
                      </FormFeedback>
                    )}
                  </Col>
                </Row>
                <Button onClick={() => createBatchFunc()}>Add</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="PEC Type" className="text-sm-left" />
            </Row>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">PEC Type</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3 admin-dashboard-table-h ">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Sr#
                      </th>
                      <th scope="col" className="border-0">
                        Type
                      </th>
                      <th scope="col" className="border-0">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pecTypes.length > 0 ? (
                      pecTypes.map((type, i) => (
                        <tr key={type._id}>
                          <td>{i + 1}</td>
                          <td>{type.type}</td>
                          <td>
                            <Button
                              className="btn btn-danger"
                              onClick={() => deletePECFunc(type._id)}
                            >
                              Delete
                            </Button>
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
            <Row noGutters className="page-header py-2">
              <PageTitle sm="4" title="PEC Type" className="text-sm-left" />
            </Row>
            <Card small className="mb-3">
              <CardBody>
                <Row className="mb-4">
                  <Col md="8">
                    <label>PEC Type</label>
                    <FormInput
                      type="text"
                      placeholder="PEC Type"
                      value={pecType}
                      onChange={e => setPecType(e.target.value)}
                    />
                  </Col>
                </Row>
                <Button
                  onClick={() =>
                    dispatch(createPECDocType({ type: pecType }, clearState))
                  }
                >
                  Add
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="FYP Category" className="text-sm-left" />
            </Row>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">FYP Category</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3 admin-dashboard-table-h ">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Sr#
                      </th>
                      <th scope="col" className="border-0">
                        Category
                      </th>
                      <th scope="col" className="border-0">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fypCategory.length > 0 ? (
                      fypCategory.map((type, i) => (
                        <tr key={type._id}>
                          <td>{i + 1}</td>
                          <td>{type.category}</td>
                          <td>
                            <Button
                              className="btn btn-danger"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "If you want to delete category then press OK!"
                                  )
                                ) {
                                  dispatch(deleteFYPCategory(type._id));
                                }
                              }}
                            >
                              Delete
                            </Button>
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
            <Row noGutters className="page-header py-2">
              <PageTitle sm="4" title="FYP Category" className="text-sm-left" />
            </Row>
            <Card small className="mb-3">
              <CardBody>
                <Row className="mb-4">
                  <Col md="8">
                    <label>FYP Category</label>
                    <FormInput
                      type="text"
                      placeholder="category"
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                    />
                  </Col>
                </Row>
                <Button
                  onClick={() =>
                    dispatch(
                      createFYPCategory(
                        { category: category.toLowerCase() },
                        clearState
                      )
                    )
                  }
                >
                  Add
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Row noGutters className="page-header py-4">
              <PageTitle sm="4" title="FYP" className="text-sm-left" />
            </Row>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">FYP</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3 admin-dashboard-table-h ">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Sr#
                      </th>
                      <th scope="col" className="border-0">
                        FYP
                      </th>
                      <th scope="col" className="border-0">
                        Batch
                      </th>
                      <th scope="col" className="border-0">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {names.length > 0 ? (
                      names.map((fyp, i) => (
                        <tr key={fyp._id}>
                          <td>{i + 1}</td>
                          <td>{fyp.eventName}</td>
                          <td>{fyp.batch}</td>
                          <td>
                            <Button
                              className="btn btn-danger"
                              onClick={() => dispatch(deleteFYP(fyp._id))}
                            >
                              Delete
                            </Button>
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
        {loadingUser === true ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : null}
      </Container>
    </>
  );
};
export default AdminDashBoard;
