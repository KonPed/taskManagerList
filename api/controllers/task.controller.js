const Task = require('../models/task.model');

exports.get_all_tasks = ((req, res) => {
  Task.find({listId: req.params.listId}).then((tasks) => {
    res.send(tasks);
  }).catch((error) => {
    console.log(error);
  })
})

exports.get_single_task = ((req, res) => {
  Task.findOne({_id: req.params.taskId, listId: req.params.listId}).then((foundTask) => {
    res.send(foundTask);
  }).catch((error) => console.log(error));
})

exports.tasks_create_task = (async (req, res) => {
  const title = req.body.title;
  const listId = req.params.listId;
  const newTask = new Task({
    title: title,
    listId: listId
  })
  try {
    const result = await newTask.save();
    console.log("Task inserted successfully");
    res.json(result);
  } catch (error) {
    res.send(error);
  }
})

exports.tasks_update_task = (async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const result = await Task.findOneAndUpdate({_id: taskId}, {
      $set: req.body
    });
  } catch (error) {
    res.send(error);
  }
})

exports.tasks_delete_task = ((req, res) => {
  Task.findOneAndRemove({_id: req.params.taskId}).then((result) => {
    console.log("Task with id " + req.params.taskId + " has been removed.");
    res.send(result);
  });
})
