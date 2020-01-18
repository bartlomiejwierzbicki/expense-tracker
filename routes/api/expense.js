const express = require("express");
const router = express.Router();

const Item = require("../../models/Item");

//GET
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

//POST
router.post("/", (req, res) => {
  const newItem = new Item({
    category: req.body.category,
    amount: req.body.amount,
    date: req.body.date
  });
  newItem.save().then(item => res.json(item));
});

//DELETE
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

//PUT
router.put("/:id", (req, res) => {
  Item.findById(req.params.id).then(item =>
    item
      .updateOne({
        category: req.body.category,
        amount: req.body.amount,
        date: req.body.date
      })
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json({ success: false }))
  );
});

module.exports = router;
