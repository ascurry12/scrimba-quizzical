import React, { useEffect, useState } from "react";
import clsx from "clsx";

function Question({
  question,
  id,
  handleChange,
  selections,
  submitted,
  guesses,
  reset,
}) {
  const [answerChoices, setAnswerChoices] = useState(null);
  console.log(question)

  useEffect(() => {
    let arr = [...question.incorrect_answers];
    const randomIndex = Math.floor(Math.random() * (arr.length + 1));
    arr.splice(randomIndex, 0, question.correct_answer);
    setAnswerChoices(arr);
  }, [question]);

  return (
    <div className="question-container">
      <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
      <div className="answer-choices">
        {answerChoices &&
          answerChoices.map((choice, index) => {
            console.log(choice);
            const isCorrect = choice === question.correct_answer;
            const isIncorrect =
              choice === selections[`question-${id}`] && !guesses[id];

            const labelClass = clsx({
              checked: !submitted && selections[`question-${id}`] === choice,
              correct: submitted && isCorrect,
              incorrect: submitted && isIncorrect,
              disabled: submitted,
            });
            
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
