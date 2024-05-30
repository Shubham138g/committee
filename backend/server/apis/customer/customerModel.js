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
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming userId is a reference to the User collection
    ref: 'User',
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to handle auto-increment of autoId
customerSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const highestAutoIdCustomer = await mongoose.model('Customer').findOne().sort('-autoId').exec();
      this.autoId = highestAutoIdCustomer ? highestAutoIdCustomer.autoId + 1 : 1;
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// Create the model from the schema and export it
const CustomerModel = mongoose.model('Customer', customerSchema);
export default CustomerModel;
