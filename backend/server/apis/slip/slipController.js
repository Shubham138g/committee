import slipModel from "./slipModel.js";


//add API
export const addSlip = async (req, res) => {
    let validation = "";
    if (!req.body.customerId) {
        validation = "customerId is required \n";
    }
    if (!req.body.committeeId) {
        validation += "committeeId is required \n";
    }
    if (!req.body.month) {
        validation += "month is required \n";
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    } else {
        try {
            let slipobj = slipModel();
            let total = await slipModel.countDocuments();
            slipobj.autoId = total + 1
            slipobj.customerId = req.body.customerId
            slipobj.committeeId = req.body.committeeId
            slipobj.month = req.body.month

            let data = await slipobj.save()
            res.json({
                success: true,
                status: 200,
                message: "Slip Added succesfully",
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

//All API
export const allSlip = async (req, res) => {


    try {
        req.body.status = true
        const allSlip = await slipModel.find(req.body).exec()

            res.send({
                success: true,
                status: 200,
                message: "All slip",
                total:allSlip.length,
                data: allSlip
            })
    } catch (error) {
            res.send({
                success: false,
                status: 500,
                message: "Error occuered" + error.message
            })
    }
}


//Single API
export const singleSlip=async(req,res)=>{

    let validation = "";
  
    if (!req.body._id) {
        validation += "_id is required \n";
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    } 
    else{
        try {
            let data=await slipModel.findOne({_id:req.body._id}) 
            if(data==null){
                res.send({
                    success:false,
                    status:404,
                    message:"Slip doesn't exist"
                })
            }
            else{
                res.send({
                    success:true,
                    status:200,
                    message:"Single Slip",
                    data:data
                })
            }
        } catch (error) {
            res.send({
                success: false,
                status: 500,
                message: "Error Occuerd "
            })
        }
    }
}


//update API
export const updateSlip = async (req, res) => {
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
            const data = await slipModel.findOne({ _id: req.body._id })
            if (data == null) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Slip Does't exist"
                })
            }
            else {
                if (!!req.body.committeeId) data.committeeId = req.body.committeeId
                if (!!req.body.customerId) data.customerId = req.body.customerId;
                if (!!req.body.month) data.month = req.body.month;
               

                const updateData = await data.save();
                res.json({
                    success: true,
                    status: 200,
                    message: "Slip Updated",
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


//delete APi
export const deleteSlip = async (req, res) => {
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
            const data = await slipModel.findOne({ _id: req.body._id });
            if (data == null) {
                res.json({
                    success: false,
                    status: 404,
                    message: "Slip Does't exist"
                })
            }
            else {
                data.status = "false"
                const updateData = await data.save();
                res.json({
                    success: true,
                    status: 200,
                    message: "Slip deleted",
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