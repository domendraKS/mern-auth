import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "./../firebase";
import {
  signInStart,
  signInSuccess,
  signInFail,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";

export default function OAuth() {
  const Base_Url = process.env.REACT_APP_URL;
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const cookie = new Cookies();

  const handleGoogleClick = async () => {
    dispatch(signInStart());
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      const res = await fetch(`${Base_Url}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      // console.log(data.rest);
      dispatch(signInSuccess(data.rest));
      const decoded = jwt(data.token);
      cookie.set("authToken", data.token, {
        expires: new Date(decoded.exp * 1000),
      });
      navigate("/");
    } catch (error) {
      dispatch(signInFail(error));
      console.log("Could not login with google" + error);
    }
  };
  return (
    <button
      type="button"
      className="bg-danger text-light p-2 rounded text-uppercase submitButton"
      onClick={handleGoogleClick}
    >
      {loading ? "Loading" : "Continue with google"}
    </button>
  );
}
