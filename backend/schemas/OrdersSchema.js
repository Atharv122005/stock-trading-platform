const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrdersSchema = new Schema({
    name: String,
    qty: Number,
    price: Number,
    model: String,
})

module.exports={OrdersSchema};