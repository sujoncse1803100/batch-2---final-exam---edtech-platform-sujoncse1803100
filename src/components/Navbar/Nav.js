import React from "react";
import img from "../../image/learningportal.svg";
import { Link, useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, role } = useSelector((state) => state.auth)?.user;

  const handleLoggedOut = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="shadow-md">
      <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
        <Link to="/">
          <img className="h-10" src={img} alt="#" />
        </Link>
        <div className="flex items-center gap-3">
          {role === "student" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Link to="/course">
                <h2 className="font-medium myLInk">CoursePlayer</h2>
              </Link>
              <Link to="/leaderboard">
                <h2
                  className="font-medium myLInk"
                  style={{ marginLeft: "10px" }}
                >
                  Leaderboard
                </h2>
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Link to="/admin/assignment">
                <h2 className="font-medium myLInk">Assignment</h2>
              </Link>
              <Link to="/admin/quizes">
                <h2
                  className="font-medium myLInk"
                  style={{ marginLeft: "10px" }}
                >
                  Quizes
                </h2>
              </Link>
              <Link to="/admin/assignmentMark">
                <h2
                  className="font-medium myLInk"
                  style={{ marginLeft: "10px" }}
                >
                  AssignmentMark
                </h2>
              </Link>
              <Link to="/admin/videos">
                <h2
                  className="font-medium myLInk"
                  style={{ marginLeft: "10px" }}
                >
                  Videos
                </h2>
              </Link>
            </div>
          )}
          <h2 className="font-medium">{name}</h2>
          <button
            onClick={handleLoggedOut}
            className="flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all bg-red-600 hover:bg-red-700 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
