import { useEffect } from "react";
import Nav from "../../Navbar/Nav";
import SingleAssignment from "./SingleAssignment";
import { useGetAllAssignmentQuery } from "../../../features/assignment/assignmentApi";
import { Link } from "react-router-dom";

const Assignment = () => {
  const { data: assignments } = useGetAllAssignmentQuery();
  useEffect(() => {
    document.title = "Assginment";
  }, []);

  return (
    <div>
      <Nav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <Link to="/admin/assignment/add">
              <div className="w-full flex">
                <button className="btn ml-auto">Add Assignment</button>
              </div>
            </Link>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Title</th>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Mark</th>
                    <th className="table-th">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {assignments?.length > 0 &&
                    assignments.map((assignment, index) => (
                      <SingleAssignment assignment={assignment} key={index} />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Assignment;
