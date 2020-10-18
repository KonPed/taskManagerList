const mongoose = require("mongoose");

const { Schema } = mongoose;

const listSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  }
});

const List = mongoose.model('List', listSchema);
module.exports = List;
