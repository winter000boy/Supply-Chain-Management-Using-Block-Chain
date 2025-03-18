import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "../artifacts/SupplyChain.json";

function Supply() {
  const navigate = useNavigate();

  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setLoader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState({});
  const [MedStage, setMedStage] = useState([]);
  const [ID, setID] = useState("");

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("Non-Ethereum browser detected. Try MetaMask!");
    }
  };

  const loadBlockchaindata = async () => {
    setLoader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setCurrentaccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];

    if (networkData) {
      const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
      setSupplyChain(supplychain);

      const medCtr = await supplychain.methods.medicineCtr().call();
      const med = {};
      const medStage = [];

      for (let i = 0; i < medCtr; i++) {
        med[i] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i] = await supplychain.methods.showStage(i + 1).call();
      }

      setMED(med);
      setMedStage(medStage);
      setLoader(false);
    } else {
      alert("The smart contract is not deployed on the current network.");
    }
  };

  if (loader) {
    return <h1 className="wait">Loading...</h1>;
  }

  const redirect_to_home = () => navigate("/");

  const handlerChangeID = (event) => setID(event.target.value);

  const handleSubmit = async (method) => {
    try {
      const receipt = await SupplyChain.methods[method](ID).send({ from: currentaccount });
      if (receipt) loadBlockchaindata();
    } catch (err) {
      alert("An error occurred!");
    }
  };

  return (
    <div>
      <span><b>Current Account Address:</b> {currentaccount}</span>
      <span onClick={redirect_to_home} className="btn btn-outline-danger btn-sm"> HOME </span>

      <h6><b>Supply Chain Flow:</b></h6>
      <p>Goods Order → Raw Material Supplier → Manufacturer → Distributor → Retailer → Consumer</p>

      <table className="table table-sm table-dark">
        <thead>
          <tr>
            <th scope="col">Goods ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Current Processing Stage</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(MED).map((key) => (
            <tr key={key}>
              <td>{MED[key].id}</td>
              <td>{MED[key].name}</td>
              <td>{MED[key].description}</td>
              <td>{MedStage[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {[
        { step: "Supply Raw Materials", method: "RMSsupply" },
        { step: "Manufacture", method: "Manufacturing" },
        { step: "Distribute", method: "Distribute" },
        { step: "Retail", method: "Retail" },
        { step: "Mark as Sold", method: "sold" },
      ].map(({ step, method }, index) => (
        <div key={index}>
          <h5><b>Step {index + 1}: {step}</b></h5>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(method); }}>
            <input className="form-control-sm" type="text" onChange={handlerChangeID} placeholder="Enter Goods ID" required />
            <button className="btn btn-outline-success btn-sm">{step.split(" ")[0]}</button>
          </form>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Supply;
