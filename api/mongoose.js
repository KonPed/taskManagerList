/* This file will handle connection to MongoDb database. */
const mongoose = require("mongoose");

mongoose.connect("mongodb://dekoza:4013@localhost/taskManagerDatabase", {useNewUrlParser: true, useFindAndModify: false}, (error, response) => {
  if (response) {
    console.log("Connected to Mongodb succesfully!!!");
  } else {
    console.log(error);
  }
});