const mongoose = require("mongoose");
const { Schema } = mongoose;

const FundsSchema = new Schema({
  available: Number,
  used: Number,
});

module.exports = { FundsSchema };