import img from "../../../image/learningportal.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../../features/auth/authApi";

const AdminLogin = () => {
  const [login, { data: user, isSuccess, isError }] = useLoginMutation();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Login";
  }, []);

  useEffect(() => {
    if (isSuccess && user?.user?.role === "admin") {
      navigate("/admin");
    } else if (isSuccess) {
      alert("Ooops, you are not adimin !!!");
    } else if (!isSuccess && isError) {
      alert("there is an error to login");
    }
  }, [user, isSuccess, navigate, isError]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (Object.keys(data).length === 2) {
      login({ ...data });
    } else {
      console.log(data);
      alert("please fill the form carefully");
    }
  };
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <Link to="/">
          <div>
            <img className="h-12 mx-auto" src={img} alt="#" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Sign in to Admin Account
            </h2>
          </div>
        </Link>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
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
                className="login-input rounded-t-md"
                placeholder="Email address"
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
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
                className="login-input rounded-b-md"
                placeholder="Password"
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
