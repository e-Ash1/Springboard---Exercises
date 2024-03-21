import React from 'react';


const Todo = ({ task, notes, removeTodo }) => {
    
    return(
        <div>
            <p>{task}</p>
            <p>{notes}</p>
            <button onClick={removeTodo}>X</button>
        </div>
    );
}

export default Todo;