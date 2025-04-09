const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    enum: ['individual', 'family', 'organization', 'enterprise'],
    default: 'individual'
  },
  plan: {
    type: String,
    enum: ['free', 'pro', 'enerprise'],
    default: 'free'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Account', accountSchema);
