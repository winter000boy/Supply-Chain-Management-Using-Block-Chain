import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Blockchain-Powered Supply Chain</h1>
      <p className="home-description">
        Track and manage supply chain items securely with blockchain technology.
      </p>

      <div className="home-buttons">
        <button onClick={() => navigate("/add-items")} className="btn">
          Add Items
        </button>
        <button onClick={() => navigate("/track")} className="btn">
          Track Items
        </button>
        <button onClick={() => navigate("/roles")} className="btn">
          Assign Roles
        </button>
      </div>
    </div>
  );
};

export default Home;
