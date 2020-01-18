const express = require("express");
const router = express.Router();

const Income = require("../../models/Income");

//GET
router.get("/", (req, res) => {
  Income.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

//POST
router.post("/", (req, res) => {
  const newIncome = new Income({
    category: req.body.category,
    amount: req.body.amount,
    date: req.body.date
  });
  newIncome.save().then(item => res.json(item));
});

//DELETE
router.delete("/:id", (req, res) => {
  Income.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

//PUT
router.put("/:id", (req, res) => {
  Income.findById(req.params.id).then(item =>
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
