import mongoose from "mongoose";

// Define the customer schema
const customerSchema = new mongoose.Schema({
  autoId: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  contact: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  image: {
    type:String,
    default:"user/noImg.jpg"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming userId is a reference to the User collection,
    default: null,
    ref: 'user'
  },
  status: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});



// Create the model from the schema and export it
const CustomerModel = mongoose.model('customer', customerSchema);
export default CustomerModel;
