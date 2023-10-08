import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OAuth from "../components/OAuth.jsx";

function SignUp() {
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
        .post(`${Base_Url}/api/auth/signup`, formData)
        .then((res) => {
          // console.log(res);
          navigate("/signIn");
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
        <h2 className="text-center fw-bold my-4">Sign-Up</h2>
        <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            placeholder="Username"
            id="userName"
            className="bg-secondary-subtle py-2 px-3"
            onChange={handleChange}
          />
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
            className="bg-dark text-light p-2 rounded text-uppercase submitButton"
          >
            {loading ? "Loading" : "Sign up"}
          </button>
          <OAuth />
        </Form>
        <div className="d-flex my-1">
          <p>Have an account ? &nbsp;</p>
          <Link to="/signIn">Sign in</Link>
        </div>
        <p className="text-danger">{error && "Something went wrong !"}</p>
      </div>
    </>
  );
}

export default SignUp;
