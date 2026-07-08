const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    items: [
      {
        carId: { type: String, required: true },
        name: { type: String, required: true },
        brand: { type: String, default: '' },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
        image: { type: String, default: '' },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Placed' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Order', orderSchema);
