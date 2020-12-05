const { error } = require('protractor');
const User = require('../models/user.model');

exports.signUp = (async (req, res, next) => {
  console.log(req);
  let body = req.body;
  let newUser = new User({
    name: body.name,
    email: body.email,
    password: body.password,
    sessions: body.sessions
  });
  try {
    newUser.save().then(() => {
      return newUser.createSession().then((refreshToken) => {
        return newUser.genereteAccessAuthToken().then((accessToken) => {
          console.log("this is the accessToken", accessToken);
          return {refreshToken, accessToken};
        });
      }).then((authtokens) => {
        console.log('AuthTokens =>', authtokens);
        res.header("x-refresh-token", authtokens.refreshToken)
        .header("x-access-token", authtokens.accessToken)
        .send(newUser);
      }).catch((error) => {
        console.log("Error generating tokens => ", error);
        res.status(400).send(error);
      });
    });
  } catch (conError) {
    console.log('Connection problem', conError);
  }
});
