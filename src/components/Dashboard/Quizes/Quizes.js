import Nav from "../../Navbar/Nav";
import { useEffect } from "react";
import SingleQuiz from "./SingleQuiz";
import { useGetAllQuizQuery } from "../../../features/quiz/quizApi";
import { Link } from "react-router-dom";

const Quizes = () => {
  const { data: quizes } = useGetAllQuizQuery();
  useEffect(() => {
    document.title = "Quizes";
  }, []);

  return (
    <div>
      <Nav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <Link to="/admin/quizes/add">
              <div className="w-full flex">
                <button className="btn ml-auto">Add Quiz</button>
              </div>
            </Link>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Question</th>
                    <th className="table-th">Video</th>
                    <th className="table-th justify-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-600/50">
                  {quizes?.length &&
                    quizes.map((q, i) => <SingleQuiz quiz={q} key={i} />)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quizes;
