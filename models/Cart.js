const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
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
  },
  { timestamps: true },
);

module.exports = mongoose.model('Cart', cartSchema);
