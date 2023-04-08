import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
const Home = () => {
  return (
    <div>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0 ">
          <h1 className="text-4xl font-bold my-4 text-center">
            You can go to other pages from here
          </h1>

          <div className="grid grid-cols-2 gap-5 mt-8">
            <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md">
              <h1 className="text-slate-100 font-bold text-xl">
                Student Portal
              </h1>
              <div className="space-y-2 mt-4 flex flex-col">
                <Link className="link" to="/coursePlayer">
                  Course Player
                </Link>
                <Link className="link" to="/leaderboard">
                  LeaderBoard
                </Link>
                <Link className="link" to="/quiz">
                  Quiz
                </Link>
                <Link className="link" to="/student/login">
                  Student Login
                </Link>
                <Link className="link" to="/student/registration">
                  Student Registration
                </Link>
              </div>
            </div>
            <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md">
              <h1 className="text-slate-100 font-bold text-xl">Admin Portal</h1>
              <div className="space-y-2 mt-4 flex flex-col">
                <Link className="link" to="/dashboard">
                  Dashboard
                </Link>
                <Link className="link" to="/admin/login">
                  Admin Login
                </Link>
                <Link className="link" to="/assignment">
                  Assginment
                </Link>
                <Link className="link" to="/assignmentMark">
                  AssginmentMark
                </Link>
                <Link className="link" to="/quizes">
                  Quizes
                </Link>
                <Link className="link" to="/videos">
                  Videos
                </Link>
              </div>
            </div>

            <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md">
              <h1 className="text-slate-100 font-bold text-xl">Admin Email</h1>
              <div className="space-y-2 mt-4 flex flex-col">
                <p>Email : admin@learnwithsumit.com</p>
                <p>Password : lws@123456</p>
              </div>
            </div>

            <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md">
              <h1 className="text-slate-100 font-bold text-xl">
                Student Email
              </h1>
              <div className="space-y-2 mt-4 flex flex-col">
                <p>Email : akash.ahmed@learnwithsumit.com</p>
                <p>Email : md.salahuddin@learnwithsumit.com</p>
                <p>Email : ferdous.shohag@learnwithsumit.com</p>
                <p>Email : riyadh.vai@learnwithsumit.com</p>
                <p>Email : saad.hasan@learnwithsumit.com</p>
                <p>Password : lws@123456</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
