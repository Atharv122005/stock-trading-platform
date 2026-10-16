import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid, price }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(price ?? 0);

  const { closeSellWindow } = useContext(GeneralContext);

  const handleSellClick = async () => {
    const qty = Number(stockQuantity);
    const sellPrice = Number(stockPrice);

    if (!Number.isFinite(qty) || qty <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }
    if (!Number.isFinite(sellPrice) || sellPrice <= 0) {
      alert("Please enter a valid stock price.");
      return;
    }

    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: qty,
        price: sellPrice,
        mode: "SELL",
      });
      alert("Sell order saved successfully!");
      closeSellWindow();
    } catch (error) {
      alert(error.response?.data?.message || "Sell order failed.");
    }
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Selling {uid}</span>
        <div>
          <button className="btn btn-blue" onClick={handleSellClick}>
            Sell
          </button>
          <button className="btn btn-grey" onClick={closeSellWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;