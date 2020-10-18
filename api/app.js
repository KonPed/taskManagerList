const express = require('express');
const app = express();

/* Load models */
const list = require('./models/list.model');
const task = require('./models/task.model');


/******* Route Handlers ********/
/**
 * GET /lists
 * Get all Lists
 */
app.get('/lists', ((req, res) => {
  list.find({}).then((lists) => {
    res.send(lists);
  });
}))
/**
 * POST /lists
 * Create a list
 */
app.post('/lists', ((req, res) => {

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
