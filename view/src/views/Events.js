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
// Actons
import {
  getPrivateEvents,
  setDisplay,
  deleteEvent
} from "../actions/eventsAction";
// Page Title
import PageTitle from "../components/common/PageTitle";
// Custom Editor
import Editor from "../components/add-new-post/Editor";
// Loader
import Loader from "../utils/Loader";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const Events = () => {
  // initialize useDispatch
  const dispatch = useDispatch();
  // Get state from store
  const privateEvents = useSelector(state => state.events.privateEvents);
  const loading = useSelector(state => state.events.loading);
  const user = useSelector(state => state.auth.user);

  // UseEffect
  useEffect(() => {
    dispatch(getPrivateEvents());
  }, []);

  return (
    <Container fluid className="main-content-container px-4 pb-4 complain-page">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Events"
          subtitle="Event"
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
                      Title
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
                  {privateEvents.length > 0 ? (
                    privateEvents.map((eve, i) => (
                      <tr key={eve._id}>
                        <td>{i + 1}</td>
                        <td>{capitalizeFirstLetter(eve.eventName)}</td>
                        <td>
                          {capitalizeFirstLetter(
                            eve.eventProvider.providerName
                          )}
                          <br />
                          {eve.eventProvider.providerId}
                        </td>

                        <td>
                          {user.role === "admin" ? (
                            eve.display === true ? (
                              <Button
                                className="btn btn-secondary"
                                type="button"
                                onClick={() =>
                                  dispatch(
                                    setDisplay({ id: eve._id, display: false })
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
                                    setDisplay({ id: eve._id, display: true })
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
                          eve.eventProvider.providerId === user.enrollmentNo ? (
                            <Button
                              className="btn btn-danger"
                              type="button"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "If you want to delete Event then press OK"
                                  )
                                ) {
                                  dispatch(deleteEvent(eve._id));
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
          title="New Event"
          subtitle="Events"
          className="text-sm-left"
        />
      </Row>

      <Row>
        <Col lg="9" md="12">
          <Editor for="events" />
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

export default Events;
