import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { initContract } from "../blockchain/web3";
import "./Details.css";

const Details = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = async () => {
    try {
      setLoading(true);
      const contractInstance = await initContract();
      if (!contractInstance) throw new Error("Blockchain contract not initialized.");

      const itemData = await contractInstance.methods.itemStock(id).call();
      setItem(itemData);
    } catch (error) {
      console.error("Error fetching item details:", error);
      alert("Failed to load item details!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="details-container">
      {loading ? (
        <p>Loading item details...</p>
      ) : item ? (
        <div className="item-details">
          <h2>{item.name}</h2>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Batch Number:</strong> {item.batchNumber}</p>
        </div>
      ) : (
        <p>Item not found!</p>
      )}
    </div>
  );
};

export default Details;
