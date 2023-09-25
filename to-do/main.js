document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage on page load
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to localStorage
    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task, index) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${task}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;

            const deleteButton = listItem.querySelector('.delete-btn');
            deleteButton.addEventListener('click', function () {
                // Remove the task from the tasks array and re-render
                tasks.splice(index, 1);
                renderTasks();
                saveTasksToLocalStorage();
            });

            taskList.appendChild(listItem);
        });
    }

    renderTasks(); // Initial rendering

    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            tasks.push(taskText);
            renderTasks();
            saveTasksToLocalStorage();
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            addButton.click();
        }
    });

});
