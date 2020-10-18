/* This file will handle connection to MongoDb database. */
const mongoose = require("mongoose");

mongoose.connect("mongodb://myUserAdmin:4013@localhost:27017/admin", {useNewUrlParser: true}, (error, response) => {
  if (response) {
    console.log("Connected to Mongodb succesfully!!!");
  } else {
    console.log(error);
  }
});

