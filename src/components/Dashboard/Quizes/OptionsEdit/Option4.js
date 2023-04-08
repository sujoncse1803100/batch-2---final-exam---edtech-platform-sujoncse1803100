import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addOption,
  setCurrentStep,
} from "../../../../features/steper/steperSlice";
import { useEffect } from "react";

const Option = () => {
  const [optionInfo, setOptonInfo] = useState({});
  const [color, setColor] = useState("");
  const { currentStep, quiz } = useSelector((state) => state.steper);
  const dispatch = useDispatch();

  useEffect(() => {
    const option = quiz?.options.find(
      (o) => o.id === parseInt(currentStep + 1)
    );
    setOptonInfo({ ...option });
  }, [quiz, currentStep]);

  const handleInfo = (e) => {
    const updatedInfo = { ...optionInfo };
    console.log(e.target.name);
    if (e.target.name === "option") {
      updatedInfo[e.target.name] = e.target.value;
    } else {
      updatedInfo["isCorrect"] = e.target.value === "true" ? true : false;
    }
    setOptonInfo(updatedInfo);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    optionInfo["id"] = quiz.options.length + 1;
    dispatch(addOption({ ...optionInfo }));
    dispatch(setCurrentStep());
  };
  return (
    // <section className="py-6 bg-primary h-screen grid place-items-center">
    <div className=" mx-auto max-w-lg px-5 lg:px-0 ">
      <span>Option-{currentStep + 1}</span>
      <form className="" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              id="option"
              name="option"
              type="text"
              autoComplete="option"
              required
              className="login-input rounded-t-md"
              placeholder="option"
              onChange={handleInfo}
              value={optionInfo?.option}
            />
          </div>

          <div className="flex">
            <input
              type="radio"
              id="true"
              name="isCorrect"
              required
              onChange={(e) => {
                handleInfo(e);
                setColor("green");
              }}
              value="ture"
              checked={optionInfo?.isCorrect}
            />
             
            <label
              style={{
                marginRight: "20px",
                color: `${color === "green" ? "green" : "white"}`,
              }}
              htmlFor="true"
            >
              true
            </label>
            <input
              type="radio"
              id="false"
              name="isCorrect"
              onChange={(e) => {
                handleInfo(e);
                setColor("red");
              }}
              value="false"
              checked={!optionInfo?.isCorrect}
            />
            <label
              style={{
                marginRight: "20px",
                color: `${color === "red" ? "red" : "white"}`,
              }}
              htmlFor="false"
            >
              false
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Add Option
          </button>
        </div>
      </form>
    </div>
    // </section>
  );
};

export default Option;
