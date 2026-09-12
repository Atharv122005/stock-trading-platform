import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
const Dashboard = () => {
    return (
        <Routes>
            <Route path="/funds" element={<Funds />} />
            <Route path="/apps" element={<Apps />} />
        </Routes>
  );
};

export default Dashboard;