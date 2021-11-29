/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, CardBody, Button } from "shards-react";
// page title
import PageTitle from "../components/common/PageTitle";
// custom editor
import Editor from "../components/add-new-post/Editor";
// react text area
import ReactQuill from "react-quill";
// loader
import Loader from "../utils/Loader";
// action
import { getNews, deleteNews } from "../actions/newsAndUpdatesAction";
const BlogPosts = () => {
  // initialize useDispatch
  const dispatch = useDispatch();
  // Get Errors state from store
  const news = useSelector(state => state.news);
  const auth = useSelector(state => state.auth.user);
  // useEffect
  useEffect(() => {
    dispatch(getNews());
  }, []);
  // convert date to local date
  const convertToLocalDateFormat = date => {
    const localDate = new Date(`${date}`);
    return localDate.toLocaleDateString();
  };

  // delete news
  const deleteNewsFunc = id => {
    if (window.confirm("If you want to delete NEWS then press OK")) {
      dispatch(deleteNews(id));
    }
  };
  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="News & Updates"
          subtitle="Components"
          className="text-sm-left"
        />
      </Row>
      <Row>
        {news.news.length > 0 ? (
          news.news.map((latestNews, i) => (
            <Col lg="6" sm="12" className="mb-4" key={latestNews._id}>
              <Card small className="card-post card-post--aside card-post--1">
                <CardBody>
                  <h5 className="card-title">
                    <span className="text-fiord-blue">{latestNews.title}</span>
                  </h5>
                  <p
                    className="card-text d-inline-block mb-3"
                    id={latestNews._id}
                  >
                    <ReactQuill
                      readOnly
                      value={latestNews.body}
                      toolbar={false}
                    />
                  </p>
                  <br />

                  <span className="text-muted">
                    {convertToLocalDateFormat(latestNews.createdAt)}
                  </span>
                  <br />
                  {auth.enrollmentNo === latestNews.createBy.userID ||
                  auth.role === "admin" ? (
                    <Button
                      className="btn btn-danger mt-3"
                      onClick={() => deleteNewsFunc(latestNews._id)}
                    >
                      Delete
                    </Button>
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          ))
        ) : (
          <h5 className="px-3">No Record</h5>
        )}
      </Row>
      {(auth.role !== "student" &&
        auth.permissions &&
        auth.permissions.NEWS.write === true) ||
      auth.role === "admin" ? (
        <>
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="Create News"
              subtitle="news"
              className="text-sm-left"
            />
          </Row>

          <Row>
            <Col lg="9" md="12">
              <Editor for="news" title="News For" />
            </Col>
          </Row>
        </>
      ) : null}

      {news.loading === true ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : null}
    </Container>
  );
};

export default BlogPosts;
