import { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Quiz from "./components/Quiz";
import Question from "./components/Question";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [gameReset, setGameReset] = useState(false);
  const [selections, setSelections] = useState({
    "question-0": "",
    "question-1": "",
    "question-2": "",
    "question-3": "",
    "question-4": "",
  });

  const allAnswers = checkQuiz();

  function resetQuiz() {
    setGameReset((prev) => !prev);
    setQuizSubmitted(false);
    setSelections({
      "question-0": "",
      "question-1": "",
      "question-2": "",
      "question-3": "",
      "question-4": "",
    });
  }

  function checkQuiz() {
    return (
      quizQuestions &&
      quizQuestions.map((question, index) => {
        const guess = selections[`question-${index}`];
        return guess === question.correct_answer;
      })
    );
  }

  function startQuiz() {
    setQuizStarted(true);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelections((prevSelections) => ({
      ...prevSelections,
      [name]: value,
    }));
  };

  async function fetchQuizzes() {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=5");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setQuizQuestions(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchQuizzes();
  }, [gameReset]);

  return (
    <main>
      {!quizStarted && <Menu handleClick={startQuiz} />}
      {quizStarted && (
        <div className="quiz-container">
          {quizQuestions &&
            quizQuestions.map((question, index) => (
              <Question
                key={index}
                question={question}
                id={index}
                handleChange={handleChange}
                selections={selections}
                submitted={quizSubmitted}
                guesses={allAnswers}
                reset={gameReset}
              />
            ))}
          <div className="result">
            {quizSubmitted && (
              <p>
                You scored{" "}
                {allAnswers && allAnswers.filter((answer) => answer === true).length}/
                {quizQuestions && quizQuestions.length} correct answers
              </p>
            )}
            <button
              onClick={quizSubmitted ? resetQuiz : () => setQuizSubmitted(true)}
            >
              {quizSubmitted ? "Play Again" : "Check Answers"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
