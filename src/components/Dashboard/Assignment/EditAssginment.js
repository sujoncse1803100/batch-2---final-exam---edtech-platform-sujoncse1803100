import { useState } from "react";
import img from "../../../image/learningportal.svg";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetAllVideoQuery } from "../../../features/videos/videoApi";
import {
  useGetAllAssignmentQuery,
  useUpdateAssignmentMutation,
} from "../../../features/assignment/assignmentApi";

const EditAssginment = () => {
  const [assignmentInfo, setAssignmentInfo] = useState({});
  const [updateAssignment, { isSuccess }] = useUpdateAssignmentMutation();
  const { data: videos, isSuccess: isGetALLAssignmentSuccess } =
    useGetAllVideoQuery();
  const { data: assignments } = useGetAllAssignmentQuery();
  const navigate = useNavigate();
  const [videoTitle, setVideoTitle] = useState("");
  const { assignmentId } = useParams();

  useEffect(() => {
    document.title = "Edit Assginment";
  }, []);

  useEffect(() => {
    isSuccess && navigate("/admin/assignment");
  }, [isSuccess, navigate]);

  useEffect(() => {
    const assignment =
      assignments?.find((a) => a.id === parseInt(assignmentId)) || {};
    setAssignmentInfo({ ...assignment });
    setVideoTitle(assignment?.video_title);
  }, [isGetALLAssignmentSuccess, assignmentId, assignments]);

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
    updateAssignment({ ...assignmentInfo });
  };
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-lg px-5 lg:px-0">
        <div>
          <Link to="/">
            <img className="h-12 mx-auto" src={img} alt="#" />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Edit Assginment Information
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
                value={assignmentInfo?.title}
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
                value={assignmentInfo?.video_id}
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
                value={assignmentInfo?.totalMark}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Update Assignment
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditAssginment;
