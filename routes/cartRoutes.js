const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const Cart = require('../models/Cart');

router.get('/cart', protect, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Please login first' });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    res.status(200).json({ success: true, cart: cart || { items: [] } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/cart', protect, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Please login first' });
    }

    const { items } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { user: req.user.id, items },
      { new: true, upsert: true },
    );

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
