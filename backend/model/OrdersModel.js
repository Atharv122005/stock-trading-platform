const mongoose = require("mongoose");
const { OrdersSchema } = require("../schemas/OrdersSchema");

const OrdersModel = mongoose.model("holding", HoldingsSchema);
module.exports = { OrdersModel };