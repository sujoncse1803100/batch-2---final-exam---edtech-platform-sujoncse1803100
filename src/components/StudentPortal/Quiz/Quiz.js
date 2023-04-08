import { useEffect, useState } from "react";
import Nav from "./../../Navbar/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllQuizQuery } from "../../../features/quiz/quizApi";
import { useGetAllVideoQuery } from "../../../features/videos/videoApi";
import SingleQuiz from "./SingleQuiz";
import {
  useAddQuizsMarkMutation,
  useGetAllQuizsMarkQuery,
} from "../../../features/quizMark/quizMarkApi";

const Quiz = () => {
  const user = JSON.parse(localStorage.getItem("user")).user;
  const { videoId } = useParams();
  const { data: quizzes, isSuccess } = useGetAllQuizQuery();
  const { data: videos, isSuccess: isVideoSuccess } = useGetAllVideoQuery();
  const [addQuizsMark, { isSuccess: isAddQuizMarkSucess }] =
    useAddQuizsMarkMutation();
  const { data: allQuizMarks, isSuccess: isGetAllQuizMark } =
    useGetAllQuizsMarkQuery();
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [video, setVideo] = useState({});
  const [answer, setAnswer] = useState([]);
  const [userQuizMark, setUserQuizMark] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Quiz - LWS";
  }, []);

  useEffect(() => {
    isAddQuizMarkSucess && navigate("/leaderboard");
  }, [isAddQuizMarkSucess]);

  useEffect(() => {
    if (isGetAllQuizMark) {
      const user_quizMark = allQuizMarks?.find(
        (qm) => qm.student_id === user.id
      );
      user_quizMark && setUserQuizMark(user_quizMark);
    }
  }, [isGetAllQuizMark]);

  useEffect(() => {
    if (isSuccess) {
      const totalQuizes = quizzes?.filter(
        (q) => q.video_id == parseInt(videoId)
      );
      totalQuizes?.length && setMyQuizzes(totalQuizes);
    }
  }, [isSuccess, quizzes]);

  useEffect(() => {
    if (isSuccess) {
      const video = videos?.find((v) => v.id == parseInt(videoId));
      video && setVideo(video);
    }
  }, [isVideoSuccess, videos]);

  const parentFunction = (option, selected) => {
    const object = answer?.find((a) => a.quizId === option.quizId);
    if (object) {
      const same = object?.options?.find((o) => o.id === option.id);
      if (same) {
        const newOptions = object?.options?.filter((o) => o.id !== option.id);
        if (newOptions?.length > 0) {
          const updatedAnswer = [...answer];
          const index = updatedAnswer.findIndex(
            (ob) => ob.quizId === option.quizId
          );
          const newOptions = updatedAnswer[index].options.filter(
            (o) => o.id !== option.id
          );
          updatedAnswer[index].options = newOptions;
          console.log(updatedAnswer);
          setAnswer(updatedAnswer);
        } else {
          const newAnswer = answer.filter((a) => a.quizId !== option.quizId);
          setAnswer(newAnswer);
        }
      } else {
        const updatedAnswer = [...answer];
        const index = updatedAnswer.findIndex(
          (ob) => ob.quizId === option.quizId
        );
        updatedAnswer[index].options.push({
          id: option.id,
          isCorrect: option.isCorrect,
          selected,
        });
        console.log(updatedAnswer);
        setAnswer(updatedAnswer);
      }
    } else {
      const myObject = {
        quizId: option.quizId,
        options: [
          {
            id: option.id,
            isCorrect: option.isCorrect,
            selected,
          },
        ],
      };

      setAnswer([...answer, myObject]);
    }
  };

  const handleSubmit = () => {
    if (answer.length == myQuizzes?.length) {
      let correct = 0;
      for (let i = 0; i < answer.length; i++) {
        let isCorrect = true;
        for (let j = 0; j < answer[i].options.length; j++) {
          const option = answer[i].options[j];
          if (option.isCorrect !== option.selected) {
            isCorrect = false;
            break;
          }
        }
        if (isCorrect) {
          correct = correct + 1;
        }
      }

      const mark = correct * 5;
      const total_mark = myQuizzes?.length * 5;
      const total_worong = myQuizzes?.length - correct;
      const total_quiz = myQuizzes?.length;

      const quizData = {
        student_id: user?.id,
        student_name: user?.name,
        video_id: video?.id,
        video_title: video?.title,
        totalQuiz: total_quiz,
        totalCorrect: correct,
        totalWrong: total_worong,
        totalMark: total_mark,
        mark: mark,
      };
      addQuizsMark(quizData);
    } else {
      alert("please select the quiz option carefully...");
    }
  };

  return (
    <div className="main">
      <Nav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Quizzes for "{video?.title}"</h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>
          <div className="space-y-8 ">
            {myQuizzes?.length > 0 &&
              myQuizzes?.map((q, i) => (
                <SingleQuiz childFunction={parentFunction} quiz={q} key={i} />
              ))}
          </div>

          <button
            className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default Quiz;
