import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { initContract } from "../blockchain/web3";
import "./Details.css";

const Details = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid item ID");
      return;
    }
    fetchItemDetails();
  }, [id]);

  const fetchItemDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const contractInstance = await initContract();
      if (!contractInstance) {
        setError("Could not connect to the blockchain.");
        setLoading(false);
        return;
      }

      const itemData = await contractInstance.methods.itemStock(id).call();
      setItem(itemData);
    } catch (error) {
      console.error("Error fetching item details:", error);
      setError("Failed to load item details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="details-container">
      {loading ? (
        <p>Loading item details...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : item ? (
        <div className="item-details">
          <h2>{item.name}</h2>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Batch Number:</strong> {item.batchNumber}</p>
        </div>
      ) : (
        <p>Item not found! <button onClick={() => window.history.back()}>Go Back</button></p>
      )}
    </div>
  );
};

export default Details;
