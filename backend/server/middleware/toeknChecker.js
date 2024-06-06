import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const tokenChecker = async (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        res.send({
            success: false,
            status: 404,
            message: "no token found"
        })
    }
    else {
        jwt.verify(token, process.env.SECRET,(err,data)=>{
            if(!!err){
                res.send({
                    success:false,
                    status:403,
                    message:"unauthorized access"
                })
            }
            else{
                req.decoded=data
                next()
            }

        })
    }

}