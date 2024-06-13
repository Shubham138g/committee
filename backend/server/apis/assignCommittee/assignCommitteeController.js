import AssignCommModal from "./assignCommitteeModel.js"
import mongoose from "mongoose";



// Add a new assignment
export const  addAssignComm=async(req,res)=>{
    const { committeeId, userIds } = req.body;

    // Validate input
    if (!committeeId || !Array.isArray(userIds) || userIds.length === 0) {
        return res.status(400).json({ message: 'Committee ID and an array of Customer IDs are required' });
    }

    try {
        const assignments = userIds.map(customerId => ({
            committeeId,
            customerId
        }));

        const savedAssignments = await AssignCommModal.insertMany(assignments);

        res.status(201).json({
            message: 'Assignments successfully created',
            data: savedAssignments
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating assignments',
            error: error.message
        });
    }
};

