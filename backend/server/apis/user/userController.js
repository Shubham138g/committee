import userModel from './userModel.js';


export const login = (req, res) => {
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
    else{
        try {
            userModel.findOne({email:req.body.email})
            res.send({
                success:false,
                status:404,
                message:""
                
            })
        } catch (error) {
            
        }
    }
}