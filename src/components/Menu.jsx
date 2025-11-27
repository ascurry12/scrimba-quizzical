import React from 'react';

function Menu ({handleClick}) {
    return (
        <div className='menu'>
            <h1>Quizzical</h1>
            <p>Try your hand at random trivia!</p>
            <button onClick={handleClick}>Start Quiz</button>
        </div>
    );
};

export default Menu;