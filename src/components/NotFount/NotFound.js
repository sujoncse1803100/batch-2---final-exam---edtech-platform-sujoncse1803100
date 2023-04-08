import React from "react";
import { Link } from "react-router-dom";
import img from "../../image/learningportal.svg";

const NotFound = () => {
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-lg px-5 lg:px-0">
        <div>
          <Link to="/">
            <img className="h-12 mx-auto" src={img} alt="#" />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Ooooops, page not found !!!!
          </h2>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
