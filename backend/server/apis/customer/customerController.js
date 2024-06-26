import userModel from '../user/userModel.js';
import CustomerModel from './customerModel.js';
import bcrypt from 'bcrypt';
import fs from 'fs';

export const registerCustomer = async (req, res) => {
    let validation = "";
    if (!req.body.name) {
        validation += "Name is required";
    }
    if (!req.body.email) {
        validation += "Email is required";
    }
    if (!req.body.password) {
        validation += "Password is required";
    }
    if (!req.body.contact) {
        validation += "Contact is required";
    }
    if (!req.body.address) {
        validation += "Address is required";
    }
    if (!req.file) {
        validation += "Image is required";
    }
    if(!!req.body.imgExtError){
        validation +=req.body.imgExtError
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    }
    else {
        const userEmail = await userModel.findOne({ email: req.body.email });
        if (!!userEmail) {
            res.send({
                success: false,
                status: 400,
                message: "Email Already Exist"
            })
        }
        else {
            try {
                const userTotal = await userModel.countDocuments();
                const userObj = await userModel();
                userObj.autoId = userTotal + 1;
                userObj.name = req.body.name;
                userObj.email = req.body.email;
                userObj.password = bcrypt.hashSync(req.body.password, 10)

                let savedUser = await userObj.save();
                try {
                    const customerTotal = await CustomerModel.countDocuments();
                    const custoemerObj = await CustomerModel();
                    custoemerObj.autoId = customerTotal + 1;
                    custoemerObj.name = req.body.name;
                    custoemerObj.contact = req.body.contact;
                    custoemerObj.email = req.body.email;
                    custoemerObj.address = req.body.address;
                    custoemerObj.userId = savedUser._id;
                    custoemerObj.image= "user/"+ req.file.filename;
                    const savedCustomer = await custoemerObj.save();
                    try {
                        savedUser.customerId = savedCustomer._id;
                        let savedCustomerData = await savedUser.save();
                        res.send({
                            success: true,
                            status: 200,
                            message: "New User Added",
                            data: savedCustomer
                        })
                    } catch (error) {
                        res.send({
                            success: false,
                            status: 500,
                            message: "Error Occuerd" + error.message
                        })
                    }

                } catch (error) {
                    res.send({
                        success: false,
                        status: 500,
                        message: "Error Occuerd" + error.message
                    })
                }
            } catch (error) {
                res.send({
                    success: false,
                    status: 500,
                    message: "Error Occuerd" + error.message
                })
            }
        }
    }
}

export const allCustomer=async(req,res)=>{
    try {
        req.body.status = true
        const data = await CustomerModel.find(req.body).exec();
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


export const singleCusomter=async(req,res)=>{
    let validation="";
    if(!req.body._id){
        validation +="_id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    }else{
        try {
            const data =await CustomerModel.findOne({_id:req.body._id});
            if(data==null){
                res.send({
                    success: false,
                    status: 404,
                    message: "User does not exits"
                }) 
            }
            else{
                res.json({
                    success: true,
                    status: 200,
                    message: "Single user",
                    data: data
                })
            }
        } catch (error) {
            res.send({
                success: false,
                status: 500,
                message: "Error occuerd : "+error.message
            }) 
        }
    }
}

export const updateCustomer = async (req, res) => {
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
    } else {
        try {
            const userData = await userModel.findOne({ customerId: req.body._id })
            if (userData == null) {
                res.send({
                    success: false,
                    status: 404,
                    message: "User Does't exist"
                })
            }
            else {
                const preUser = await userModel.findOne({ $and:[
                    {email: req.body.email},
                    {customerId : {$ne: req.body._id}}
                ] })
                if (!!preUser) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Email Already exixt"
                    })
                }
                else {
                    if (!!req.body.name) userData.name = req.body.name;
                    if (!!req.body.email) userData.email = req.body.email;

                    const updateUser = await userData.save();
                    try {
                        const customerData = await CustomerModel.findOne({ _id: req.body._id })
                        if (customerData == null) {
                            res.send({
                                success: false,
                                status: 404,
                                message: "User Does't exist"
                            })
                        }
                        else {
                            if (!!req.body.name) customerData.name = req.body.name;
                            if (!!req.body.contact) customerData.contact = req.body.contact;
                            if (!!req.body.email) customerData.email = req.body.email;
                            if (!!req.body.address) customerData.address = req.body.address;
                            if(!!req.file) {
                                fs.unlinkSync("server/public/"+customerData.image)
                                customerData.image = "user/"+ req.file.filename;
                            }
                            const updateCustomer = await customerData.save();
                            res.send({
                                success: true,
                                status: 200,
                                message: "User updated",
                                data: { updateUser, updateCustomer }
                            })
                        }
                    } catch (error) {
                        res.send({
                            success: false,
                            status: 500,
                            message: "Error occuerd" + error.message
                        })
                    }
                }

            }
        } catch (error) {
            res.send({
                success: false,
                status: 500,
                message: "Error occuerd" + error.message
            })
        }
    }
}

//delete user API
export const deleteCustomer = async (req, res) => {
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
            const data = await CustomerModel.findOne({ _id: req.body._id });
            if (data == null) {
                res.json({
                    success: false,
                    status: 404,
                    message: "User Does't exist"
                })
            }
            else {
                data.status = "false"
                const updateData = await data.save();
                res.json({
                    success: true,
                    status: 200,
                    message: "User deleted",
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