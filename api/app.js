const express = require('express');
const mongoose = require("../api/mongoose");
const app = express();
const listRoute = require('../api/routes/lists');
const taskRoute = require('../api/routes/task');
const BodyParser = require("body-parser");
app.use(BodyParser.json());

app.use('/api', listRoute);
app.use('/api', taskRoute);

app.listen(3000, () => {
  console.log('Server running on port 3000');
})
