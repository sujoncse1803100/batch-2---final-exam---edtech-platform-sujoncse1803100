// import React, { useState } from "react";
import SingleOption from "./SingleOption";

const SingleQuiz = ({ quiz, childFunction }) => {
  const { question, options, id } = quiz;
  // const [selected, setSelected] = useState(true);

  const parentFunction = (option, selected) => {
    childFunction(option, selected);
  };
  return (
    <div className="quiz">
      <h4 className="question">{question}</h4>
      <form className="quizOptions">
        {options?.length > 0 &&
          options.map((o, i) => {
            return (
              <SingleOption
                childFunction={parentFunction}
                option={o}
                key={i}
                id={id}
              />
              // <label key={i} htmlFor={`option${id}_q${o.id}`}>
              //   <input
              //     type="checkbox"
              //     id={`option${id}_q${o.id}`}
              //     onClick={() => handleQuizSelet(o)}
              //   />
              //   {o.option}
              // </label>
            );
          })}
      </form>
    </div>
  );
};

export default SingleQuiz;
