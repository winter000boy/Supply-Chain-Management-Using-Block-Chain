import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssignRoles from "./pages/AssignRoles";
import Home from "./pages/Home";
import AddItems from "./pages/AddItems"; // Updated name
import Supply from "./pages/Supply";
import Track from "./pages/Track";
import Navbar from "./components/Navbar";
import "./src/App.css";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function App() {
  return (
    <Router>
      <Navbar />
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roles" element={<AssignRoles />} />
          <Route path="/add-items" element={<AddItems />} /> {/* Fixed route */}
          <Route path="/supply" element={<Supply />} />
          <Route path="/track" element={<Track />} />
        </Routes>
      </motion.div>
    </Router>
  );
}

export default App;
