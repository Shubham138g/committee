import userModel from '../apis/user/userModel.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
export const createAdminSeeder = async () => {
    try {
        const data = await userModel.findOne({ email: "admin@gmail.com" });
        if (!data) {
            const admin = new userModel()
            admin.autoId = 1
            admin.name = "Admin"
            admin.email = "admin@gmail.com"
            admin.password = bcrypt.hashSync(process.env.ADMIS_PASS, 10) //first parameter is a plain text which is extracted from the dotenv file and secons params is salt for creating hash password
            admin.userType = 1
            try {
                await admin.save();
                console.log("Admin Created");
            } catch (error) {
                console.log("error in creating admin"+error);
            }
        }
        else {
            console.log("Admin is already exists");
        }
    } catch (error) {
        console.log("Error in finding Admin"+error);
    }
}
