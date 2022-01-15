import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardHeader,
  Card,
  FormSelect,
  FormFeedback,
  FormInput,
  Button,
  Form
} from "shards-react";
import { useDispatch, useSelector } from "react-redux";
// page title
import PageTitle from "../components/common/PageTitle";
// action
import { getTeams, createTeam, deleteTeam } from "../actions/team";
// loader
import Loader from "../utils/Loader";
const Teams = props => {
  const [teamName, setTeamName] = useState("");
  const [semesterType, setSemesterType] = useState("");
  const [errors, setErrors] = useState({});
  const loading = useSelector(state => state.team.loading);

  // get state from store
  const teams = useSelector(state => state.team.teams);
  const auth = useSelector(state => state.auth.user);
  const errorsFromStore = useSelector(state => state.errors);
  // initialize useDispatch
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    setErrors(errorsFromStore);
  }, [errorsFromStore]);

  useEffect(() => {
    dispatch(getTeams());
  }, []);
  // create team
  const createTeamFunc = e => {
    const team = {
      createdBy: {
        id: auth.enrollmentNo,
        name: auth.enrollmentNo
      },
      teamName: teamName.toLowerCase(),
      semesterType: semesterType.toLowerCase()
    };
    dispatch(createTeam(team));
  };
  // delete team
  const deleteTeamFunc = id => {
    if (window.confirm("If you want to delete Team then press OK")) {
      dispatch(deleteTeam(id));
    }
  };
  return (
    <Container fluid className="main-content-container px-4 pb-4 complain-page">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Teams"
          subtitle="Team"
          className="text-sm-left"
        />
      </Row>
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Teams</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Sr#
                    </th>
                    <th scope="col" className="border-0">
                      Team
                    </th>
                    {/* <th scope="col" className="border-0">
                      Assignment
                    </th> */}
                    <th scope="col" className="border-0">
                      Type
                    </th>
                    <th scope="col" className="border-0">
                      Member
                    </th>

                    <th scope="col" className="border-0">
                      Created By
                    </th>

                    <th scope="col" className="border-0">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teams.length > 0 ? (
                    teams.map((team, i) => (
                      <tr key={team._id}>
                        <td>{i + 1}</td>
                        <td>{team.teamName}</td>
                        <td>{team.semesterType}</td>
                        <td>{team.members.length}</td>
                        <td>
                          {team.createdBy && team.createdBy.id}
                          <br />
                          {team.createdBy && team.createdBy.name}
                        </td>
                        {auth.enrollmentNo === team.createdBy.id ? (
                          <td>
                            <Button
                              className="btn btn-danger"
                              onClick={() => deleteTeamFunc(team._id)}
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
              title="New Team"
              subtitle="Team"
              className="text-sm-left"
            />
          </Row>
          <Row>
            <Col lg="9" md="12">
              <Card small className="mb-3">
                <CardBody>
                  <Form>
                    <Row className="mb-3">
                      <Col md="4">
                        <label>Name</label>
                        <FormInput
                          type="text"
                          placeholder="Name"
                          value={teamName}
                          onChange={e => setTeamName(e.target.value)}
                          required
                          invalid={
                            errors.validation &&
                            errors.validation.teamName &&
                            true
                          }
                        />
                        {errors.validation && errors.validation.teamName && (
                          <FormFeedback>
                            {errors.validation.teamName}
                          </FormFeedback>
                        )}
                      </Col>
                      <Col md="4" className="mt-md">
                        <label>Type</label>
                        <FormSelect
                          id="feInputState"
                          value={semesterType}
                          onChange={e => setSemesterType(e.target.value)}
                          required
                          invalid={
                            errors.validation &&
                            errors.validation.semesterType &&
                            true
                          }
                        >
                          <option>Choose...</option>
                          <option value="Technical">Technical</option>
                          <option value="Non-Technical">Non-Technical</option>
                        </FormSelect>
                        {errors.validation &&
                          errors.validation.semesterType && (
                            <FormFeedback>
                              {errors.validation.semesterType}
                            </FormFeedback>
                          )}
                      </Col>
                    </Row>

                    <Button type="button" onClick={e => createTeamFunc(e)}>
                      Create New
                    </Button>
                  </Form>
                </CardBody>
              </Card>
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
export default Teams;
