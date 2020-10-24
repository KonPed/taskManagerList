const express = require('express');
const app = express();
const router = express.Router();

const taskController = require("../controllers/task.controller");

router.route('/lists/:listId/tasks')
  .get(taskController.get_all_tasks)
  .post(taskController.tasks_create_task);

router.route('/lists/:listId/tasks/:taskId')
  .get(taskController.get_single_task)
  .patch(taskController.tasks_update_task)
  .delete(taskController.tasks_delete_task);

module.exports = router;
