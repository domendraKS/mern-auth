import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "./../firebase";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  // console.log(image);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

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

  return (
    <div className="p-2 mx-auto mw-100">
      <h1 className="fw-semibold text-center py-3">Profile</h1>
      <form className="d-flex flex-column align-items-center gap-3">
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
