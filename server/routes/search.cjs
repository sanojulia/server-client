// routes/search.cjs
const express = require("express");
const router = express.Router();
const Product = require("../models/Product.cjs");

// Поиск по запросу
router.get("/search/:query", async (req, res) => {
  const { query } = req.params;

  try {
    const results = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
        { type: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Ошибка поиска' });
  }
});

module.exports = router;