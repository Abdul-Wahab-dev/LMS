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
  ModalBody
} from "shards-react";
import { useDispatch, useSelector } from "react-redux";
// react textarea
import ReactQuill from "react-quill";
// acton
import {
  getComplains,
  complainReply,
  setComplainStatus,
  deleteComplain
} from "../actions/complainAction";
import { studentData } from "../actions/authActions";
// page title
import PageTitle from "../components/common/PageTitle";
// custom editor
import Editor from "../components/add-new-post/Editor";
// loader
import Loader from "../utils/Loader";
// images
import eyeIcon from "../images/eye.png";
const AddNewPost = () => {
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);
  const [answer, setAnswer] = useState("");

  // initialize useDispatch
  const dispatch = useDispatch();
  // Get Errors state from store
  const Complains = useSelector(state => state.complain.complains);
  const loading = useSelector(state => state.complain.loading);
  const user = useSelector(state => state.auth.user);
  // UseEffect
  useEffect(() => {
    dispatch(getComplains());
    dispatch(studentData("2017-ag-8112"));
  }, []);
  // reply to complain
  const replyComp = e => {
    const obj = {
      id: data._id,
      reply: [
        {
          from: {
            userId: user.enrollmentNo,
            name: user.name
          },
          answer: answer.toLowerCase()
        }
      ]
    };
    dispatch(complainReply(obj, clearState));
  };

  // Complain Status
  const complainStatus = (id, status) => {
    const obj = {
      id,
      status
    };
    dispatch(setComplainStatus(obj));
  };

  //clear state
  const clearState = () => {
    setAnswer("");
  };

  // delete Complain
  const deleteComplainFunc = id => {
    if (window.confirm("If you want to delete Complain then press OK")) {
      dispatch(deleteComplain(id));
    }
  };
  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Your Complain"
          subtitle="Complain"
          className="text-sm-left"
        />
      </Row>
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Complains</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Sr#
                    </th>
                    <th scope="col" className="border-0">
                      Complain From
                    </th>
                    <th scope="col" className="border-0">
                      Complain To
                    </th>
                    <th scope="col" className="border-0">
                      Complain For
                    </th>

                    <th scope="col" className="border-0">
                      Title
                    </th>

                    <th scope="col" className="border-0">
                      Status
                    </th>

                    <th scope="col" className="border-0">
                      Detail
                    </th>
                    {user.role !== "student" ? (
                      <th scope="col" className="border-0">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {Complains.length > 0 ? (
                    Complains.map((complain, i) => (
                      <tr key={complain._id}>
                        <td>{i + 1}</td>
                        <td>{complain.from.complainerName}</td>
                        <td>{complain.to.complaineeName}</td>
                        <td>{complain.complainFor}</td>
                        <td>{complain.title}</td>
                        <td>{complain.status}</td>
                        <td>
                          <span
                            className="view-detail-icon"
                            onClick={() => {
                              setData(complain);
                              setModal(true);
                            }}
                          >
                            <img src={eyeIcon} alt="eye" width="18px" />
                          </span>
                        </td>
                        {user.role !== "student" ? (
                          <td>
                            <div className="d-flex align-item-center justify-content-center">
                              {complain.status !== "complete" ? (
                                <Button
                                  type="button"
                                  onClick={e =>
                                    complainStatus(complain._id, "complete")
                                  }
                                >
                                  process?
                                </Button>
                              ) : null}

                              {user.enrollmentNo ===
                              complain.to.complaineeId ? (
                                <Button
                                  type="button"
                                  className="btn btn-danger mx-2"
                                  onClick={e =>
                                    deleteComplainFunc(complain._id)
                                  }
                                >
                                  Delete
                                </Button>
                              ) : null}
                            </div>
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
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="New Complain"
          subtitle="Complain"
          className="text-sm-left"
        />
      </Row>

      <Row>
        <Col lg="9" md="12">
          <Editor for="complains" title="Complain TO" />
        </Col>
      </Row>
      <Modal open={modal} toggle={() => setModal(!modal)}>
        <ModalHeader>Complain</ModalHeader>
        <ModalBody>
          <div className="complain-modal-container">
            <h5>Title</h5>
            <p>{data.title ? data.title : ""}</p>
            <h5>Body</h5>

            <ReactQuill value={data.body ? data.body : ""} readOnly />
            <h5 className="mt-3">Reply</h5>
            {data.reply
              ? data.reply.map(reply => (
                  <>
                    <strong key={reply._id}>
                      <small>
                        {reply.from.name}
                        {""} :{" "}
                      </small>
                    </strong>
                    <p style={{ margin: "0" }}>{reply.answer}</p>
                  </>
                ))
              : null}
            <FormInput
              placeholder="reply..."
              className="my-3"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
            />
            <Button type="button" className="my-2" onClick={e => replyComp(e)}>
              reply
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

export default AddNewPost;
