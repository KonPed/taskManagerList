const Task = require('../models/task.model');

exports.get_all_tasks = ((req, res) => {
  Task.find({_listId: req.params.listId}).then((tasks) => {
    res.send(tasks);
  }).catch((error) => {
    console.log(error);
  })
})

exports.get_single_task = ((req, res) => {
  Task.findOne({_id: req.params.taskId, _listId: req.params.listId}).then((foundTask) => {
    res.send(foundTask);
  }).catch((error) => console.log(error));
})

exports.tasks_create_task = ((req, res) => {
  let title = req.body.title;
  let newTask = new Task({
    title: title,
    _listId: req.params.listId
  })
  newTask.save().then((result) => {
    if (result) {
      console.log("Task inserted successfully");
      res.send(result);
    }
  }).catch((error) => {
    res.send(error);
  });
})

exports.tasks_update_task = ((req, res) => {
  Task.findOneAndUpdate({_id: req.params.taskId}, {
    $set: req.body
  }).then(() => {
    res.sendStatus(200);
  }).catch((error) => console.log(error));
})

exports.tasks_delete_task = ((req, res) => {
  Task.findOneAndRemove({_id: req.params.taskId}).then((result) => {
    console.log("Task with id " + req.params.taskId + " has been removed.");
    res.send(result);
  });
})
