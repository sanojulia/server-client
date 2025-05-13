const express = require("express");
const router = express.Router();
const Product = require("../models/Product.cjs");
const Cart = require("../models/Cart.cjs");
const verifyToken = require("../middleware/verifyToken.cjs");

// Get user's cart
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.json({ items: [], total: 0 });
    }
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add item to cart
router.post("/", verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [],
        total: 0
      });
    }

    const existingItem = cart.items.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId: productId,
        quantity: quantity,
        product: product
      });
    }

    cart.total = cart.items.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update item quantity in cart
router.put("/:productId", verifyToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const item = cart.items.find(item => item.productId === productId);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    item.quantity = quantity;
    cart.total = cart.items.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: error.message });
  }
});

// Remove item from cart
router.delete("/:productId", verifyToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.total = cart.items.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
