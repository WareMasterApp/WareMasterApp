const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse',
      required: true,
      index: true,
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
      index: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    indexes: [
      {
        unique: true,
        fields: ['productId', 'warehouseId'],
      },
    ],
  }
);

InventorySchema.methods = {
  safeIncrement(amount) {
    if (this.quantity + amount < 0) {
      throw new Error('Quantity cannot be negative');
    }
    this.quantity += amount;
    return this.save();
  },
};

module.exports = mongoose.model('Inventory', InventorySchema);
