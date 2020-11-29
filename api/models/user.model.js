const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwtSecret = '4388003486957259kjsdhf327607661kajsod9554515305184jkahsda28jnbaskjdbasd';

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
  },
  password: {
    type: String,
    required: false,
    minLength: 8
  },
  sessions: [{
    token: {
      type: String,
      required: true,
    },
    expiredAt: {
      type: Number,
      required: true
    }
  }]
});

/* Model methods */
UserSchema.statics.findByIdAndToken = async function(id, token) {
  let foundUser;
  const user = this;
  try {
    foundUser = await user.findOne({_id: id, "sessions.token": token});
  } catch (error) {

  }
  return foundUser;
}

UserSchema.statics.findByCredentials = async function(email, password) {
  const user = this;
  const foundUserByCredentials = await user.findOne({email: email});
  if (!foundUserByCredentials) {
    return Promise.reject();
  } else {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  }
}

UserSchema.statics.hasRefreshTokenExpired = async function(expiresAt) {
  const user = this;
  let secondsSinceEpoch = Date.now() / 1000;
  return expiresAt > secondsSinceEpoch;
}

/* Middleware for hashing the user password to database. */
UserSchema.pre('save', function(next) {
  const user = this;
  const saltRounds = 10;
  if (user.isModified('password')) {
    bcrypt.hash(user.password, saltRounds, function (error, hash) {
      user.password = hash;
      next();
    });
  }
});

/* Instance methods */
// UserSchema.methods.toJSON = function () {
//   const user = this;
//   const userObj = user.toObject();
//   console.log(user);
//   // delete userObj.password;
//   // delete userObj.sessions;
//   console.log(userObj);
// };

UserSchema.method('genereteAccessAuthToken', function() {
  console.log('Generating Token');
  const user = this;
  return new Promise((resolve, reject) => {
    /* Create the JWT and return. */
    jwt.sign({id: user._id.toHexString()}, jwtSecret, {expiresIn: '15m'}, (err, token) => {
      if (!err) {
        console.log('AccessToken =>', token);
        sessionSaveToDb(user);
        resolve(token);
      } else {
        reject();
      }
    });
  });
});

UserSchema.method('generateRefreshAuthToken', function () {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (!err) {
        let refreshToken = buf.toString('hex');
        console.log('RefreshToken =>', refreshToken);
        return resolve(refreshToken)
      } else {
        return reject();
      }
    })
  });
});

UserSchema.method('createSession', function () {
  let user = this;
  console.log(user);
  return new Promise((resolve, reject) => {
    user.generateRefreshAuthToken().then((refreshToken) => {
      return sessionSaveToDb(user, refreshToken);
    }).then((refreshToken) => {
      return resolve(refreshToken);
    }).catch((error) => {
      return reject(error);
    });
  });
});

let sessionSaveToDb =  (user, refreshToken) => {
  console.log("the refresh token", refreshToken);
  return new Promise((resolve, reject) => {
    let expiresAt = generateRefreshTokenExpiryTime();
    user.sessions.push({token: refreshToken, expiredAt: expiresAt});
    console.log('143', user);
    try {
      user.save();
      return resolve(refreshToken);
    } catch (error) {
      reject(error)
    }
  });
}

let generateRefreshTokenExpiryTime = () => {
  let daysUntilExpire = 10;
  let secondsUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
  return ((Date.now() / 1000) * secondsUntilExpire);
}

const User = mongoose.model('User', UserSchema);
module.exports = User;
