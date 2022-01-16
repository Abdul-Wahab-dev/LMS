import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardHeader,
  Card,
  Modal,
  Button
} from "shards-react";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

import { useDispatch, useSelector } from "react-redux";
// page title
import PageTitle from "../components/common/PageTitle";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
// action
import { getUsers, approveUser, deleteUser } from "../actions/authActions";
// Icon
import eyeIcon from "../images/eye.png";
const ApprovedUser = () => {
  const [data, setData] = useState({});
  const [modal, setModal] = useState(false);
  // get state from store
  const users = useSelector(state => state.auth.users);

  // initialize useDispatch()
  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  // approve user
  const approveUserFunc = id => {
    const obj = {
      id,
      approvedUser: true
    };
    dispatch(approveUser(obj));
  };
  const deleteUserFunc = id => {
    dispatch(deleteUser(id));
  };
  return (
    <Container fluid className="main-content-container px-4 pb-4 complain-page">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="User Request"
          subtitle="User"
          className="text-sm-left"
        />
      </Row>
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Users</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
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
                      Father Name
                    </th>
                    <th scope="col" className="border-0">
                      Username
                    </th>

                    <th scope="col" className="border-0">
                      Role
                    </th>

                    <th scope="col" className="border-0">
                      view
                    </th>

                    <th scope="col" className="border-0" colSpan={2}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(user => user.approvedUser !== true).length >
                  0 ? (
                    users
                      .filter(user => user.approvedUser !== true)
                      .map((user, i) => (
                        <tr key={user._id}>
                          <td>{i + 1}</td>
                          <td>{capitalizeFirstLetter(user.name)}</td>
                          <td>{capitalizeFirstLetter(user.fatherName)}</td>
                          <td>{user.enrollmentNo}</td>
                          <td>{capitalizeFirstLetter(user.role)}</td>
                          <td>
                            <span
                              className="view-detail-icon"
                              onClick={() => {
                                setData(user);
                                setModal(true);
                              }}
                            >
                              <img src={eyeIcon} alt="eye" width="18px" />
                            </span>
                          </td>
                          <td colSpan={2}>
                            {" "}
                            <Button
                              type="button"
                              onClick={e => approveUserFunc(user._id)}
                            >
                              Approve
                            </Button>
                            <Button
                              type="button"
                              onClick={e => deleteUserFunc(user._id)}
                              className="btn btn-danger ml-2"
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
      <Modal open={modal} toggle={() => setModal(!modal)}>
        <UserAccountDetails profile={data} />
      </Modal>
    </Container>
  );
};
export default ApprovedUser;
