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
  // console.log(newUser);
  try {
    // const savedUser = await newUser.save();
    // console.log('savedUser', savedUser);
    console.log('newUser', newUser);
    const refreshToken = await newUser.createSession();
    // console.log(refreshToken);
    // console.log('refreshToken from saved User', refreshToken);
    // console.log(savedUser);
    res.json(newUser);
  } catch (error) {
    return next(error);
  }
});
