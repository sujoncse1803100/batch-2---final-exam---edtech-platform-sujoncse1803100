import { useState } from "react";
import img from "../../../image/learningportal.svg";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllVideoQuery } from "../../../features/videos/videoApi";
import { useAddAssignmentMutation } from "../../../features/assignment/assignmentApi";

const AddAssginment = () => {
  const [assignmentInfo, setAssignmentInfo] = useState({});
  const [addAssignment, { isSuccess }] = useAddAssignmentMutation();
  const { data: videos } = useGetAllVideoQuery();
  const navigate = useNavigate();
  const [videoTitle, setVideoTitle] = useState("");

  useEffect(() => {
    document.title = "Add Assginment";
  }, []);

  useEffect(() => {
    isSuccess && navigate("/admin/assignment");
  }, [isSuccess, navigate]);

  const handleInfo = (e) => {
    const updatedInfo = {
      ...assignmentInfo,
    };
    if (e.target.name === "video_id") {
      const video_title = videos?.find(
        (v) => v.id === parseInt(e.target.value)
      ).title;
      setVideoTitle(video_title);
      updatedInfo[e.target.name] = e.target.value;
      updatedInfo["video_title"] = video_title;
    } else {
      updatedInfo[e.target.name] = e.target.value;
    }
    setAssignmentInfo(updatedInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addAssignment({ ...assignmentInfo });
  };
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-lg px-5 lg:px-0">
        <div>
          <Link to="/">
            <img className="h-12 mx-auto" src={img} alt="#" />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Please Fill The Assginment Information
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="title"
                name="title"
                type="text"
                autoComplete="name"
                required
                className="login-input rounded-t-md"
                placeholder="title"
                onChange={handleInfo}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Video Id
              </label>
              <select
                id="lws-videoId"
                name="video_id"
                onChange={handleInfo}
                required
                className="login-input"
              >
                <option value="" hidden selected>
                  Select Video
                </option>
                {videos?.length &&
                  videos.map((v, i) => {
                    return <option key={i}>{v.id}</option>;
                  })}
              </select>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                url
              </label>
              <input
                id="video_title"
                name="video_title"
                type="text"
                autoComplete="video_title"
                required
                className="login-input"
                placeholder="video title"
                value={videoTitle}
                onChange={handleInfo}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                views
              </label>
              <input
                id="totalMark"
                name="totalMark"
                type="number"
                autoComplete="totalMark"
                required
                className="login-input rounded-b-md"
                placeholder="totalMark"
                onChange={handleInfo}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Add Video
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddAssginment;
