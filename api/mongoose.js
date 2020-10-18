/* This file will handle connection to MongoDb database. */
const mongoose = require("mongoose");

mongoose.connect("mongodb://myUserAdmin:4013@localhost:27017/admin", {useNewUrlParser: true}, (function () {
  console.log("Connected to MongoDB successfully.")
}).catch(function (error) {
  console.log("Error while attempting to connect to MongoDB");
  console.log(error);
}));

