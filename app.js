let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Corrected local storage to localStorage

// Add task form submission event listener
document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("taskTitle").value.trim(); // Trim to avoid empty spaces
    const description = document.getElementById("taskDescription").value.trim();
    const priority = document.getElementById("taskPriority").value;

    if (!title) {
        showToast("Task title cannot be empty!"); // Basic validation
        return;
    }

    const newTask = { id: Date.now(), title, description, priority, completed: false };
    tasks.push(newTask);
    saveTasks();
    showToast("Task Added!");
    displayTasks();
    document.getElementById("taskForm").reset();
});

// Display tasks
function displayTasks(filteredTasks = tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear existing tasks

    filteredTasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.className = task.priority.toLowerCase() + (task.completed ? " completed" : "");
        taskElement.innerHTML = `
        <div>
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <small>Priority: ${task.priority}</small>
        </div>
        <div>
            <button onclick="toggleComplete(${task.id})">${task.completed ? "Undo" : "Complete"}</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
        `;
        taskList.appendChild(taskElement);
    });
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    showToast("Task Deleted!");
    displayTasks();
}

// Toggle task completion
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        showToast(task.completed ? "Task Completed!" : "Marked as Pending!");
        displayTasks();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filter all tasks
function filterAll() {
    displayTasks(tasks);
}

// Filter completed tasks
function filterCompleted() {
    const completedTasks = tasks.filter(task => task.completed);
    displayTasks(completedTasks);
}

// Filter pending tasks
function filterPending() {
    const pendingTasks = tasks.filter(task => !task.completed);
    displayTasks(pendingTasks);
}

// Search tasks
document.getElementById("searchBox").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(query)
    );
    displayTasks(filteredTasks);
});

// Show toast notification
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "show";
    setTimeout(() => (toast.className = ""), 3000);
}

// Initial display of tasks
displayTasks();
