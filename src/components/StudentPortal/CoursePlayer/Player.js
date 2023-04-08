import React from "react";
import { useState } from "react";
import "./Modal.css";
import { useGetAllAssignmentQuery } from "../../../features/assignment/assignmentApi";
import { useEffect } from "react";
import {
  useAddAssginmentsMarkMutation,
  useGetAllAssginmentsMarkQuery,
} from "../../../features/assignmentMark/assignmentMarkApi";
import { useGetAllQuizQuery } from "../../../features/quiz/quizApi";
import { useGetAllQuizsMarkQuery } from "../../../features/quizMark/quizMarkApi";
import { Link } from "react-router-dom";

const Player = ({ video }) => {
  const [addAssginmentsMark, { isSuccess: isAddAssginmentsMark }] =
    useAddAssginmentsMarkMutation();
  const { data: allAssginmentMark, isSuccess: isAllAssignmentMarkSuccess } =
    useGetAllAssginmentsMarkQuery();
  const { data: quizMarks, isSuccess: isGetQuizMarkSuccess } =
    useGetAllQuizsMarkQuery();
  const { data: assignments, isSuccess } = useGetAllAssignmentQuery();
  const { data: quizzes, isSuccess: isAllQuizSuccess } = useGetAllQuizQuery();
  const { title, description, createdAt, url, id } = video;
  const [assignment, setAssignment] = useState({});
  // const [quiz, setQuiz] = useState({});
  const [repository, setRepository] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [foundQuiz, setFoundQuizs] = useState(false);
  const [foundAssignment, setFoundAssginment] = useState(false);
  const [modal, setModal] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("user")).user;

  useEffect(() => {
    const assignmnt = assignments?.find((a) => a.video_id == id);
    assignmnt && setAssignment({ ...assignmnt });
    assignmnt && setFoundAssginment(true);
    !assignmnt && setFoundAssginment(false);
  }, [isSuccess, assignments, id]);

  useEffect(() => {
    const qz = quizzes?.find((a) => a.video_id == id);
    // qz && setQuiz({ ...qz });
    qz && setFoundQuizs(true);
    !qz && setFoundQuizs(false);
  }, [isAllQuizSuccess, quizzes, id]);

  useEffect(() => {
    if (isGetQuizMarkSuccess) {
      const submittedQuiz = quizMarks?.find(
        (a) => a.video_id == id && a.student_id == loggedInUser?.id
      );

      if (foundQuiz) {
        if (submittedQuiz) {
          setIsQuizSubmitted(true);
        } else {
          setIsQuizSubmitted(false);
        }
      }
    }
  }, [isGetQuizMarkSuccess, assignment, loggedInUser, quizMarks, foundQuiz]);

  useEffect(() => {
    const submittedAssignment = allAssginmentMark?.find(
      (a) =>
        a.assignment_id == assignment?.id && a.student_id == loggedInUser?.id
    );

    foundAssignment &&
      isAllAssignmentMarkSuccess &&
      submittedAssignment &&
      setIsSubmitted(true);
    foundAssignment && !submittedAssignment && setIsSubmitted(false);
  }, [
    isAllAssignmentMarkSuccess,
    assignment,
    loggedInUser,
    allAssginmentMark,
    foundAssignment,
  ]);

  const formattedDate = new Date(createdAt.toString()).toLocaleDateString(
    "en-US",
    { day: "numeric", month: "long", year: "numeric" }
  );

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    const myAssignment = {
      student_id: loggedInUser?.id,
      student_name: loggedInUser?.name,
      assignment_id: assignment?.id,
      title: assignment?.title,
      createdAt: new Date().toISOString(),
      totalMark: assignment?.totalMark,
      mark: 0,
      repo_link: repository,
      status: "pending",
    };

    addAssginmentsMark(myAssignment);
  };

  useEffect(() => {
    isAddAssginmentsMark && setModal(false);
  }, [isAddAssginmentsMark]);

  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      <iframe
        width="100%"
        className="aspect-video"
        src={url}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
          {title}
        </h1>
        <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
          Uploaded on {formattedDate}
        </h2>

        <div className="flex gap-4">
          {foundAssignment ? (
            !isSubmitted ? (
              <button
                className={`px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary`}
                onClick={toggleModal}
              >
                এসাইনমেন্ট
              </button>
            ) : (
              <button
                className={`px-3 submitted font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary`}
                disabled={isSubmitted}
              >
                এসাইনমেন্ট দিয়েছেন
              </button>
            )
          ) : (
            <button
              className={`px-3 submitted font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary`}
              disabled={isSubmitted}
            >
              এসাইনমেন্ট নেই
            </button>
          )}

          {modal && (
            <div className="modal ">
              <div onClick={toggleModal} className="overlay "></div>
              <div className="modal-content ">
                <h1 style={{ color: "black" }}>This is Assignment title</h1>
                <button
                  style={{ color: "black" }}
                  className="close-modal"
                  onClick={toggleModal}
                >
                  CLOSE
                </button>

                <div className="content">
                  <form
                    action=""
                    className="modal-from"
                    onSubmit={handleAssignmentSubmit}
                  >
                    <div>
                      <input
                        required
                        className="input rounded-t-md"
                        placeholder="Repository Link"
                        onChange={(e) => setRepository(e.target.value)}
                      />
                    </div>
                    <button className="assignment-submit-btn" type="submit">
                      Sumbit Assignment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {foundQuiz ? (
            !isQuizSubmitted ? (
              <Link to={`/quiz/${id}`}>
                <button className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
                  কুইজে অংশগ্রহণ করুন
                </button>
              </Link>
            ) : (
              <button className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
                কুইজ দিয়েছেন
              </button>
            )
          ) : (
            <button className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
              কুইজ নেই
            </button>
          )}
        </div>
        <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
      </div>
    </div>
  );
};

export default Player;
