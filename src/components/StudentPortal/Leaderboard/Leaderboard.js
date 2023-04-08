import { useEffect, useState } from "react";
import Nav from "./../../Navbar/Nav";
import { useGetAllQuizsMarkQuery } from "../../../features/quizMark/quizMarkApi";
import { useGetAllAssginmentsMarkQuery } from "../../../features/assignmentMark/assignmentMarkApi";

const Leaderboard = () => {
  const { id, name } = JSON.parse(localStorage.getItem("user")).user;
  const { data: allQuizMarks, isSuccess } = useGetAllQuizsMarkQuery();
  const { data: allAssignmetMarks, isSuccess: isAllAssignmentMarkSuccess } =
    useGetAllAssginmentsMarkQuery();
  const [students, setStudents] = useState([]);
  const [sortedStudents, setSortedStudents] = useState([]);
  const [userWithAssignmentMark, setUserWithAssignmentMark] = useState([]);
  const [userWithQuizMark, setUserWithQuizMark] = useState([]);
  const [userData, setUserData] = useState({
    student_id: id,
    name: name,
    assignmentMarks: 0,
    quizMarks: 0,
    totalMarks: 0,
  });

  useEffect(() => {
    if (isSuccess) {
      const newStudents = allQuizMarks?.map((quiz) => {
        const user = {
          student_id: quiz?.student_id,
          name: quiz?.student_name,
          quizMarks: quiz?.mark,
        };
        return user;
      });

      const updatadNewStudents = newStudents?.reduce((arr, ob) => {
        const x = arr.find((item) => item.student_id === ob.student_id);
        if (!x) {
          return arr.concat([ob]);
        } else {
          x.quizMarks += ob.quizMarks;
          return arr;
        }
      }, []);
      setUserWithQuizMark(updatadNewStudents);
    }
  }, [isSuccess, allQuizMarks]);

  useEffect(() => {
    if (isAllAssignmentMarkSuccess) {
      const newStudents = allAssignmetMarks?.map((assignment) => {
        const user = {
          student_id: assignment?.student_id,
          name: assignment.student_name,
          assignmentMarks: assignment?.mark,
        };
        return user;
      });

      const updatadNewStudents = newStudents?.reduce((arr, ob) => {
        const x = arr.find((item) => item.student_id === ob.student_id);
        if (!x) {
          return arr.concat([ob]);
        } else {
          x.assignmentMarks += ob.assignmentMarks;
          return arr;
        }
      }, []);
      setUserWithAssignmentMark(updatadNewStudents);
    }
  }, [isAllAssignmentMarkSuccess, allAssignmetMarks]);

  useEffect(() => {
    if (userWithAssignmentMark?.length > 0 && userWithQuizMark?.length > 0) {
      const combinedArray = userWithAssignmentMark.map((item) => {
        const matchingItem = userWithQuizMark.find(
          (item2) => item2.student_id === item.student_id
        );
        return { ...item, ...matchingItem };
      });

      const finalArray = combinedArray?.filter((ob) => {
        if (!ob?.quizMarks) {
          ob["quizMarks"] = 0;
        }
        if (!ob?.assignmentMarks) {
          ob["assignmentMarks"] = 0;
        }
        return ob;
      }, []);

      setStudents(finalArray);
    }
  }, [userWithAssignmentMark, userWithQuizMark]);

  useEffect(() => {
    if (isAllAssignmentMarkSuccess) {
      const newStudents = allAssignmetMarks?.map((assignment) => {
        const user = {
          student_id: assignment?.student_id,
          name: assignment.student_name,
          assignmentMarks: assignment?.mark,
        };
        return user;
      });

      const updatadNewStudents = newStudents?.reduce((arr, ob) => {
        const x = arr.find((item) => item.student_id === ob.student_id);
        if (!x) {
          return arr.concat([ob]);
        } else {
          x.assignmentMarks += ob.assignmentMarks;
          return arr;
        }
      }, []);
      setUserWithAssignmentMark(updatadNewStudents);
    }
  }, [isAllAssignmentMarkSuccess, allAssignmetMarks]);

  // sorting and ranking acording to the total marks
  useEffect(() => {
    if (students?.length > 0) {
      const sortedStudents = [...students].sort((a, b) => {
        const aMarks = a.assignmentMarks + a.quizMarks;
        const bMarks = b.assignmentMarks + b.quizMarks;
        return bMarks - aMarks;
      });

      const studentsWithTotalMarks = sortedStudents.map((student) => {
        const totalMarks = student.assignmentMarks + student.quizMarks;
        return { ...student, totalMarks };
      });

      studentsWithTotalMarks.sort((a, b) => b.totalMarks - a.totalMarks);

      // set ranking based on the total marks
      let rank = 0;
      let prevTotalMarks = null;

      const studentsWithRanking = studentsWithTotalMarks.map((student) => {
        if (student.totalMarks !== prevTotalMarks) {
          rank++;
        }
        prevTotalMarks = student.totalMarks;
        return {
          ...student,
          rank,
        };
      });

      // take top 20 students
      if (studentsWithRanking?.length > 20) {
        const top20Students = studentsWithRanking.slice(0, 20);
        setSortedStudents(top20Students);
      } else {
        setSortedStudents(studentsWithRanking);
      }

      const findUser = studentsWithRanking?.find((s) => s.student_id === id);
      if (findUser) {
        setUserData({ ...findUser });
      }
    }
  }, [students, id]);

  return (
    <div>
      <Nav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr>
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-2 border-cyan">
                  <td className="table-td text-center font-bold">
                    {userData?.rank}
                  </td>
                  <td className="table-td text-center font-bold">
                    {userData?.name}
                  </td>
                  <td className="table-td text-center font-bold">
                    {userData?.quizMarks}
                  </td>
                  <td className="table-td text-center font-bold">
                    {userData?.assignmentMarks}
                  </td>
                  <td className="table-td text-center font-bold">
                    {userData?.totalMarks}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr className="border-b border-slate-600/50">
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                {sortedStudents?.length > 0 ? (
                  sortedStudents?.map((student, i) => {
                    const {
                      name,
                      quizMarks,
                      assignmentMarks,
                      totalMarks,
                      rank,
                    } = student;
                    return (
                      <tr className="border-b border-slate-600/50" key={i}>
                        <td className="table-td text-center">{rank}</td>
                        <td className="table-td text-center">{name}</td>
                        <td className="table-td text-center">{quizMarks}</td>
                        <td className="table-td text-center">
                          {assignmentMarks}
                        </td>
                        <td className="table-td text-center">{totalMarks}</td>
                      </tr>
                    );
                  })
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
