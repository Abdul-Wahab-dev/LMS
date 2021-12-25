import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Modal, ModalBody, FormInput, Form, Button } from "shards-react";
// component
import UserActions from "./UserActions";
// action
import { updatePassword } from "../../../../actions/authActions";
export default () => {
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [modal, setModal] = useState(false);

  // get State from store
  const user = useSelector(state => state.auth);
  const errorsFromStore = useSelector(state => state.errors);
  // initialize useDispatch
  const dispatch = useDispatch();
  // Update Password
  const updatePasswordFunc = e => {
    const obj = {
      passwordCurrent,
      password,
      passwordConfirm
    };
    dispatch(updatePassword(obj, clearState));
  };
  const clearState = () => {
    setPassword("");
    setPasswordConfirm("");
    setPasswordCurrent("");
    setModal(false);
  };
  return (
    <div className="d-lg-none-c">
      <Nav navbar className="flex-row">
        <UserActions user={user} setModal={setModal} />
      </Nav>
      <Modal open={modal} toggle={() => setModal(!modal)}>
        <ModalBody>
          <Form>
            {errorsFromStore.message ? (
              <div class="error-message alert-danger" role="alert">
                {errorsFromStore.message}
              </div>
            ) : null}
            <div className="mb-1 w-75">
              <label htmlFor="fePhoneNumber">Current Password</label>
              <FormInput
                id="feUniversityEmail"
                type="password"
                placeholder="Your Password"
                required
                value={passwordCurrent}
                onChange={e => setPasswordCurrent(e.target.value)}
              />
            </div>
            <div className="mb-1 w-75">
              <label htmlFor="fePhoneNumber">New Password</label>
              <FormInput
                id="feUniversityEmail"
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-1 w-75">
              <label htmlFor="fePhoneNumber">Confirm Password</label>
              <FormInput
                id="feUniversityEmail"
                type="password"
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
            <Button
              type="button"
              className="btn mt-2"
              onClick={e => updatePasswordFunc(e)}
            >
              Update Password
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
