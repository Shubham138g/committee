import mongoose from 'mongoose';

const assignCommSchema = new mongoose.Schema({
    committeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'committee',
        default: null
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: Boolean,
        default:true
    }
});

const AssignCommModal = mongoose.model('assignComm', assignCommSchema);

export default AssignCommModal;
