import React, { useState } from 'react';

const NewTodoForm = ({ addTodo }) => {
    const [formData, setFormData] = useState({
        task: '',
        notes: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        addTodo(formData);
        setFormData({ task: '', notes: '' });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='task'>Task:</label>
                <input
                    id='task'
                    name='task'
                    value={formData.task}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor='notes'>Notes:</label>
                <input
                    id='notes'
                    name='notes'
                    value={formData.notes}
                    onChange={handleChange}
                />
            </div>
            <button type='submit'>Add Task!</button>
        </form>
    );
};

export default NewTodoForm;
