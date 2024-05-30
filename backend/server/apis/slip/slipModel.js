import mongoose from 'mongoose';

// Define the schema for a bid
const slipSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming customerId is a reference to another collection
    ref: 'Customer',
    required: true
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
  },
  committeeId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming committeeId is a reference to the committee collection
    ref: 'Committee',
    required: true
  }
});

// Create the model from the schema and export it
const slipModel = mongoose.model('slip', slipSchema);
export default slipModel;
