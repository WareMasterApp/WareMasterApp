const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const AccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email aready registered'],
      sparse: true,
    },
    size: {
      type: String,
      enum: ['individual', 'family', 'organization', 'enterprise'],
      default: 'individual',
    },
    plan: {
      type: String,
      enum: ['free', 'pro', 'enterprise'],
      default: 'free',
    },
    provider: {
      type: String,
      enum: ['local', 'github', 'google'],
      default: 'local',
    },
    providerId: {
      type: String,
      unique: [true, 'User already registered'],
      sparse: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

AccountSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('Account', AccountSchema);
