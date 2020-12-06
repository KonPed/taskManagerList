const express = require('express');
const app = express();
const router = express.Router();

const userController = require("../controllers/user.controller");

router.route('/users/signup').post(userController.signUp);
router.route('/users/login').post(userController.login);
// router.route('/users/access').get(userController.accessToken);

module.exports = router;
