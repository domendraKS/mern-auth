import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const [formData, setFormData] = useState({});
  const Base_Url = process.env.REACT_APP_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(false);
    try {
      await axios
        .post(`${Base_Url}/api/auth/signin`, formData)
        .then((res) => {
          console.log(res);
          navigate('/');
        })
        .catch((err) => {
          setError(true);
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <div className="p-3 mx-auto authPage">
        <h2 className="text-center fw-bold my-4">Sign-In</h2>
        <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <Form.Control
            type="email"
            placeholder="Email"
            id="email"
            className="bg-secondary-subtle py-2 px-3"
            onChange={handleChange}
          />
          <Form.Control
            type="password"
            placeholder="Password"
            id="password"
            className="bg-secondary-subtle py-2 px-3"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-dark text-light p-2 rounded uppercase text-uppercase submitButton"
          >
            {loading ? "Loading" : "Sign In"}
          </button>
        </Form>
        <div className="d-flex my-1">
          <p>Don't have an account ? &nbsp;</p>
          <Link to="/signUp">Sign up</Link>
        </div>
        <p className="text-danger">{error && "Something went wrong !"}</p>
      </div>
    </>
  );
}

export default SignIn;
