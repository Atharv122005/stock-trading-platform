import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid , price }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(price ?? 0);

  const { closeBuyWindow } = useContext(GeneralContext);

const handleBuyClick = async () => {
  const qty = Number(stockQuantity);
  const price = Number(stockPrice);

  if (!Number.isFinite(qty) || qty <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  if (!Number.isFinite(price) || price <= 0) {
    alert("Please enter a valid stock price.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:3002/newOrder",
      {
        name: uid,
        qty: qty,
        price: price,
        mode: "BUY",
      }
    );

    console.log("Buy order response:", response.data);
    alert("Buy order saved successfully!");

    closeBuyWindow();
  } catch (error) {
    console.error(
      "Buy order failed:",
      error.response?.data || error.message
    );

    alert(
      error.response?.data?.message ||
      "Buy order failed. Please check the backend."
    );
  }
};

  // const handleBuyClick = () => {
  //   try {
  //   axios.post("http://localhost:3002/newOrder", {
  //     name: uid,
  //     qty: stockQuantity,
  //     price: stockPrice,
  //     mode: "BUY",
      
  //   });

  //   closeBuyWindow();
  // } catch (error) {
  //   console.error("Buy order failed:", error);
  //   alert("Buy order failed. Please try again.");
  // }
  // };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <div>
            <button className="btn btn-blue" onClick={handleBuyClick}>
  Buy
</button>

            <button className="btn btn-grey" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;