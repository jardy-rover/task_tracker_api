const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('SERVER ONLINE');
});

app.listen(port, () => {  console.log(`SERVER hosted at http://localhost:${port}`);
});

// Simple express server that listens on port 3000 and responds with "SERVER ONLINE" when the root URL is accessed.

const tasks = require('./src/data/tasksData');

app.get('/tasks', (req, res) => {
    res.status(200).json({ message: "List of tasks: ", data: tasks });
});

app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).json({ error: "Task not found." });
    }
    
    res.status(200).json({ message: `Task requested: ${task.title}`, data: task });
});

app.post('/tasks', express.json(), (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required." });
    }

    const newTask = { id: tasks.length + 1, title, description };
    tasks.push(newTask);
    res.status(201).json({ message: "Task added successfully.", data: newTask });

    console.log(`New task added: ${title}`);
})

app.put('/tasks/:id', express.json(), (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description } = req.body;
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).json({ error: "Task not found." });
    }

    if (title) task.title = title;
    if (description) task.description = description;

    if (!title && !description) {
        return res.status(400).json({ error: "A title or description must be provided." });
    }

    res.status(200).json({ message: "Task updated successfully.", data: task });
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId); // find the index number of the task to be deleted

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found." });
    }

    tasks.splice(taskIndex, 1); // remove the task from the array using the index number

    res.status(204).json({ message: "Task deleted successfully." });
});


// Endpoints to manage tasks:
// GET /tasks - Retrieve all tasks
// GET /tasks/:id - Retrieve a specific task by ID
// POST /tasks - Create a new task (expects JSON body with title and description)
// PUT /tasks/:id - Update an existing task (expects JSON body with title and/or description)
// DELETE /tasks/:id - Delete a task by ID

