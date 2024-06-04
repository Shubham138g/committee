import userModel from './userModel.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    let validation = '';
    if (!req.body.email) {
        validation += "Email is required"
    }
    if (!req.body.password) {
        validation += "Password is required"
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
            const userData = await userModel.findOne({ email: req.body.email })
            if (userData == null) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Email Doesn't exist"
                })
            }
            else {
                if (bcrypt.compareSync(req.body.password, userData.password)) {
                    if (userData.status) {
                        res.send({
                            success: true,
                            status: 200,
                            message: "Login Successful",
                            data: userData
                        })
                    }
                    else {
                        res.send({
                            success: false,
                            status: 403,
                            message: "Error: Invalid Credentials",
                            data: userData
                        })
                    }
                }
                else {
                    res.send({
                        success: false,
                        status: 403,
                        message: "Error: Invalid Credentials",
                    })
                }
            }


        } catch (error) {
            res.send({
                success: false,
                status: 500,
                message: "Errro Occuerd" + error.message
            })
        }
    }
}


export const changePass = async (req, res) => {
    let validation = '';
    if (!req.body.email) {
        validation += "Email is required"
    }
    if (!req.body.oldPassword) {
        validation += "password is required"
    }
    if (!req.body.newPassword) {
        validation += "password is required"
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
            const userData = await userModel.findOne({ email: req.body.email })
            if (userData == null) {
                res.send({
                    success: false,
                    status: 404,
                    message: "Email doesn't exist"
                })
            }
            else {
                if (bcrypt.compareSync(req.body.oldPassword, userData.password)) {
                    userData.password = bcrypt.hashSync(req.body.newPassword, 10);
                    const passwordChange = await userData.save();
                    res.send({
                        success: true,
                        status:200,
                        message:"Password Updated",
                        data:passwordChange
                    })
                }
                else{
                    res.send({
                        success: false,
                        status:403,
                        message:"Error: Invaild Credentials",
                    })
                }
            }
        } catch (error) {
            res.send({
                success: false,
                status: 500,
                message: "Error occuerd : " + error.message
            })
        }
    }
}