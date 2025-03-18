import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SupplyChainABI from "../artifacts/SupplyChain.json";
import { useNavigate } from "react-router-dom";

function Track() {
  const navigate = useNavigate();
  const [currentAccount, setCurrentAccount] = useState(null);
  const [SC, setSC] = useState(null);
  const [ID, setID] = useState(""); // Ensure ID is set via an input
  const [MED, setMED] = useState({});
  const [RMS, setRMS] = useState({});
  const [isSold, setIsSold] = useState(false);
  const [isRetail, setIsRetail] = useState(false);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      setCurrentAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const networkData = SupplyChainABI.networks[networkId];
      if (networkData) {
        const contract = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
        setSC(contract);
      } else {
        alert("Smart contract not deployed on this network");
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  const trackItem = async () => {
    if (!SC) {
      alert("Smart contract not loaded");
      return;
    }
    try {
      const medData = await SC.methods.MedicineStock(ID).call();
      setMED(medData);
      const rmsData = await SC.methods.RAWMaterialStock(ID).call();
      setRMS(rmsData);
      setIsSold(medData.sold);
      setIsRetail(medData.retail);
    } catch (error) {
      console.error("Error tracking item:", error);
    }
  };

  return (
    <div>
      <h2>Track Item</h2>
      <input
        type="text"
        placeholder="Enter ID"
        value={ID}
        onChange={(e) => setID(e.target.value)}
      />
      <button onClick={trackItem}>Track</button>
      {MED.id && (
        <div>
          <p>Name: {MED.name}</p>
          <p>Sold: {isSold ? "Yes" : "No"}</p>
          <p>Retail: {isRetail ? "Yes" : "No"}</p>
        </div>
      )}
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
}

export default Track;