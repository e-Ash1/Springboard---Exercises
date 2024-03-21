import React, { useState } from 'react';
import Todo from './Todo/Todo';
import NewTodoForm from './NewTodoForm/NewTodoForm';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (newTodo) => {
      setTodos(oldTodos => [...oldTodos, newTodo]);
    };

    const removeTodo = (index) => {
      setTodos(todos.filter((_, i) => i !== index));
    };

    return (
      <div>
        {todos.map((todo, index) => (
          <Todo key={index} task={todo.task} removeTodo={() => removeTodo(index)} />
        ))}
        <NewTodoForm addTodo={addTodo} />
      </div>
    );
}

export default TodoList;
