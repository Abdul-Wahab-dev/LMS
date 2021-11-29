import React from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader } from "shards-react";
// Component
import RegistrationFrom from "../components-overview/CompleteFormExample";
// loader
import Loader from "../../utils/Loader";
const Register = () => {
  // get state from store
  const loading = useSelector(state => state.auth);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ width: "800px", margin: "0 auto", padding: "30px 0" }}>
        <Card small>
          <CardHeader className="border-bottom">
            <h6 className="m-0">Create account</h6>
          </CardHeader>
          <RegistrationFrom />
        </Card>
      </div>
      {loading.loading === true ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : null}
    </div>
  );
};
export default Register;
