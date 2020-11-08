const List = require('../models/list.model');

/* Use async - await as a best practice. */
exports.lists_get_all = (async (req, res) => {
  try {
    const lists = await List.find({});
    res.json(lists);
  }catch (error) {
    res.send(error);
  }
})

exports.lists_create_list = ((req, res) => {
  let listTitle = req.body.title;
  const list = new List({
    title: listTitle
  });
  list.save().then((result) => {
    if (result) {
      console.log("list inserted successfully");
      res.send(result);
    }
  })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
})

exports.lists_update_list = ((req, res) => {
  List.findOneAndUpdate({_id: req.params.id}, {
    $set: req.body
  }).then(() => {
    res.sendStatus(200);
  }).catch((error) => console.log(error));
})

exports.lists_delete_list = ((req, res) => {
  List.findOneAndRemove({_id: req.params.id}).then((removedList) => {
    console.log("List with id " + req.params.id + " has been removed.");
    res.send(removedList);
  })
})
