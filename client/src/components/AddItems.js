import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { initContract } from "../blockchain/web3";
import "AddItems.css"; // Centralized UI consistency

function AddItems() {
  const history = useHistory();
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "medicine",
  });

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    try {
      const contractInstance = await initContract();
      if (contractInstance) {
        const accounts = await window.web3.eth.getAccounts();
        setAccount(accounts[0]);
        setContract(contractInstance);

        const itemCount = await contractInstance.methods.itemCounter().call();
        let fetchedItems = [];
        for (let i = 1; i <= itemCount; i++) {
          const item = await contractInstance.methods.itemStock(i).call();
          fetchedItems.push(item);
        }
        setItems(fetchedItems);
      }
    } catch (error) {
      console.error("Error loading blockchain data:", error);
      alert("Blockchain connection failed!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract) return alert("Blockchain contract not initialized.");

    try {
      await contract.methods
        .addItem(formData.name, formData.description, formData.category)
        .send({ from: account });

      loadBlockchainData();
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Error adding item!");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Add Items (Medicine or Coffee)</h2>
      <p>
        <strong>Account:</strong> {account}
      </p>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Item Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="medicine">Medicine</option>
          <option value="coffee">Coffee</option>
        </select>
        <button type="submit">Add Item</button>
      </form>

      <h3>Stored Items</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddItems;