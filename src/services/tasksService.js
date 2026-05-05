// Services handles business logic and data management

let tasks = [];

function newId() {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
}; // Function to generate a new unique ID based on the current maximum ID in the tasks array.

function getTasks() {
    return tasks;
}; // Function to retrieve all tasks from the in-memory array.

function getTaskById(id) {
    return tasks.find(task => task.id === id);
}; // Function to find a specific task by its ID. Returns the task object if found

function createTask(title, description) {
    const newTask = { id: newId(), title, description };
    tasks.push(newTask);
    return newTask;
}; // Function to create a new task with a ID, title, and description. The new task is added to the tasks array and returned.

function updateTask(id, title, description) {
    const task = getTaskById(id);

    if (!task) return null;

    if (title) task.title = title;
    if (description) task.description = description;

    return task;
}; // Function to update an existing task. It first retrieves the task by ID, then updates the title and/or description if provided. Returns the updated task or null if not found.

function deleteTask(id) {
    const numericId = Number(id); // Force IF to be treated as number

    const taskIndex = tasks.findIndex(task => Number(task.id) === numericId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        return true;
    }

    return false;
} // Function to delete a task by its ID. Returns true if the task was found and deleted, false otherwise.

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};