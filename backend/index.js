import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import Connection from './server/config/db.js';
import userModel from './server/apis/user/userModel.js';

const app=express();
dotenv.config();
const PORT=process.env.PORT;
Connection();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//routes
app.get("/",(req,res)=>{
    res.send("saving circle server is running")
})



app.listen(PORT, (error) => {
    if (error) {
        // If the server fails to start, log the error message
        console.log(`Server is not running: ${error}`);
    } else {
        // If the server starts successfully, log the running message
        console.log(`Server is running on port no. ${PORT}`);
    }
});