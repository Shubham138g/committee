import mongoose from 'mongoose';
import dotenv from "dotenv";

// dotenv.config();


const Connection =()=>{
    const URL=process.env.URL;
    try {
        mongoose.connect(URL)
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting to database");
    }
}

export default Connection;