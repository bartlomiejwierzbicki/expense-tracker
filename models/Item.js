const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  dateadd: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model("expense", ItemSchema);
