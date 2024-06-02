import userModel from "./userModel.js";
import bcrypt from 'bcrypt';


//Add API
export const addUser = async (req, res) => {

    let validation = "";
    if (!req.body.name) {
        validation += "Name is Required \n"
    }

    if (!req.body.email) {
        validation += "Email is Required \n"
    }

    if (!req.body.password) {
        validation += "Password is Required \n"
    }
    if (!req.body.customerId) {
        validation += "customerId is Required \n"
    }

    if (validation !== "") {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error " + validation
        })
    }
    else {
        let total = await userModel.countDocuments()
        let userObj = new userModel()
        userObj.autoId = total + 1
        userObj.name = req.body.name
        userObj.email = req.body.email
        userObj.password = bcrypt.hashSync(req.body.password, 10)
        userObj.customerId = req.body.customerId

        userObj.save()
            .then((data) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "New User Created",
                    data: data
                })
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: "Error Occured " + err.message
                })
            })
    }
}

//All API

export const allUser = async (req, res) => {
    try {
        req.body.status = true
        const data = await userModel.find(req.body).exec();
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

export const singleUser = async (req, res) => {

    let validation = '';
    if (!req.body._id) {
        validation += "_id is required \n"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation error: " + validation
        })
    }
    else {
        try {
            const data = await userModel.findOne({ _id: req.body._id })

            if (data == null) {
                res.send({
                    success: false,
                    status: 404,
                    message:"user done not exist"
                    
                })
            }
            else{
                res.send({
                    success:true,
                    status:200,
                    message:"single user",
                    data:data
                })
            }
        } catch (error) {
            res.send({
                success:false,
                status:500,
                message:"Error occured : "+error.message
            })
        }
    }
}

//update API
export const updateUser=async(req,res)=>{
    let validation = '';
    if (!req.body._id) {
        validation += "_id is required \n"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation error: " + validation
        })
    }
    else {
        try {
            const data = await userModel.findOne({ _id: req.body._id })
            if (data == null) {
                res.send({
                    success: false,
                    status: 404,
                    message: "User Does't exist"
                })
            }
            else {
                if (!!req.body.customerId) data.customerId = req.body.customerId
                if (!!req.body.name) data.name = req.body.name;
                if (!!req.body.email) data.email = req.body.email;
                if (!!req.body.password) data.password = req.body.password;

                const updateData = await data.save();
                res.json({
                    success: true,
                    status: 200,
                    message: "User Updated",
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
export const deleteUser = async (req, res) => {
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
            const data = await userModel.findOne({ _id: req.body._id });
            if (data == null) {
                res.json({
                    success: false,
                    status: 404,
                    message: "Usee Does't exist"
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