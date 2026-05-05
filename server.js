const express = require('express');
const app = express();

app.use(express.json());

const tasksRoute = require('./src/routes/tasksRoute');
app.use('/tasks', tasksRoute);

module.exports = app;