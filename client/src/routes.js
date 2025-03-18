const express = require("express");
const pool = require("./db");
const router = express.Router();

// ✅ Get All Items
router.get("/items", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM items"); // Ensure "items" is correct table name
    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Add a New Item (Medicine/Coffee)
router.post("/items", async (req, res) => {
  const { name, origin, batch_number, current_stage } = req.body;

  // ✅ Input Validation
  if (!name || !origin || !batch_number || !current_stage) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO items (name, origin, batch_number, current_stage) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, origin, batch_number, current_stage]
    );
    res.status(201).json(result.rows[0]); // 201: Created
  } catch (err) {
    console.error("Error inserting item:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
