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
const { OrdersModel } = require("./model/OrdersModel");

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


app.get("/allOrders", async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({});
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    const newOrder = new OrdersModel({ name, qty, price, mode });
    await newOrder.save();

    if (mode === "BUY") {
      const holding = await HoldingsModel.findOne({ name });

      if (holding) {
        const totalQty = holding.qty + qty;
        holding.avg =
          (holding.avg * holding.qty + price * qty) / totalQty;
        holding.qty = totalQty;
        holding.price = price;
        await holding.save();
      } else {
        await HoldingsModel.create({
          name,
          qty,
          avg: price,
          price,
          net: "0.00%",
          day: "0.00%",
        });
      }
    }

    res.status(201).json({ message: "Order saved successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


mongoose
  .connect(uri)
  .then(() => {
    console.log("Db is started");
    app.listen(PORT, () => console.log(`app is started on ${PORT}`));
  })
  .catch((err) => console.error("DB connection failed:", err));