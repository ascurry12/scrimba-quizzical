import React from 'react';
import Question from './Question';

function Quiz({questions, quizSubmitted}) {
    return (
        <div className='quiz-container'>
            {questions.map((question, index) => <Question key={index} question={question} id={index}/>)}
            <div className='result'>
            {quizSubmitted && <p>You scored 3/5 correct answers</p>}
            <button>{quizSubmitted ? "Play Again" : "Check Answers"}</button>
            </div>
        </div>
    );
}

export default Quiz;