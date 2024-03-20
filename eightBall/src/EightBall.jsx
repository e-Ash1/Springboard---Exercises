import React, { useState } from 'react';
import  answers  from './answers';

const INITIAL_MESSAGE = 'Think of a Question';
const INITIAL_COLOR = 'black';

function EightBall() {
    const [message, setMessage] = useState(INITIAL_MESSAGE);
    const [color, setColor] = useState(INITIAL_COLOR);

    const randomGen = () => {
        const randomNum = Math.floor(Math.random() * answers.length);
        const answer = answers[randomNum];
        setMessage(answer.msg);
        setColor(answer.color);

        setTimeout(() => {
            setMessage(INITIAL_MESSAGE);
            setColor(INITIAL_COLOR);
        }, 2000); 
    };

    return (
        <button
            onClick={randomGen}
            style={{
                backgroundColor: color,
                border: 'none',
                borderRadius: '50%', 
                color: 'white', 
                cursor: 'pointer',
                fontSize: '20px', 
                height: '200px', 
                width: '200px', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textTransform: 'uppercase', 
                outline: 'none', 
            }}
        >
            {message}
        </button>
    );
}

export default EightBall;
