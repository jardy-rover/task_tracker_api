// Controller handles requests and responses

const taskService = require('../services/tasksService');
const { isTaskListEmpty, validateTaskId, validateTaskData, validateTaskUpdateData } = require('../validators/tasksValidator');

exports.getTasks = (req, res) => {
    const tasks = taskService.getTasks();

    if (isTaskListEmpty(tasks)) {
        return res.status(200).json({ message: "No tasks currently in the list.", data: [] });
    } // If isTaskListEmpty is true, return a message indicating the list is empty.

    res.status(200).json({ message: "List of tasks: ", data: tasks });
};

exports.getTaskById = (req, res) => {
    const idValidation = validateTaskId(req.params.id);

    if (!idValidation.isValid) {
        return res.status(400).json({ error: idValidation.error });
    } // Return a 400 Bad Request if validation fails

    const task = taskService.getTaskById(idValidation.value); // Uses the validated ID to retrieve the task from the service layer.

    if (!task) {
        return res.status(404).json({ error: "Requested task not found." });
    } // If the task is not found, return a 404 Not Found response.

    res.status(200).json({ message: `Task requested: ${task.title}`, data: task });
};

exports.createTask = async (req, res) => {
    const { title, description } = req.body || {}; // Safely destructure title and description from req.body, providing a default empty object to avoid errors

    const dataValidation = validateTaskData(title, description);

    if (!dataValidation.isValid) {
        return res.status(400).json({ errors: dataValidation.errors });
    }
    
    try {
        const newTask = taskService.createTask(
            dataValidation.value.title,
            dataValidation.value.description
        );

        res.status(201).json({ message: "Task added successfully.", data: newTask });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the task." });
    }
};

exports.updateTask = async (req, res) => {
    const idValidation = validateTaskId(req.params.id);
    if (!idValidation.isValid) {
        return res.status(400).json({ error: idValidation.error });
    }

    const dataValidation = validateTaskUpdateData(req.body.title, req.body.description);
    if (!dataValidation.isValid) {
        return res.status(400).json({ errors: dataValidation.errors });
    }

    const { title, description } = dataValidation.value;

    try {
        const updatedTask = await taskService.updateTask(idValidation.value, title, description);

        if (!updatedTask) {
            return res.status(404).json({ error: "Requested task not found." });
        } // If the task to be updated is not found, return a 404 Not Found response.

        res.status(200).json({ message: "Task updated successfully.", data: updatedTask });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the task." });
    }
};

exports.deleteTask = async (req, res) => {
    const idValidation = validateTaskId(req.params.id);
    if (!idValidation.isValid) {
        return res.status(400).json({ error: idValidation.error });
    }

    try {
        const isDeleted = await taskService.deleteTask(idValidation.value);

        if (!isDeleted) {
            return res.status(404).json({ error: "Requested task not found." });
        }
        
        res.status(200).json({ message: "Task deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the task." });
    }
};