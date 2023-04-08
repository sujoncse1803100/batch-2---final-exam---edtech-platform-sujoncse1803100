import { useState } from "react";
import img from "../../../image/learningportal.svg";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Option1 from "./Options/Option1";
import Option2 from "./Options/Option2";
import Option3 from "./Options/Option3";
import Option4 from "./Options/Option4";
import { Stepper, Step, StepLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuizData,
  setShowOption,
} from "../../../features/steper/steperSlice";
import FinalStep from "./Options/FinalStep";
import { useGetAllVideoQuery } from "../../../features/videos/videoApi";

const UseerForm = () => {
  const { currentStep } = useSelector((state) => state.steper);

  const showStep = (step) => {
    switch (step) {
      case 0:
        return <Option1 />;
      case 1:
        return <Option2 />;
      case 2:
        return <Option3 />;
      case 3:
        return <Option4 />;
      case 4:
        return <FinalStep />;
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="mt-5 mb-5 text-center">
        <Stepper
          className=""
          style={{ margin: "0 auto" }}
          activeStep={currentStep}
          alternativeLabel
        >
          <Step>
            <StepLabel style={{ color: "white !important" }}></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
        </Stepper>
      </div>
      {showStep(currentStep)}
    </div>
  );
};

const AddQuiz = () => {
  const [quizInfo, setQuizInfo] = useState({});
  const { data: videos } = useGetAllVideoQuery();
  const [videoTitle, setVideoTitle] = useState("");
  const { showOption, quiz } = useSelector((state) => state.steper);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Add Quiz";
  }, []);

  const handleInfo = (e) => {
    const updatedInfo = {
      ...quizInfo,
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
    setQuizInfo(updatedInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addQuizData({ ...quiz, ...quizInfo }));
    dispatch(setShowOption(!showOption));
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-lg px-5 lg:px-0">
        <div>
          <Link to="/">
            <img className="h-12 mx-auto" src={img} alt="#" />
          </Link>
          <h2
            className={`mt-6 text-center text-3xl font-extrabold text-slate-100 ${
              showOption ? "hidden" : ""
            }`}
          >
            Please Fill The Quiz Information
          </h2>
        </div>

        <form
          className={`mt-8 space-y-6 ${showOption ? "hidden" : ""}`}
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="question"
                name="question"
                type="text"
                autoComplete="question"
                required
                className="login-input rounded-t-md"
                placeholder="question"
                onChange={handleInfo}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                quiz Id
              </label>
              <select
                id="lws-quizId"
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
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Add quiz Information
            </button>
          </div>
        </form>
        <div className={`mt-8 space-y-6 ${!showOption ? "hidden" : ""}`}>
          <UseerForm />
        </div>
      </div>
    </section>
  );
};

export default AddQuiz;
