import CommitteeModel from './committeeModel.js';


export const addCommittee = async (req, res) => {
    let validation = "";
    if (!req.body.committeeName) {
        validation = "committeeName is required \n";
    }
    if (!req.body.committeeType) {
        validation += "committeeType is required \n";
    }
    if (!req.body.startingDate) {
        validation += "startingDate is required \n";
    }
    if (!req.body.endingDate) {
        validation += "endingDate is required \n";
    }
    if (!req.body.totalMembers) {
        validation += "totalMembers is required \n";
    }
    if (!req.body.amount) {
        validation += "amount is required \n";
    }
    if (!req.body.months) {
        validation += "months is required \n";
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    } else {
        try {
            let total = await CommitteeModel.countDocuments();
            let committeeobj = CommitteeModel();
            committeeobj.autoId = total + 1
            committeeobj.committeeName = req.body.committeeName
            committeeobj.committeeType = req.body.committeeType
            committeeobj.startingDate = req.body.startingDate
            committeeobj.endingDate = req.body.endingDate
            committeeobj.totalMembers = req.body.totalMembers
            committeeobj.amount = req.body.amount
            committeeobj.months = req.body.months
            let data = await committeeobj.save();
            res.json({
                success: true,
                status: 200,
                message: "Committee Added succesfully",
                data: data
            })

        } catch (error) {
            res.json({
                success: false,
                status: 400,
                message: "Error Occured " + error.message
            })
        }
    }
}

export const allCommittee = async (req, res) => {
    try {
        const data = await CommitteeModel.find({}).exec();
        res.json({
            success: true,
            status: 200,
            total:data.length,
            data: data
        })
    } catch (error) {
        res.json({
            success: false,
            status: 400,
            message: "Error Occured " + error.message
        })
    }
}
export const singleCommittee = async (req, res) => {
    try {
        const data = await CommitteeModel.findOne({_id:req.body._id});
        res.json({
            success: true,
            status: 200,
            message: "Single Committee",
            data: data
        })
    } catch (error) {
        res.json({
            success: false,
            status: 400,
            message: "Error Occured " + error.message
        })
    }
}
