const { error } = require('protractor');
const User = require('../models/user.model');

/* Signup method.*/
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
    await newUser.save();
    const refreshToken = await newUser.createSession();
    const accessToken = await newUser.genereteAccessAuthToken();
    console.log('AuthTokens =>', {refreshToken, accessToken});
    res.header("x-refresh-token", refreshToken)
      .header("x-access-token", accessToken)
      .send(newUser);
  } catch (conError) {
    console.log("Error generating tokens => ", error);
    res.sendStatus(400);
  }
});

/* Login method */
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findByCredentials(email, password).then((user) => {
    user.createSession().then((refreshToken) => {
      return user.genereteAccessAuthToken().then((accessToken) => {
        return {refreshToken, accessToken};
      });
    }).then((authtokens) => {
      console.log('AuthTokens =>', authtokens);
      res.header("x-refresh-token", authtokens.refreshToken)
        .header("x-access-token", authtokens.accessToken)
        .send(user);
    });
  }).catch((error) => {
    console.log("Error => User Not found. ", error);
    res.sendStatus(400);
  });
}

/* Root method */
exports.accessToken = (req, res) => {
  console.log(req);
  req.userObject.genereteAccessAuthToken().then((accessToken) => {
    res.header("x-access-token", accessToken).send(accessToken);
  }).catch((error) => {
    res.status(400).send(error);
  });
};
