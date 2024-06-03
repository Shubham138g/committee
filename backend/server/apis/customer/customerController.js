import userModel from '../user/userModel.js';
import CustomerModel from './customerModel.js';
import bcrypt from 'bcrypt';

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
                const userTotal =await userModel.countDocuments();
                const userObj = await userModel();
                userObj.autoId = userTotal + 1;
                userObj.name = req.body.name;
                userObj.email = req.body.email;
                userObj.password = bcrypt.hashSync(req.body.password, 10)

                let savedUser = await userObj.save();
                try {
                    const customerTotal =await CustomerModel.countDocuments();
                    const custoemerObj = await CustomerModel();
                    custoemerObj.autoId = customerTotal + 1;
                    custoemerObj.name = req.body.name;
                    custoemerObj.contact = req.body.contact;
                    custoemerObj.email = req.body.email;
                    custoemerObj.address = req.body.address;
                    custoemerObj.userId = savedUser._id;
                    const savedCustomer = await custoemerObj.save();
                    try {
                        savedUser.customerId = savedCustomer._id;
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