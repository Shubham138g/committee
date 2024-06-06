import bidModel from "./bidModel.js";

export const addBid=async(req,res)=>{
    let validation = "";
    if (!req.body.customerId) {
        validation = "customerId is required \n";
    }
    if (!req.body.committeeId) {
        validation += "committeeId is required \n";
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
            let bidobj = bidModel();
            bidobj.customerId = req.body.customerId
            bidobj.committeeId = req.body.committeeId
            bidobj.loss = req.body.loss
      
            let data = await bidobj.save()
            res.json({
                success: true,
                status: 200,
                message: "bid Added succesfully",
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

  
export const allBid=async(req,res)=>{
    let validation= ''
    if(!req.body.customerId){
        validation +="customerId is reqquired \n"
    }

    if(!!validation){
        res.send({
            success:false,
            status:400,
            message:"Validation Error: "+validation
        })
    }
    else{
        try {
            const allbids=await bidModel.findOne({customerId:req.body.customerId}).exec()
            if(allbids){
                res.send({
                    success:true,
                    status:200,
                    message:"All bids",
                    data:allbids
                })
            }
            else{
                res.send({
                    success:false,
                    status:404,
                    message:"bid not found"
                }) 
            }
          
        } catch (error) {
            res.send({
                success:false,
                status:500,
                message:"Validation Error"+validation
            })
        }
    }
}