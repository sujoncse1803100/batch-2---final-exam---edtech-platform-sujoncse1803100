import React from "react";
import img from "../../image/learningportal.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="shadow-md">
      <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
        <Link to="/">
          <img className="h-10" src={img} alt="#" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
