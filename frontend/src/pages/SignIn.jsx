import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import {
  signInStart,
  signInSuccess,
  signInFail,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth.jsx";

function SignIn() {
  const [formData, setFormData] = useState({});
  const Base_Url = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(signInStart());
    try {
      await axios
        .post(`${Base_Url}/api/auth/signin`, formData)
        .then((res) => {
          // console.log(res.data.token);
          dispatch(signInSuccess(res.data.rest));
          const decoded = jwt(res.data.token);
          cookie.set("authToken", res.data.token, {
            expires: new Date(decoded.exp * 1000),
          });
          navigate("/");
        })
        .catch((err) => {
          dispatch(signInFail(err.response.data));
        });
    } catch (error) {
      dispatch(signInFail(error));
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
            className="bg-dark text-light p-2 rounded text-uppercase submitButton"
          >
            {loading ? "Loading" : "Sign In"}
          </button>
          <OAuth />
        </Form>
        <div className="d-flex my-1">
          <p>Don't have an account ? &nbsp;</p>
          <Link to="/signUp">Sign up</Link>
        </div>
        <p className="text-danger">
          {error ? error.error || "Something went wrong !" : ""}
        </p>
      </div>
    </>
  );
}

export default SignIn;
