require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const PORT=process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

// const { watchlist, holdings, positions } = require("../dashboard/src/data/data.js");


const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const {OrdersModel} = require("./model/PositionsModel");

// app.get("/addPositions", async (req, res) => {
//   positions.forEach((item) => {
//     let newpositions = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newpositions.save();
//   });
//   res.send("Done!");
// });

app.get('/allHoldings',async(req,res)=>{
    let allHoldings= await HoldingsModel.find({});
    res.json(allHoldings);
})

app.get('/allPositions',async(req,res)=>{
    let allPositions= await PositionsModel.find({});
    res.json(allPositions);
})

app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  newOrder.save();
});

app.listen(3002,()=>{
    console.log("app is started");
    mongoose.connect(uri);
    console.log("Db is started");
});