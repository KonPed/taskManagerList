const express = require('express');
const app = express();
const mongoose = require("../api/mongoose");
const BodyParser = require("body-parser");

/* Load models */
const List = require('./models/list.model');
const Task = require('./models/task.model');

app.use(BodyParser.json());

/******* Route Handlers ********/
/**
 * GET /lists
 * Get all Lists
 */
app.get('/lists', ((req, res) => {
  List.find({}).then((lists) => {
    res.send(lists);
  });
}))
/**
 * POST /lists
 * Create a list
 */
app.post('/lists', ((req, res) => {
  let listTitle = req.body.title;
  const list = new List({
    title: listTitle
  });
  list.save().then((result) => {
    if (result) {
      console.log("list Inserted successfully");
      res.send(result);
    }
  })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
}))
/**
 * PATCH /lists:id
 * Update am existing list
 */
app.patch('/lists/:id', ((req, res) => {

}))
/**
 * DELETE /lists:id
 * Delete am existing list
 */
app.delete('/lists/:id', ((req, res) => {

}))


app.listen(3000, () => {
  console.log('Server running on port 3000');
})
