// src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    googleId: {
      type: String,
      sparse: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    purchased: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Project',
      default: [],
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);