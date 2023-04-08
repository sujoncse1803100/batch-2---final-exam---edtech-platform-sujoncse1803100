import React from "react";
import { useUpdateAssginmentsMarkMutation } from "../../../features/assignmentMark/assignmentMarkApi";
import { useState } from "react";

const SingleAssignment = ({ assignment }) => {
  const { title, createdAt, student_name, repo_link, status, mark } =
    assignment || {};
  const [updateAssginmentsMark] = useUpdateAssginmentsMarkMutation();
  const [marks, setMarks] = useState(100);

  const handleMark = () => {
    updateAssginmentsMark({ ...assignment, mark: marks, status: "published" });
  };
  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">{createdAt}</td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{repo_link}</td>
      {status === "pending" ? (
        <td className="table-td input-mark">
          <input
            max="100"
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokewdth="2"
            stroke="currentColor"
            className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
            onClick={handleMark}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </td>
      ) : (
        <td
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "20px",
          }}
        >
          <div>{mark}</div>
        </td>
      )}
    </tr>
  );
};

export default SingleAssignment;
