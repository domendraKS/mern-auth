import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  return (
    <div className="bg-dark-subtle border-bottom border-primary headerDiv">
      <div className="d-flex justify-content-between align-items-center px-3">
        <h1 className="fw-bold">
          <Link to="/" className="headerLogo">
            Auth App
          </Link>
        </h1>
        <ul className="d-flex gap-4 headerUl">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <>
                <img
                  src={currentUser.profilePicture}
                  alt="Profile"
                  width={35}
                  height={35}
                  className="rounded-circle object-fit-cover"
                />
              </>
            ) : (
              <li>Sign-Up</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
