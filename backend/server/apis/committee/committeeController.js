import CommitteeModel from './committeeModel.js';

//Add API
export const addCommittee = async (req, res) => {
    let validation = "";
    if (!req.body.committeeName) {
        validation = "committeeName is required \n";
    }
    if (!req.body.committeeType) {
        validation += "committeeType is required \n";
    }
    if (!req.body.startingMonth) {
        validation += "startingDate is required \n";
    }
    if (!req.body.totalMembers) {
        validation += "totalMembers is required \n";
    }
    if (!req.body.amount) {
        validation += "amount is required \n";
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
            committeeobj.totalMembers = req.body.totalMembers
            committeeobj.startingMonth = req.body.startingMonth
            committeeobj.amount = req.body.amount
            committeeobj.months = committeeobj.totalMembers
            committeeobj.endingMonth = ((committeeobj.startingMonth + committeeobj.months) % 12)-1  //0-Decemeber
            committeeobj.perPersonAmount = committeeobj.amount / committeeobj.totalMembers
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
                status: 500,
                message: "Error Occured " + error.message
            })
        }
    }
}

//All API
export const allCommittee = async (req, res) => {
    try {
        req.body.status = true
        const data = await CommitteeModel.find(req.body).exec();
        res.json({
            success: true,
            status: 200,
            total: data.length,
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

//Single API
export const singleCommittee = async (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation = "_id is required"
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error " + validation
        })
    }
    else {
        try {
            const data = await CommitteeModel.findOne({ _id: req.body._id });
            if (data == null) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Committee does not exist",
                })
            }
            else {
                res.json({
                    success: true,
                    status: 200,
                    message: "Single Committee",
                    data: data
                })
            }
        } catch (error) {
            res.json({
                success: false,
                status: 500,
                message: "Error Occured " + error.message
            })
        }
    }
}


//update API
export const updateCommittee = async (req, res) => {
    let validation = '';
    if (!req.body._id) {
        validation += "_id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    }
    else {
        try {
            const data = await CommitteeModel.findOne({ _id: req.body._id })
            if (data == null) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Committee Does't exist"
                })
            }
            else {
                if (!!req.body.committeeName) data.committeeName = req.body.committeeName
                if (!!req.body.committeeType) data.committeeType = req.body.committeeType;
                if (!!req.body.startingDate) data.startingDate = req.body.startingDate;
                if (!!req.body.endingDate) data.endingDate = req.body.endingDate;
                if (!!req.body.totalMembers) data.totalMembers = req.body.totalMembers;
                if (!!req.body.amount) data.amount = req.body.amount;
                if (!!req.body.months) data.months = req.body.months;

                const updateData = await data.save();
                res.json({
                    success: true,
                    status: 200,
                    message: "Committee Updated",
                    data: updateData
                })
            }
        } catch (error) {
            res.json({
                success: false,
                status: 500,
                message: "Error Occured " + error.message
            })
        }
    }
}


//delete API
export const deleteCommittee = async (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_id is required"
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    }
    else {

        try {
            const data = await CommitteeModel.findOne({ _id: req.body._id });
            if (data == null) {
                res.json({
                    success: false,
                    status: 404,
                    message: "Committee Does't exist"
                })
            }
            else {
                data.status = "false"
                const updateData = await data.save();
                res.json({
                    success: true,
                    status: 200,
                    message: "Committee deleted",
                    data: updateData
                })
            }
        } catch (error) {
            res.json({
                success: false,
                status: 500,
                message: "Error Occured " + error.message
            })
        }
    }
}