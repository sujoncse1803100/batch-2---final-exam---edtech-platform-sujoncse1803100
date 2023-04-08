import { useState } from "react";
import img from "../../../image/learningportal.svg";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetAllVideoQuery,
  useUpdateVideoMutation,
} from "../../../features/videos/videoApi";

const EditVideo = () => {
  const [videoInfo, setVideoInfo] = useState({});
  const [updateVideo, { isSuccess }] = useUpdateVideoMutation();
  const { data: videos, isSuccess: isGetvideosucess } = useGetAllVideoQuery();
  const navigate = useNavigate();
  const { videoId } = useParams();

  useEffect(() => {
    document.title = "Edit Video";
  }, []);

  useEffect(() => {
    isSuccess && navigate("/admin/videos");
  }, [isSuccess, navigate]);

  useEffect(() => {
    const video = videos?.find((video) => video.id === parseInt(videoId));
    setVideoInfo({ ...video });
  }, [isGetvideosucess, videos, videoId]);

  const handleInfo = (e) => {
    const updatedInfo = {
      ...videoInfo,
    };
    updatedInfo[e.target.name] = e.target.value;
    setVideoInfo(updatedInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateVideo({ ...videoInfo });
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-lg px-5 lg:px-0">
        <Link to="/">
          <div>
            <img className="h-12 mx-auto" src={img} alt="#" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Edit Video Information
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
                id="title"
                name="title"
                type="text"
                autoComplete="name"
                required
                className="login-input rounded-t-md"
                placeholder="title"
                onChange={handleInfo}
                value={videoInfo?.title}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Video description
              </label>
              <input
                id="email-address"
                name="description"
                type="text"
                autoComplete="description"
                required
                className="login-input "
                placeholder="description"
                value={videoInfo?.description}
                onChange={handleInfo}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                url
              </label>
              <input
                id="url"
                name="url"
                type="text"
                autoComplete="url"
                required
                className="login-input"
                placeholder="url"
                onChange={handleInfo}
                value={videoInfo?.url}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                views
              </label>
              <input
                id="views"
                name="views"
                type="text"
                autoComplete="views"
                required
                className="login-input rounded-b-md"
                placeholder="views"
                onChange={handleInfo}
                value={videoInfo?.views}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                duration
              </label>
              <input
                id="duration"
                name="duration"
                type="text"
                autoComplete="duration"
                required
                className="login-input rounded-b-md"
                placeholder="duration"
                onChange={handleInfo}
                value={videoInfo?.duration}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Update Video
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditVideo;
