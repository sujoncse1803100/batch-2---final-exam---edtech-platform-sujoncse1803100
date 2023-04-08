import { useState } from "react";
import img from "../../../image/learningportal.svg";
import { useEffect } from "react";
import { useRegisterMutation } from "../../../features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";

const StudentRegistration = () => {
  const [userInfo, setUserInfo] = useState({});
  const [register, { isSuccess }] = useRegisterMutation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Student Registration";
  }, []);

  useEffect(() => {
    isSuccess && navigate("/");
  }, [isSuccess, navigate]);

  const handleInfo = (e) => {
    const updatedInfo = {
      ...userInfo,
    };
    if (e.target.name === "confirm-password") {
      updatedInfo["confirmPassword"] = e.target.value;
    } else {
      updatedInfo[e.target.name] = e.target.value;
    }
    setUserInfo(updatedInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userInfo?.password === userInfo?.confirmPassword) {
      register({
        email: userInfo.email,
        name: userInfo.name,
        password: userInfo.password,
        role: "student",
      });
    } else {
      alert("password does not match");
    }
  };
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <Link to="/">
          <div>
            <img className="h-12 mx-auto" src={img} alt="#" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Create Your New Account
            </h2>
          </div>
        </Link>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                className="login-input rounded-t-md"
                placeholder="Student Name"
                onChange={handleInfo}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="login-input "
                placeholder="Email address"
                onChange={handleInfo}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="login-input"
                placeholder="Password"
                onChange={handleInfo}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="confirm-password"
                required
                className="login-input rounded-b-md"
                placeholder="Confirm Password"
                onChange={handleInfo}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StudentRegistration;
