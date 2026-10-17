// import React from "react";

// const Summary = () => {
//   return (
//     <>
//       <div className="username">
//         <h6>Hi, User!</h6>
//         <hr className="divider" />
//       </div>

//       <div className="section">
//         <span>
//           <p>Equity</p>
//         </span>

//         <div className="data">
//           <div className="first">
//             <h3>3.74k</h3>
//             <p>Margin available</p>
//           </div>
//           <hr />

//           <div className="second">
//             <p>
//               Margins used <span>0</span>{" "}
//             </p>
//             <p>
//               Opening balance <span>3.74k</span>{" "}
//             </p>
//           </div>
//         </div>
//         <hr className="divider" />
//       </div>

//       <div className="section">
//         <span>
//           <p>Holdings (13)</p>
//         </span>

//         <div className="data">
//           <div className="first">
//             <h3 className="profit">
//               1.55k <small>+5.20%</small>{" "}
//             </h3>
//             <p>P&L</p>
//           </div>
//           <hr />

//           <div className="second">
//             <p>
//               Current Value <span>31.43k</span>{" "}
//             </p>
//             <p>
//               Investment <span>29.88k</span>{" "}
//             </p>
//           </div>
//         </div>
//         <hr className="divider" />
//       </div>
//     </>
//   );
// };

// export default Summary;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const [funds, setFunds] = useState({ available: 0, used: 0 });
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/funds")
      .then((res) => setFunds(res.data))
      .catch((err) => console.error("Failed to fetch funds:", err));

    axios
      .get("http://localhost:3002/allHoldings")
      .then((res) => setHoldings(res.data))
      .catch((err) => console.error("Failed to fetch holdings:", err));
  }, []);

  const investment = holdings.reduce((sum, s) => sum + s.avg * s.qty, 0);
  const currentValue = holdings.reduce((sum, s) => sum + s.price * s.qty, 0);
  const pnl = currentValue - investment;
  const pnlPercent = investment ? (pnl / investment) * 100 : 0;

  const k = (n) =>
    Math.abs(n) >= 1000 ? (n / 1000).toFixed(2) + "k" : n.toFixed(2);

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{k(funds.available)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{k(funds.used)}</span>{" "}
            </p>
            <p>
              Opening balance <span>{k(funds.available)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              {k(pnl)} <small>{pnlPercent.toFixed(2)}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{k(currentValue)}</span>{" "}
            </p>
            <p>
              Investment <span>{k(investment)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;