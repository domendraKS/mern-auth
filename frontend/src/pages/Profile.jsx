import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "./../firebase";
import axios from "axios";
import Cookies from "universal-cookie";
import {
  deleteUserFail,
  deleteUserSuccess,
  signOut,
  updateUserFail,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice.js";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  // console.log(image);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const Base_Url = process.env.REACT_APP_URL;
  const cookie = new Cookies();
  const token = cookie.get("authToken");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    setImageError(false);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadImage = uploadBytesResumable(storageRef, image);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  //update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());

    try {
      await axios
        .patch(`${Base_Url}/api/user/update/${currentUser._id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
        })
        .then((res) => {
          // console.log(res.data.rest);
          dispatch(updateUserSuccess(res.data.rest));
        })
        .catch((err) => {
          dispatch(updateUserFail(err.response.data));
        });
    } catch (error) {
      // console.log(error);
      dispatch(updateUserFail(error));
    }
  };

  //signout
  const handleSignOut = () => {
    dispatch(signOut());
    cookie.remove("authToken");
  };

  //delete user
  const handleDelete = async () => {
    try {
      await axios
        .delete(`${Base_Url}/api/user/delete/${currentUser._id}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
        })
        .then((res) => {
          dispatch(deleteUserSuccess());
        })
        .catch((err) => {
          dispatch(deleteUserFail(err.response.data));
        });
    } catch (error) {
      dispatch(deleteUserFail(error));
    }
  };

  return (
    <div className="p-2 mx-auto mw-100">
      <h1 className="fw-semibold text-center py-3">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center gap-3"
      >
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="Profile"
          width={60}
          height={60}
          className="rounded-circle object-fit-cover cursorPointer"
          onClick={() => fileRef.current.click()}
        />
        <p className="align-self-center">
          {imageError ? (
            <span className="text-danger">
              Error Uploading Image (image size must be less than 2 MB )
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-info">{`Uploading : ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-success">Image uploaded Successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="userName"
          className="rounded p-2 formInput"
          defaultValue={currentUser.userName}
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          id="email"
          className="rounded p-2 formInput"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          className="rounded p-2 formInput"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn-secondary formInput text-uppercase submitButton"
          disabled={loading}
        >
          {loading ? "Loading" : "Update"}
        </button>
      </form>
      <div className="d-flex justify-content-between align-items-center mt-2 widthDiv">
        <span className="text-danger cursorPointer" onClick={handleDelete}>
          Delete Account
        </span>
        <span className="text-danger cursorPointer" onClick={handleSignOut}>
          Sign-out
        </span>
      </div>
      <p className="text-danger">
        {error ? error.error || "Something went wrong !" : ""}
        {/* {console.log(error.response.data.error)} */}
      </p>
      <p className="text-success">
        {updateUserSuccess && "User updated successfully !"}
      </p>
    </div>
  );
}

export default Profile;
