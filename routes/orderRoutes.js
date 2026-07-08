const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const User = require('../models/User');
const { sendMail } = require('../utils/mailer');

router.post('/checkout', protect, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const order = await Order.create({
      user: req.user && req.user.id ? req.user.id : undefined,
      items,
      totalAmount,
    });

    res.status(201).json({ success: true, message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/admin/orders', protect, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/admin/orders/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (order && order.user) {
      const user = await User.findById(order.user);
      if (user && user.email) {
        await sendMail({
          to: user.email,
          subject: `Order Status Updated - ${status}`,
          html: `<h3>Hello ${user.name},</h3><p>Your order status has been updated to <strong>${status}</strong>.</p>`,
        });
      }
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
