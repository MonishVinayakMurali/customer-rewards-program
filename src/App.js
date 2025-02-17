import React from "react";
import RewardsCalculator from "./components/RewardsCalculator";
import "./App.css";
import { CUSTOMER_REWARDS_PROGRAM } from "./utils/constants";

const App = () => {
  return (
    <div className="App-header">
      <h1>{CUSTOMER_REWARDS_PROGRAM}</h1>
      <RewardsCalculator />
    </div>
  )
}

export default App;