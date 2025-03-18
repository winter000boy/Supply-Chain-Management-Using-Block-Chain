require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes"); // Ensure this file exists

const app = express();

// ✅ Middleware Setup
app.use(cors());
app.use(bodyParser.json());

// ✅ API Routes
app.use("/api", routes); // Ensures all routes are prefixed with `/api`

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
