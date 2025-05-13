const express = require("express");
const router = express.Router();
const Product = require("../models/Product.cjs");

// Get all products
router.get("/", async (req, res) => {
  try {
    let query = {};

    if (req.baseUrl.includes("/women")) {
      query.category = "women";
    } else if (req.baseUrl.includes("/men")) {
      query.category = "men";
    } else if (req.baseUrl.includes("/sale")) {
      query.isSale = true;
    } else if (req.baseUrl.includes("/new-in")) {
      query.isNew = true;
    }
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/search", async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === '') {
    return res.status(400).json({ message: 'Please enter search text' });
  }

  try {
    const results = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } },
        { type: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    });

    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Search failed' });
  }
});
// Get product by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// Create a new product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Search products
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim() === "") {
      return res.json([]);
    }

    // Search products by name, category, brand, or type
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
        { type: { $regex: query, $options: 'i' } }
      ]
    });
    
    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: error.message });
  }
});

// Bulk create/update products
router.post("/bulk", async (req, res) => {
  try {
    // Delete existing products
    await Product.deleteMany({});
    console.log('Deleted existing products');

    // Create new products
    const products = await Product.insertMany(req.body);
    console.log(`Successfully created ${products.length} products`);
    
    res.status(201).json({
      message: 'Products created successfully',
      products: products
    });
  } catch (error) {
    console.error('Error creating products:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return res.status(400).json({ 
        error: 'Duplicate key error',
        details: error.message 
      });
    }

    res.status(500).json({ 
      error: 'Failed to create products',
      details: error.message 
    });
  }
});

module.exports = router;
