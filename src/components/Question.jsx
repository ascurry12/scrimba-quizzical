import React from "react";
import clsx from "clsx";

function Question({
  question,
  id,
  handleChange,
  selections,
  submitted,
  guesses,
}) {
  const answerChoices = [
    ...question.incorrect_answers,
    question.correct_answer,
  ];

  return (
    <div className="question-container">
      <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
      <div className="answer-choices">
        {answerChoices.map((choice, index) => {
          const isCorrect = choice === question.correct_answer;
          const isIncorrect =
            choice === selections[`question-${id}`] && !guesses[id];

          const labelClass = clsx({
            checked: !submitted && selections[`question-${id}`] === choice,
            correct: submitted && isCorrect,
            incorrect: submitted && isIncorrect,
            disabled: submitted,
          });
          console.log("GUESSES", guesses[id]);
          return (
            <React.Fragment key={index}>
              <input
                type="radio"
                name={`question-${id}`}
                id={`question-${id}-${index}`}
                value={choice}
                onChange={handleChange}
                checked={selections[`question-${id}`] === choice}
                disabled={submitted}
              ></input>
              <label
                htmlFor={`question-${id}-${index}`}
                className={labelClass}
                dangerouslySetInnerHTML={{ __html: choice }}
              ></label>
            </React.Fragment>
          );
        })}
      </div>
      <hr />
    </div>
  );
}

export default Question;
