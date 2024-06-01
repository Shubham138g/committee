import userModel from "./userModel.js";

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
            status: 500,
            message: "Validation Error " + validation
        })
    } 
    else {
        let total = await userModel.countDocuments()
        let userObj = new userModel()
        userObj.autoId = total + 1
        userObj.name = req.body.name
        userObj.email = req.body.email
        userObj.password = req.body.password
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