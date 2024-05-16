import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app=express();
dotenv.config();
const PORT=process.env.PORT;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//routes
app.get("/",(req,res)=>{
    res.send("saving circle server is running")
})

app.listen(PORT,(error)=>{
    try {
        console.log(`server is running on port no.${PORT}`);
    } catch (error) {
        console.log(`Server is not running ${error}`);
    }
})