import mongoose from 'mongoose';

// Define the schema for a bid
const bidSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming customerId is a reference to another collection
    ref: 'Customer',
    required: true
  },
  loss: {
    type: Number,
    default: 0 // Default value for loss
  },
  committeeId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming committeeId is a reference to the committee collection
    ref: 'Committee',
    required: true
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
const BidModel = mongoose.model('Bid', bidSchema);
export default BidModel;
