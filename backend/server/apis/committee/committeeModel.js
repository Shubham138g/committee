import mongoose from 'mongoose';

// Define the schema for a committee
const committeeSchema = new mongoose.Schema({
  autoId: {
    type: Number,
    unique: true,
    default:0
  },
  committeeName: {
    type: String,
    default: '' // Default empty string
  },
  committeeType: {
    type: String,  // bid, slip
    default: ''
  },
  startingDate: {
    type: Date,
    default:null
  },
  endingDate: {
    type: Date,
    default:null
  },
  totalMembers: {
    type: Number,
    default: 0 // Default value for totalMembers
  },
  amount: {
    type: Number,
    default: 0 // Default value for amount
  },
  months: {
    type: Number,
    default: 0 // Default value for months
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'completed','true','false'],
    default: 'true' // Default value for status
  }
});



// Create the model from the schema and export it
const CommitteeModel = mongoose.model('Committee', committeeSchema);
export default CommitteeModel;
