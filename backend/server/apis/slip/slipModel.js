import mongoose from 'mongoose';

// Define the schema for a bid
const slipSchema = new mongoose.Schema({
  autoId: {
    type: Number,
    unique: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming customerId is a reference to another collection
    ref: 'customer',
    default:null
  },
  committeeId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming committeeId is a reference to the committee collection
    ref: 'committee',
    default:null
  },
  month: {
    type: Number,
    default: 0 // Default value for month
  },
  createdAt: {
    type: Date,
    default: Date.now // Default value for createdAt
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending' // Default value for status
  }
});

// Create the model from the schema and export it
const slipModel = mongoose.model('slip', slipSchema);
export default slipModel;
