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
  FormSelect,
  Button,
  ModalBody
} from "shards-react";
import { useDispatch, useSelector } from "react-redux";
// custom editor
import Editor from "../components/add-new-post/Editor";
// page title
import PageTitle from "../components/common/PageTitle";

// action
import {
  getDocuments,
  deletePECDocument,
  addPECWork,
  getPECDocType,
  addPECRemarks
} from "../actions/pecAction";
// loader
import Loader from "../utils/Loader";
// custom file uploader
import CustomFileUpload from "../components/components-overview/CustomFileUpload";
// download file on click function
import downloadFile from "../utils/downloadFile";

const PECDocs = props => {
  const [file, setFile] = useState({});
  const [addWorkModal, setAddWorkModal] = useState(false);
  const [viewAssignmentsModal, setViewAssignmentsModal] = useState(false);
  const [id, setId] = useState("");
  const [remarksModal, setRemarksModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState("");
  const [stuAssignmentData, setStuAssignmentData] = useState({});
  const [searchByType, setSearchByType] = useState("");
  // get state from store
  const loading = useSelector(state => state.pec.loading);
  const documents = useSelector(state => state.pec.documents);
  const pecTypes = useSelector(state => state.pec.pecDocType);
  const auth = useSelector(state => state.auth.user);
  // initialize useDispatch()
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    if (auth.role === "student") {
      dispatch(getDocuments(searchByType.toLowerCase()));
    } else {
      dispatch(getPECDocType());
    }
  }, []);
  // get formate date
  const convertToLocalDateFormat = date => {
    const localDate = new Date(`${date}`);
    return localDate.toLocaleDateString();
  };
  // submit work
  const addworkFunc = () => {
    const workObj = {
      id: id,
      work: {
        enrollmentNo: auth.enrollmentNo,
        name: auth.name
      }
    };
    dispatch(addPECWork(workObj, file, clearState));
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
    dispatch(addPECRemarks(remarksObj, clearState));
  };
  // clear states
  const clearState = () => {
    setFile({});
    setStuAssignmentData({});
    setRemarksModal(false);
    setMessage("");
    setRemarks("");
    setAddWorkModal(false);
  };
  return (
    <Container fluid className="main-content-container px-4 pb-4 complain-page">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="PEC Douments"
          subtitle="PEC"
          className="text-sm-left"
        />
      </Row>
      {auth.permissions.PEC.read === true ? (
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                {auth.role === "student" ? (
                  <h6 className="m-0">Documents</h6>
                ) : (
                  <Row>
                    <Col md="3">
                      <label>Type</label>
                      <FormSelect
                        value={searchByType}
                        onChange={e => setSearchByType(e.target.value)}
                      >
                        <option value="">Choose...</option>
                        {pecTypes.length > 0
                          ? pecTypes.map(type => (
                              <option key={type._id} value={type.type}>
                                {type.type}{" "}
                              </option>
                            ))
                          : null}
                      </FormSelect>
                    </Col>
                    <Col md="3" className="pt-2">
                      <Button
                        type="button"
                        className="mt-4 mt-md"
                        onClick={() =>
                          dispatch(getDocuments(searchByType.toLowerCase()))
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
                        Document Title
                      </th>
                      <th scope="col" className="border-0">
                        Document
                      </th>
                      <th scope="col" className="border-0">
                        Provider by
                      </th>
                      <th scope="col" className="border-0">
                        Submission Date
                      </th>
                      <th scope="col" className="border-0">
                        Action / work
                      </th>
                      {documents &&
                        documents.map(doc =>
                          doc.docSubmittedBy.filter(
                            ass => ass.enrollmentNo === auth.enrollmentNo
                          ).length > 0 ? (
                            <th key={doc._id} scope="col" className="border-0">
                              Remarks
                            </th>
                          ) : null
                        )}
                    </tr>
                  </thead>
                  <tbody>
                    {documents.length > 0 ? (
                      documents.map((doc, i) => (
                        <tr key={doc._id}>
                          <td>{i + 1}</td>
                          <td>{doc.title}</td>
                          <td
                            onClick={e =>
                              doc.fileName
                                ? downloadFile("download-file", doc.fileName)
                                : null
                            }
                            id="download-file"
                          >
                            {" "}
                            {doc.fileName ? (
                              <span
                                style={{
                                  cursor: "pointer",
                                  textDecoration: "underline"
                                }}
                              >
                                {" "}
                                {doc.fileName}
                              </span>
                            ) : (
                              "No Document"
                            )}
                          </td>
                          <td>
                            {doc.from.providerName} <br />
                          </td>
                          <td>{convertToLocalDateFormat(doc.createdAt)}</td>

                          <td id="download-file-stu-assignment">
                            {doc.docSubmittedBy.length > 0 &&
                            doc.docSubmittedBy.filter(
                              assi => assi.enrollmentNo === auth.enrollmentNo
                            ).length > 0 ? (
                              <span
                                style={{
                                  cursor: "pointer",
                                  textDecoration: "underline"
                                }}
                              >
                                {doc.docSubmittedBy.length > 0 &&
                                  doc.docSubmittedBy
                                    .filter(
                                      assi =>
                                        assi.enrollmentNo ===
                                          auth.enrollmentNo &&
                                        assi.enrollmentNo !==
                                          doc.from.providerId
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
                            ) : auth.role === "student" ? (
                              <Button
                                className="btn"
                                type="button"
                                onClick={() => {
                                  setId(doc._id);
                                  setAddWorkModal(true);
                                }}
                              >
                                Add Work
                              </Button>
                            ) : null}
                            {auth.enrollmentNo === doc.from.providerId ||
                            auth.role !== "student" ? (
                              <>
                                <Button
                                  className="btn mr-3"
                                  onClick={() => {
                                    setId(doc._id);
                                    setViewAssignmentsModal(true);
                                  }}
                                >
                                  Check
                                </Button>
                                <Button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "If you want to delete PEC then press OK"
                                      )
                                    ) {
                                      dispatch(deletePECDocument(doc._id));
                                    }
                                  }}
                                >
                                  Delete
                                </Button>
                              </>
                            ) : null}
                          </td>

                          {doc.docSubmittedBy && doc.docSubmittedBy.length > 0
                            ? doc.docSubmittedBy.map(ass =>
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
      ) : null}

      {(auth.role !== "student" && auth.permissions.PEC.write === true) ||
      auth.role === "admin" ? (
        <>
          {" "}
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="New Document"
              subtitle="PEC"
              className="text-sm-left"
            />
          </Row>
          <Row>
            <Col lg="9" md="12">
              <Editor for="pec" title="Documnets For" />
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

      {viewAssignmentsModal !== true ? (
        <Modal
          open={viewAssignmentsModal}
          toggle={() => setViewAssignmentsModal(!viewAssignmentsModal)}
          className="modal-1"
        >
          <ModalBody>
            {remarksModal === true ? (
              <div className="my-4">
                x``
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
            <table
              className="table md-table-width mb-0 mt-4"
              style={{ width: "100%" }}
            >
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
                {documents.filter(doc => doc._id === id).length > 0 ? (
                  documents
                    .filter(doc => doc._id === id)
                    .map(doc =>
                      doc.docSubmittedBy.length > 0 ? (
                        doc.docSubmittedBy.map((ass, i) => (
                          <tr key={ass._id}>
                            <td>{i + 1}</td>
                            <td>{ass.name}</td>
                            <td>{ass.enrollmentNo}</td>
                            <td id="download-file-pec-submitby-stu">
                              {ass.fileName ? (
                                <span
                                  style={{
                                    cursor: "pointer",
                                    textDecoration: "underline"
                                  }}
                                  onClick={() =>
                                    downloadFile(
                                      "download-file-pec-submitby-stu",
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
export default PECDocs;
