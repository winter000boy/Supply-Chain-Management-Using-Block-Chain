import React, { useState, useEffect } from "react";
import contract from "../blockchain/contract";

const Track = () => {
  const [batchId, setBatchId] = useState("");
  const [history, setHistory] = useState([]);

  const trackItem = async () => {
    try {
      const response = await contract.methods.getBatchHistory(batchId).call();
      setHistory(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Track Item</h2>
      <input type="text" placeholder="Batch ID" onChange={(e) => setBatchId(e.target.value)} />
      <button onClick={trackItem}>Track</button>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default Track;
