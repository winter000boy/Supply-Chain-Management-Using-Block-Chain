import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css"; // Add global styles
import { motion } from "framer-motion";

const RootComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // Simulated loading time
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading Supply Chain Dashboard...</p>
        </div>
      ) : (
        <App />
      )}
    </motion.div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
