import CommitteeLogModel from './committeeLogModel.js';

export const addCommitteeLog=async(req,res)=> {
    let validation = "";
    if (!req.body.winnermonth) {
        validation = "winnermonth is required \n";
    }
    if (!req.body.winnerAmount) {
        validation += "winnerAmount is required \n";
    }
    if (!req.body.perPersonAmount) {
        validation += "perPersonAmount is required \n";
    }
    if (!req.body.loss) {
        validation += "loss is required \n";
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
            committeeLogobj.winnerAmount = req.body.winnerAmount
            committeeLogobj.winnermonth = req.body.winnermonth
            committeeLogobj.perPersonAmount = req.body.perPersonAmount
            committeeLogobj.loss = req.body.loss
            let data = await committeeLogobj.save();
            res.json({
                success: true,
                status: 200,
                message: "Committee Log Added succesfully",
                data: data
            })

        } catch (error) {
            res.json({
                success: false,
                status: 500,
                message: "Error Occured " + error.message
            })
        }
    }
}