import React from 'react';
import { useParams } from 'react-router-dom';

function Calculator() {
    const { operation, num1, num2 } = useParams();
    let result;

    switch (operation) {
        case 'add':
            result = Number(num1) + Number(num2);
            break;
        case 'subtract':
            result = Number(num1) - Number(num2);
            break;
        case 'multiply':
            result = Number(num1) * Number(num2);
            break;
        case 'divide':
            result = Number(num1) / Number(num2);
            break;
        default:
            return <p>Invalid operation</p>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Result</h2>
                <p className="text-xl">{result}</p>
            </div>
        </div>
    );
}

export default Calculator;
