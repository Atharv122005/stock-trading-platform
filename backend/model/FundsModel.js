const mongoose = require("mongoose");
const { FundsSchema } = require("../schemas/FundsSchema");

const FundsModel = mongoose.model("fund", FundsSchema);

module.exports = { FundsModel };