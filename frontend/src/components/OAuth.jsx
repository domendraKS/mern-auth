import React from "react";

export default function OAuth() {
  const handleGoogleClick = () => {
    try {
    } catch (error) {
      console.log("Could not login with google" + error);
    }
  };
  return (
    <button
      type="button"
      className="bg-danger text-light p-2 rounded text-uppercase submitButton"
      onClick={handleGoogleClick}
    >
      Continue with google
    </button>
  );
}
