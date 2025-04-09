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
  }
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

module.exports = mongoose.model('Account', accountSchema);
