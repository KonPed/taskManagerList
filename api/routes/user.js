const express = require('express');
const app = express();
const router = express.Router();

const userController = require("../controllers/user.controller");

router.route('/users').post(userController.signUp);

module.exports = router;
