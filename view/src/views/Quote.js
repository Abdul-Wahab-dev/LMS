import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardHeader,
  Card,
  Button,
  Form,
  FormInput
} from "shards-react";
import { useDispatch, useSelector } from "react-redux";
// Actons
import {
  createQuote,
  getQuotes,
  deleteQuote,
  updateQuote
} from "../actions/quoteAction";
// Page Title
import PageTitle from "../components/common/PageTitle";
// Loader
import Loader from "../utils/Loader";

const Quotes = () => {
  const [body, setBody] = useState("");
  // initialize useDispatch
  const dispatch = useDispatch();
  // Get state from store
  const quotes = useSelector(state => state.quote.quotes);
  const loading = useSelector(state => state.quote.loading);
  const user = useSelector(state => state.auth.user);

  // UseEffect
  useEffect(() => {
    dispatch(getQuotes());
  }, []);

  // create Quote
  const createQuoteFunc = () => {
    const quoteObj = {
      Provider: {
        providerId: user.enrollmentNo,
        providerName: user.name
      },
      body
    };
    dispatch(createQuote(quoteObj, clearState));
  };

  const clearState = () => {
    setBody("");
  };
  return (
    <Container fluid className="main-content-container px-4 pb-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Quotes"
          subtitle="Quote"
          className="text-sm-left"
        />
      </Row>
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Quotes</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Sr#
                    </th>
                    <th scope="col" className="border-0">
                      Quote
                    </th>
                    <th scope="col" className="border-0">
                      Created By
                    </th>

                    <th scope="col" className="border-0">
                      Status
                    </th>
                    <th scope="col" className="border-0">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.length > 0 ? (
                    quotes.map((eve, i) => (
                      <tr key={eve._id}>
                        <td>{i + 1}</td>
                        <td>{eve.body}</td>
                        <td>
                          {eve.Provider.providerName}
                          <br />
                          {eve.Provider.providerId}
                        </td>

                        <td>
                          {user.role === "admin" ? (
                            eve.display === true ? (
                              <Button
                                className="btn btn-secondary"
                                type="button"
                                onClick={() =>
                                  dispatch(
                                    updateQuote({ id: eve._id, display: false })
                                  )
                                }
                              >
                                Hide
                              </Button>
                            ) : (
                              <Button
                                className="btn "
                                type="button"
                                onClick={() =>
                                  dispatch(
                                    updateQuote({ id: eve._id, display: true })
                                  )
                                }
                              >
                                Show
                              </Button>
                            )
                          ) : eve.display === true ? (
                            "Show"
                          ) : (
                            "Hide"
                          )}
                        </td>
                        <td>
                          {user.role === "admin" ||
                          eve.Provider.providerId === user.enrollmentNo ? (
                            <Button
                              className="btn btn-danger"
                              type="button"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "If you want to delete Quote then press OK"
                                  )
                                ) {
                                  dispatch(deleteQuote(eve._id));
                                }
                              }}
                            >
                              Delete
                            </Button>
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
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="New Quote"
          subtitle="Quote"
          className="text-sm-left"
        />
      </Row>

      <Row>
        <Col lg="9" md="12">
          <Card small>
            <CardBody>
              <Form>
                <Row>
                  <Col md="8">
                    <label>Quote</label>
                    <FormInput
                      placeholder="Quote"
                      value={body}
                      onChange={e => setBody(e.target.value)}
                    />
                  </Col>
                </Row>
                {body.length > 1 ? (
                  <Button className="my-4" onClick={() => createQuoteFunc()}>
                    Create Quote
                  </Button>
                ) : null}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {loading === true ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : null}
    </Container>
  );
};

export default Quotes;
