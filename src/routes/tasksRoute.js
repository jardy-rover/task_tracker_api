//Routes handles the API endpoints and connects them to the controller functions

const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

router.get('/', tasksController.getTasks);
router.get('/:id', tasksController.getTaskById);
router.post('/', tasksController.createTask);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;