import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardHeader,
  Card,
  Button
} from "shards-react";
import { useDispatch, useSelector } from "react-redux";
// custom editor
import Editor from "../components/add-new-post/Editor";
// page title
import PageTitle from "../components/common/PageTitle";
// action
import { getDocuments, deleteOfficalDoc } from "../actions/officalDocs";
// loader
import Loader from "../utils/Loader";
// download file on click function
import downloadFile from "../utils/downloadFile";

const OfficalDocs = props => {
  // get state from store
  const loading = useSelector(state => state.officalDocs.loading);
  const documents = useSelector(state => state.officalDocs.documents);
  const auth = useSelector(state => state.auth.user);
  // initialize useDispatch()
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    dispatch(getDocuments());
  }, []);
  // convert date to local date
  const convertToLocalDateFormat = date => {
    const localDate = new Date(`${date}`);
    return localDate.toLocaleDateString();
  };

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Offical Douments"
          subtitle="Document"
          className="text-sm-left"
        />
      </Row>
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Documents</h6>
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
                      Date
                    </th>
                    {auth.role === "coordinator" || auth.role === "admin" ? (
                      <th scope="col" className="border-0">
                        Action
                      </th>
                    ) : null}
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
                          {doc.from.providerId}
                        </td>
                        <td>{convertToLocalDateFormat(doc.createdAt)}</td>
                        {auth.enrollmentNo === doc.from.providerId ||
                        auth.role === "admin" ? (
                          <td>
                            <Button
                              className="btn btn-danger"
                              onClick={() =>
                                dispatch(deleteOfficalDoc(doc._id))
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
              title="New Document"
              subtitle="Documents"
              className="text-sm-left"
            />
          </Row>
          <Row>
            <Col lg="9" md="12">
              <Editor for="documents" title="Documnets For" />
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
export default OfficalDocs;
