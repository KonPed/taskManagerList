const express = require('express');
const mongoose = require("../api/mongoose");
const app = express();
const BodyParser = require("body-parser");

/* Load Controllers */
const listController = require("./controllers/list.controller");
const taskController = require("./controllers/task.controller");
/* Load models */
const List = require('./models/list.model');
const Task = require('./models/task.model');

app.use(BodyParser.json());

/******* List Route Handlers ********/

/**
 * GET /lists
 * Get all Lists
 */
app.get('/lists', listController.lists_get_all)
/**
 * POST /lists
 * Create a list
 */
app.post('/lists', listController.lists_create_list)
/**
 * PATCH /lists:id
 * Update am existing list
 */
app.patch('/lists/:id', listController.lists_update_list);
/**
 * DELETE /lists:id
 * Delete am existing list
 */
app.delete('/lists/:id', listController.lists_delete_list);

/******* Tasks Route Handlers ********/

/**
 * GET /lists/:listId/tasks
 * get all tasks of a specific list.
 */
app.get("/lists/:listId/tasks", taskController.get_all_tasks);
/**
 * POST /lists/:listId/tasks
 * create a task in the list specified by id.
 */
app.post("/lists/:listId/tasks", taskController.tasks_create_task);
/**
 * PATCH /lists/:listId/tasks/:taskId
 * Update am existing Task
 */
app.delete("/lists/:listId/tasks/:taskId", taskController.tasks_delete_task);
/**
 * DELETE /lists:id
 * Delete am existing list
 */
app.delete('/lists/:id', listController.lists_delete_list);
app.listen(3000, () => {
  console.log('Server running on port 3000');
})
