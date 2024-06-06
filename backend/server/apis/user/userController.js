import CustomerModel from '../customer/customerModel.js';
import userModel from './userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

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
                        const payload={
                            _id:userData._id,
                            email:userData.email,
                            name:userData.name,
                            userType:userData.userType
                        }
                        const token=jwt.sign(payload,process.env.SECRET)
                        res.send({
                            success: true,
                            status: 200,
                            message: "Login Successful",
                            data: userData,
                            token:token
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
                        status: 200,
                        message: "Password Updated",
                        data: passwordChange
                    })
                }
                else {
                    res.send({
                        success: false,
                        status: 403,
                        message: "Error: Invaild Credentials",
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

export const changeStatus = async (req, res) => {
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
        const userData = await userModel.findOne({ customerId: req.body._id })
        if (userData == null) {
            res.send({
                success: false,
                status: 404,
                message: "User doesn't exist"
            })
        }
        else {
            try {
                userData.status = !userData.status
                const changeStatus = await userData.save();
                try {
                    const customerData = await CustomerModel.findOne({ _id: req.body._id })
                    if (customerData == null) {
                        res.send({
                            success: false,
                            status: 404,
                            message: "User doesn't exist"
                        })
                    }
                    else {
                        customerData.status = !customerData.status
                        const changeStatus = await customerData.save();

                        res.send({
                            success: true,
                            status: 200,
                            message: "Status Changed",
                            data: changeStatus
                        })
                    }

                } catch (error) {
                    res.send({
                        success: false,
                        status: 500,
                        message: "Error occured",
                    })
                }
            } catch (error) {
                res.send({
                    success: false,
                    status: 500,
                    message: "Error occured",
                })
            }
        }
    }
}