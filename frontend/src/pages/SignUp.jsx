import React from "react";
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <>
      <div className="p-3 w-50 mx-auto">
        <h2 className="text-center fw-bold my-4">Sign-Up</h2>
        <Form className="d-flex flex-column gap-3">
          <Form.Control
            type="text"
            placeholder="Username"
            id="username"
            className="bg-secondary-subtle py-2 px-3"
          />
          <Form.Control
            type="email"
            placeholder="Email"
            id="email"
            className="bg-secondary-subtle py-2 px-3"
          />
          <Form.Control
            type="password"
            placeholder="Password"
            id="password"
            className="bg-secondary-subtle py-2 px-3"
          />
          <button className="bg-dark text-light p-2 rounded uppercase text-uppercase submitButton">Sign up</button>
        </Form>
        <div className="d-flex">
          <p>Have an account ? &nbsp;</p>
          <Link to="/signIn">Sign in</Link>
        </div>
      </div>
    </>
  );
}

export default SignUp;
