const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

module.exports = mongoose.model('Warehouse', warehouseSchema);