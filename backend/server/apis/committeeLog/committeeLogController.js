import CommitteeLogModel from './committeeLogModel.js';

const addCommitteeLog=async()=> {
    let validation = "";
    if (!req.body.month) {
        validation = "month is required \n";
    }
    if (!req.body.totalAmount) {
        validation += "totalAmount is required \n";
    }
    if (!req.body.perPersonAmount) {
        validation += "perPersonAmount is required \n";
    }
    if (!req.body.endingDate) {
        validation += "endingDate is required \n";
    }
    if (!req.body.loss) {
        validation += "loss is required \n";
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
            let total = await CommitteeLogModel.countDocuments();
            let committeeLogobj = CommitteeLogModel();
            committeeLogobj.autoId = total + 1
            committeeLogobj.committeeName = req.body.committeeName
            committeeLogobj.committeeType = req.body.committeeType
            committeeLogobj.startingDate = req.body.startingDate
            committeeLogobj.endingDate = req.body.endingDate
            committeeLogobj.totalMembers = req.body.totalMembers
            committeeLogobj.amount = req.body.amount
            committeeLogobj.months = req.body.months
            let data = await committeeLogobj.save();
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