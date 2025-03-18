import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initContract } from "../blockchain/web3";
import "./AddItems.css"; // Ensure correct import

const AddItems = () => {
  const navigate = useNavigate(); // Replaced useHistory with useNavigate
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const contractInstance = await initContract();
      if (!contractInstance) throw new Error("Blockchain contract not initialized.");

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (!accounts.length) throw new Error("No accounts found. Please connect your wallet.");
      
      setAccount(accounts[0]);
      setContract(contractInstance);

      const itemCount = await contractInstance.methods.itemCounter().call();
      const fetchedItems = [];

      for (let i = 1; i <= itemCount; i++) {
        const item = await contractInstance.methods.itemStock(i).call();
        fetchedItems.push(item);
      }
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error loading blockchain data:", error);
      alert("Blockchain connection failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract) return alert("Blockchain contract not initialized.");

    try {
      setLoading(true);
      await contract.methods
        .addItem(formData.name, formData.description, formData.category)
        .send({ from: account });

      alert("Item added successfully!");
      setFormData({ name: "", description: "", category: "medicine" });
      loadBlockchainData();
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Error adding item!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Add Items (Medicine or Coffee)</h2>
      <p><strong>Account:</strong> {account || "Not connected"}</p>

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
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="medicine">Medicine</option>
          <option value="coffee">Coffee</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>

      <h3>Stored Items</h3>
      {loading ? (
        <p>Loading items...</p>
      ) : (
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
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No items available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddItems;
