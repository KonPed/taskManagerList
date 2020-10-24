const express = require('express');
const app = express();
const router = express.Router();

/* Load Controllers */
const listController = require("../controllers/list.controller");

/******* List Route Handlers ********/
router.route('/lists')
  .get(listController.lists_get_all)
  .post(listController.lists_create_list);

router.route('/lists/:id')
  .patch(listController.lists_update_list)
  .delete(listController.lists_delete_list);

module.exports = router;
