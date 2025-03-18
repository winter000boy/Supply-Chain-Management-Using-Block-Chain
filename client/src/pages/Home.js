import React from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const history = useHistory();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Blockchain-Powered Supply Chain</h1>
      <p className="home-description">
        Track and manage supply chain items securely with blockchain technology.
      </p>
      
      <div className="home-buttons">
        <button onClick={() => history.push("/add-items")} className="btn">
          Add Items
        </button>
        <button onClick={() => history.push("/track")} className="btn">
          Track Items
        </button>
        <button onClick={() => history.push("/roles")} className="btn">
          Assign Roles
        </button>
      </div>
    </div>
  );
};

export default Home;
