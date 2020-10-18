const mongoose = require(mongoose);

const {Schema} = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  _listId: {
    required: true
  }
});

const task = mongoose.model('Task', taskSchema);
