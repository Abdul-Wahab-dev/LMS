import React from "react";
import { Container, Button } from "shards-react";
import { Link } from "react-router-dom";
const Errors = props => {
  console.log(props);
  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <div className="error">
        <div className="error__content">
          <h2>404</h2>
          <h3>Page not found.</h3>
          <Link to="/">
            <Button>Home</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Errors;
