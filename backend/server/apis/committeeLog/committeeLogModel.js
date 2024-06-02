import mongoose from 'mongoose';


const committeeLogSchema = new mongoose.Schema({
    committeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'committee',
        default: null
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        default:null
    },
    month:{
        type: String,
        default: null
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    perPersonAmount: {
        type: Number,
        default: 0
    },
    loss: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'completed','true','false'],
        default: 'completed' // Default value for status
    }
});

const CommitteeLogModel = mongoose.model('CommitteeLog', committeeLogSchema);

export default CommitteeLogModel;
