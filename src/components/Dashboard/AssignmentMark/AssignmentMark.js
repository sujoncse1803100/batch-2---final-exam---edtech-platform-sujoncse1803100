import { useEffect, useState } from "react";
import Nav from "../../Navbar/Nav";
import { useGetAllAssginmentsMarkQuery } from "../../../features/assignmentMark/assignmentMarkApi";
import SingleAssignment from "./SingleAssignment";

const AssignmentMark = () => {
  const { data: allAssginmentsMarks, isSuccess } =
    useGetAllAssginmentsMarkQuery();
  const [pending, setPending] = useState(0);
  const [sent, setSent] = useState(0);

  useEffect(() => {
    document.title = "Assginment Mark";
  }, []);

  useEffect(() => {
    const pendingAssignment = allAssginmentsMarks?.filter(
      (a) => a.status === "pending"
    );
    setPending(pendingAssignment?.length);
    const sentAssignment = allAssginmentsMarks?.filter(
      (a) => a.status === "published"
    );
    setSent(sentAssignment?.length);
  }, [isSuccess, allAssginmentsMarks]);

  useEffect(() => {
    // console.log(pending);
    // console.log(sent);
  }, [pending, sent]);

  return (
    <div>
      <Nav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{allAssginmentsMarks?.length}</span>
              </li>
              <li>
                Pending <span>{pending}</span>
              </li>
              <li>
                Mark Sent <span>{sent}</span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Mark</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {allAssginmentsMarks?.length &&
                    allAssginmentsMarks.map((assignment, i) => (
                      <SingleAssignment assignment={assignment} key={i} />
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

export default AssignmentMark;
