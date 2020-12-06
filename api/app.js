const express = require('express');
const mongoose = require("../api/mongoose");
const app = express();
const User = require("./models/user.model");
const listRoute = require('../api/routes/lists');
const taskRoute = require('../api/routes/task');
const userRoute = require('../api/routes/user');
const BodyParser = require('body-parser');
app.use(BodyParser.json());

let verifyMethod = (req, res, next) => {
  console.log('hello');
  let refreshToken = req.header('x-refresh-token');
  let id = req.header('_id');
  console.log(id);
  console.log(refreshToken);
  let sessionValid = false;
  User.findByIdAndToken(id, refreshToken).then((user) => {
    console.log("USER => ",  user);
    if (!user) {
      return Promise.reject({
        "error": "User not found. Make sure that the refresh token and id are correct."
      });
    } else {
      req.user_id = user._id;
      req.userObject = user;
      req.refreshToken = refreshToken;
      console.log(req);
      user.sessions.forEach((session) => {
        if (session.token === refreshToken) {
          if (User.hasRefreshTokenExpired(session.expiredAt) === false) {
            sessionValid = true;
          }
        }
      });
      if (sessionValid) {
        next();
      } else {
        return Promise.reject({
          "error": "Refresh token has expired or session is invalid"
        });
      }
    }
  }).catch((error) => {
    res.status(401).send(error);
  })
};

/* Middleware to Root. */
app.use('/api', listRoute);
app.use('/api', taskRoute);
app.use('/api', userRoute);
app.get('/api/users/access', verifyMethod, (req, res) => {
  req.userObject.genereteAccessAuthToken().then((accessToken) => {
    res.header("x-access-token", accessToken).send({accessToken});
  }).catch((error) => {
    res.status(400).send(error);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
})
