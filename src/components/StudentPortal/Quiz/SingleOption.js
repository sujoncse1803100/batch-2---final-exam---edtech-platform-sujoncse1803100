import React from "react";

const SingleOption = ({ option: o, id, childFunction }) => {
  const handleQuizSelet = (option) => {
    // setSelected(!selected);
    childFunction({ quizId: id, ...option }, true);
  };
  return (
    <label htmlFor={`option${id}_q${o.id}`}>
      <input
        type="checkbox"
        id={`option${id}_q${o.id}`}
        onClick={() => handleQuizSelet(o)}
      />
      {o.option}
    </label>
  );
};

export default SingleOption;
