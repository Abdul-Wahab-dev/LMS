import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardHeader,
  Card,
  FormInput,
  Button,
  Form
} from "shards-react";
import { useDispatch, useSelector } from "react-redux";
// Page Title
import PageTitle from "../components/common/PageTitle";
// Action
import { getSlides, deleteSlide, createSlide } from "../actions/sliderAction";
// Loader
import Loader from "../utils/Loader";
// Download File
import downloadFile from "../utils/downloadFile";
// custom File Uploader
import CustomFileUpload from "../components/components-overview/CustomFileUpload";

const Slider = props => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState({});
  // get states from store
  const loading = useSelector(state => state.slider.loading);
  const slides = useSelector(state => state.slider.slides);
  const auth = useSelector(state => state.auth.user);
  // initialize useDispatch()
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    dispatch(getSlides());
  }, []);
  // Create Slide
  const createFileFunc = () => {
    const fileObj = {
      title: title,
      body: body
    };
    dispatch(createSlide(fileObj, file, clearState));
  };

  // set states to empty
  const clearState = () => {
    setTitle("");
    setBody("");
    setFile({});
  };
  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Slides"
          subtitle="Slider"
          className="text-sm-left"
        />
      </Row>
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Slides</h6>
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
                      Image
                    </th>
                    <th scope="col" className="border-0">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {slides.length > 0 ? (
                    slides.map((slide, i) => (
                      <tr key={slide._id}>
                        <td>{i + 1}</td>
                        <td>{slide.title}</td>
                        <td
                          onClick={e =>
                            slide.fileName
                              ? downloadFile(
                                  "download-file-slide",
                                  slide.fileName
                                )
                              : null
                          }
                          id="download-file-slide"
                        >
                          {" "}
                          {slide.fileName ? (
                            <span
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline"
                              }}
                            >
                              {" "}
                              {slide.fileName}
                            </span>
                          ) : (
                            "No Document"
                          )}
                        </td>

                        <td>
                          <Button
                            className="btn btn-danger"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "If you want to delete Slide then press OK"
                                )
                              ) {
                                dispatch(deleteSlide(slide._id));
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
        </Col>
      </Row>
      {auth.role !== "student" ? (
        <>
          {" "}
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="New Slide"
              subtitle="Slider"
              className="text-sm-left"
            />
          </Row>
          <Card small className="mb-3">
            <CardBody>
              <Row>
                <Col lg="9" md="12">
                  <Form>
                    <Row className="my-3">
                      <Col md="4">
                        <label>Title</label>
                        <FormInput
                          type="text"
                          placeholder="Title"
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                        />
                      </Col>
                      <Col md="4">
                        <label>File</label>
                        <CustomFileUpload file={file} setFile={setFile} />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md="6">
                        <label>Body</label>
                        <FormInput
                          type="text"
                          placeholder="description"
                          value={body}
                          onChange={e => setBody(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <Button type="button" onClick={() => createFileFunc()}>
                      Create New
                    </Button>
                  </Form>
                </Col>
              </Row>
            </CardBody>
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
export default Slider;
