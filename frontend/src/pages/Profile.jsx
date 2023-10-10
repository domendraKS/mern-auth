import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-2 mx-auto mw-100">
      <h1 className="fw-semibold text-center py-3">Profile</h1>
      <form className="d-flex flex-column align-items-center gap-3">
        <img
          src={currentUser.profilePicture}
          alt="Profile"
          width={60}
          height={60}
          className="rounded-circle object-fit-cover cursorPointer"
        />
        <input
          type="text"
          id="userName"
          className="rounded p-2 formInput"
          defaultValue={currentUser.userName}
          placeholder="Username"
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          id="email"
          className="rounded p-2 formInput"
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          className="rounded p-2 formInput"
          placeholder="Password"
        />
        <button
          type="submit"
          className="btn btn-secondary formInput text-uppercase submitButton"
        >
          Update
        </button>
      </form>
      <div className="d-flex justify-content-between align-items-center mt-2 widthDiv">
        <span className="text-danger cursorPointer">Delete Account</span>
        <span className="text-danger cursorPointer">Sign-out</span>
      </div>
    </div>
  );
}

export default Profile;
