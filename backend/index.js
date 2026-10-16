require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());


// const { watchlist, holdings, positions } = require("../dashboard/src/data/data.js");


const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { FundsModel } = require("./model/FundsModel");


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

app.get('/allHoldings', async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
})

app.get('/allPositions', async (req, res) => {
  let allPositions = await PositionsModel.find({});
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
    const name = req.body.name;
    const qty = Number(req.body.qty);
    const price = Number(req.body.price);
    const mode = String(req.body.mode).toUpperCase();
    if (!name || !(qty > 0) || !(price > 0) || !["BUY", "SELL"].includes(mode)) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const holding = await HoldingsModel.findOne({ name });

    if (mode === "SELL" && (!holding || holding.qty < qty)) {
      return res.status(400).json({ message: "Not enough shares to sell" });
    }

    let funds = await FundsModel.findOne({});
    if (!funds) funds = await FundsModel.create({ available: 100000, used: 0 });

    const total = qty * price;

    if (mode === "BUY" && funds.available < total) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    const newOrder = new OrdersModel({ name, qty, price, mode });
    await newOrder.save();

    if (mode === "BUY") {
      if (holding) {
        const totalQty = holding.qty + qty;
        holding.avg = (holding.avg * holding.qty + price * qty) / totalQty;
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
    } else {
      holding.qty = holding.qty - qty;
      holding.price = price;
      if (holding.qty === 0) {
        await HoldingsModel.deleteOne({ _id: holding._id });
      } else {
        await holding.save();
      }
    }

    if (mode === "BUY") {
      funds.available -= total;
      funds.used += total;
    } else {
      funds.available += total;
      funds.used = Math.max(0, funds.used - total);
    }
    await funds.save();

    res.status(201).json({ message: "Order saved successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get("/funds", async (req, res) => {
  try {
    let funds = await FundsModel.findOne({});
    if (!funds) {
      funds = await FundsModel.create({ available: 100000, used: 0 });
    }
    res.json(funds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/addFunds", async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (!(amount > 0)) {
      return res.status(400).json({ message: "Invalid amount" });
    }
    let funds = await FundsModel.findOne({});
    if (!funds) funds = await FundsModel.create({ available: 0, used: 0 });
    funds.available += amount;
    await funds.save();
    res.json(funds);
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