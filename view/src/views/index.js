import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import AnimatedSlider from "../utils/AnimatedSlider";
import ItemsSlider from "../utils/ItemsSlider";
import ReactQuill from "react-quill";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Modal,
  ModalBody
} from "shards-react";
// images
import sectionTop from "../images/page-top-62x41.png";
import sectionBottom from "../images/page-bottom-110x27.png";
// action
import { getSlides } from "../actions/sliderAction";
import { getUsers } from "../actions/authActions";
import { getNews } from "../actions/newsAndUpdatesAction";
import { getPublicEvents } from "../actions/eventsAction";
import { getQuotes } from "../actions/quoteAction";
// component
import MainFooter from "../components/layout/MainFooter";
const Index = props => {
  const [eventModal, setEventModal] = useState(true);
  const [activeUserClass, setActiveUserClass] = useState(
    "currently-active-user"
  );
  // get state from store
  const slides = useSelector(state => state.slider.slides);
  const users = useSelector(state => state.auth.users);
  const auth = useSelector(state => state.auth);
  const news = useSelector(state => state.news.news);
  const events = useSelector(state => state.events.privateEvents);
  const quotes = useSelector(state => state.quote.quotes);
  console.log(auth);
  // initialize useDispatch()
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    dispatch(getSlides());
    dispatch(getUsers());
    dispatch(getNews());
    dispatch(getPublicEvents());
    dispatch(getQuotes());
  }, []);
  useEffect(() => {
    setInterval(() => {
      setActiveUserClass("currently-active-user-effect currently-active-user");
      setTimeout(() => {
        setActiveUserClass("currently-active-user");
      }, 4000);
    }, 10000);
    // if (auth.isAuthenticated) {

    // }
  }, []);
  // get formate date
  const getFullyFormateDate = fullDate => {
    const date = new Date(fullDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}-${month + 1}-${year}`;
  };
  return (
    <>
      <div className="position-relative" style={{ position: "relative" }}>
        <div className={activeUserClass}>
          <div>
            <div style={{ lineHeight: "14px" }}>
              <span>Engr. Maryam Iqbal</span>
              <br />
              <small>Supervisor</small>
            </div>
            <div style={{ lineHeight: "14px", marginTop: "10px" }}>
              <span>Bilal Waris</span>
              <br />
              <small>Developer</small>
            </div>
            <div style={{ lineHeight: "14px", marginTop: "10px" }}>
              <span>Farzeen Tariq</span>
              <br />
              <small>Developer</small>
            </div>
          </div>
        </div>
        {slides.length > 0 ? (
          <AnimatedSlider slides={slides} />
        ) : (
          <Skeleton count={1} height="70vh" width="100%" />
        )}

        <Container>
          <div className="d-flex justify-content-center align-item-center mt-4 pt-4">
            <img src={sectionTop} alt="section-top" />
          </div>
          <div className="my-4 d-flex justify-content-center align-item-center">
            <h3 className="section-heading">Our Community</h3>
          </div>
          <div className="my-4 py-4">
            <Row>
              <Col
                md="4"
                className="d-flex justify-content-center align-item-center flex-column"
              >
                <h1 style={{ textAlign: "center", margin: "0" }}>
                  {users.length > 0
                    ? `0${users.filter(user => user.role === "student").length}`
                    : "00"}
                </h1>
                <h3 style={{ textAlign: "center" }}>Student</h3>
              </Col>
              <Col
                md="4"
                className="d-flex justify-content-center align-items-center flex-column"
              >
                <h1 style={{ textAlign: "center", margin: "0" }}>
                  {users.length > 0
                    ? `0${users.filter(user => user.role === "faculty").length}`
                    : "00"}
                </h1>
                <h3 style={{ textAlign: "center" }}>Professors</h3>
              </Col>
              <Col
                md="4"
                className="d-flex justify-content-center align-items-center flex-column"
              >
                <h1 style={{ textAlign: "center", margin: "0" }}>
                  {users.length > 0
                    ? `0${
                        users.filter(user => user.role === "coordinator").length
                      }`
                    : "00"}
                </h1>
                <h3 style={{ textAlign: "center" }}>Coordinator</h3>
              </Col>
            </Row>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-4 pt-4">
            <img src={sectionBottom} alt="section-top" />
          </div>
          <div className="d-flex justify-content-center align-items-center mt-4 pt-4">
            <img src={sectionTop} alt="section-top" />
          </div>
          <div className="my-4 d-flex justify-content-center align-items-center">
            <h3 className="section-heading">News & Updates</h3>
          </div>
          <div className="my-4 py-4">
            <Row>
              {news.length > 0 ? (
                news.map(news => (
                  <Col
                    key={news._id}
                    md="4"
                    className="my-4 d-flex justify-content-center align-items-center index-page-news"
                  >
                    <Card style={{ width: "300px" }}>
                      <CardBody>
                        <CardTitle>{news.title}</CardTitle>
                        <ReactQuill
                          readOnly
                          value={news.body}
                          toolbar={false}
                        />
                        <span
                          className="text-muted"
                          style={{ marginTop: "10px" }}
                        >
                          {getFullyFormateDate(news.createdAt)}
                        </span>
                      </CardBody>
                    </Card>
                  </Col>
                ))
              ) : (
                <Row className="justify-content-center m-0 w-100">
                  <Col
                    md="3"
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Skeleton count={1} height="300px" width="220px" />
                  </Col>
                  <Col
                    md="3"
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Skeleton count={1} height="300px" width="220px" />
                  </Col>
                  <Col
                    md="3"
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Skeleton count={1} height="300px" width="220px" />
                  </Col>
                  <Col
                    md="3"
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Skeleton count={1} height="300px" width="220px" />
                  </Col>
                </Row>
              )}
            </Row>
          </div>
        </Container>
        <div className="d-flex justify-content-center align-item-center my-4 py-4">
          <img src={sectionBottom} alt="section-top" />
        </div>
        {quotes.filter(quote => quote.display === true).length > 0
          ? quotes
              .filter(quote => quote.display === true)
              .map((quote, i) =>
                i < 1 ? (
                  <div
                    className="py-4 my-4"
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      backgroundColor: "#1976d2"
                    }}
                  >
                    <Container>
                      <h3
                        style={{
                          color: "#fff",
                          padding: "30px 0",
                          margin: "0"
                        }}
                      >
                        {" "}
                        {quote.body}
                      </h3>
                    </Container>
                  </div>
                ) : null
              )
          : null}

        <div className="d-flex justify-content-center align-item-center mt-4 pt-4">
          <img src={sectionTop} alt="section-top" />
        </div>
        <Container>
          <div className="my-4 d-flex justify-content-center align-item-center">
            <h3 className="section-heading">Our Members</h3>
          </div>
          <div className="my-4 py-4">
            {users.length > 0 ? (
              <ItemsSlider users={users} />
            ) : (
              <Row className="justify-content-center m-0 w-100">
                <Col
                  md="3"
                  className="d-flex justify-content-center align-items-center"
                >
                  <Skeleton count={1} height="200px" width="200px" />
                </Col>
                <Col
                  md="3"
                  className="d-flex justify-content-center align-items-center"
                >
                  <Skeleton count={1} height="200px" width="200px" />
                </Col>
                <Col
                  md="3"
                  className="d-flex justify-content-center align-items-center"
                >
                  <Skeleton count={1} height="200px" width="200px" />
                </Col>
                <Col
                  md="3"
                  className="d-flex justify-content-center align-items-center"
                >
                  <Skeleton count={1} height="200px" width="200px" />
                </Col>
              </Row>
            )}
          </div>
          {events.filter(eve => eve.display === true).length > 0
            ? events
                .filter(eve => eve.display === true)
                .map((eve, i) =>
                  i < 1 ? (
                    <div className="event-popup">
                      <Modal
                        open={eventModal}
                        toggle={() => setEventModal(!eventModal)}
                      >
                        {/* <ModalHeader>Upcoming Event</ModalHeader> */}
                        <ModalBody>
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            {eve.fileName ? (
                              <img
                                src={`https://files-uni.s3.us-east-2.amazonaws.com/${eve.fileName}`}
                                alt="event-img"
                                width="75%"
                              />
                            ) : null}
                          </div>
                        </ModalBody>
                      </Modal>
                    </div>
                  ) : null
                )
            : null}
        </Container>
        <div className="d-flex justify-content-center align-item-center my-4 py-4">
          <img src={sectionBottom} alt="section-top" />
        </div>
      </div>
      <MainFooter />
    </>
  );
};
export default Index;
