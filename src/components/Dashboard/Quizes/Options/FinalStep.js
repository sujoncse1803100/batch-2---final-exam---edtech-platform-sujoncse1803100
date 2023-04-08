import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setState } from "../../../../features/steper/steperSlice";
import { useAddQuizMutation } from "../../../../features/quiz/quizApi";
import { useNavigate } from "react-router-dom";

const FinalStep = () => {
  const { quiz } = useSelector((state) => state.steper);
  const [addQuiz, { isSuccess }] = useAddQuizMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    isSuccess && dispatch(setState());
    isSuccess && navigate("/admin/quizes");
  }, [isSuccess, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuiz({ ...quiz });
  };
  return (
    <div className=" mx-auto max-w-lg px-5 lg:px-0 ">
      <form className="" onSubmit={handleSubmit}>
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Sumit All Quiz Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinalStep;
