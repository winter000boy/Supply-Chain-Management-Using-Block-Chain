import React, { useState } from "react";
import contract from "../blockchain/contract";

const Supply = () => {
  const [batchId, setBatchId] = useState("");
  const [location, setLocation] = useState("");

  const updateSupply = async () => {
    try {
      await contract.methods.updateSupply(batchId, location).send({ from: window.ethereum.selectedAddress });
      alert("Supply updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Update Supply Chain</h2>
      <input type="text" placeholder="Batch ID" onChange={(e) => setBatchId(e.target.value)} />
      <input type="text" placeholder="Current Location" onChange={(e) => setLocation(e.target.value)} />
      <button onClick={updateSupply}>Update Supply</button>
    </div>
  );
};

export default Supply;