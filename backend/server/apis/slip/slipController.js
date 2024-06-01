import slipModel from "./slipModel.js";

export const addSlip=async(req,res)=>{
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

  
