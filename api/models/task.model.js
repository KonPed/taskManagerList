const mongoose = require("mongoose");

const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  listId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
