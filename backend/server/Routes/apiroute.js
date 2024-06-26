import express from 'express';
import { addCommittee,allCommittee,singleCommittee,updateCommittee,deleteCommittee } from '../apis/committee/committeeController.js';
import { addSlip, allSlip,deleteSlip,singleSlip, updateSlip } from '../apis/slip/slipController.js';
import { addBid, allBid } from '../apis/bid/bidController.js';
import {login,changePass,changeStatus } from '../apis/user/userController.js';
import { addCommitteeLog } from '../apis/committeeLog/committeeLogController.js';
import { registerCustomer,updateCustomer,allCustomer, singleCusomter, deleteCustomer } from '../apis/customer/customerController.js';
import multer from 'multer';
import { tokenChecker } from '../middleware/tokenChecker.js';
import { addAssignComm } from '../apis/assignCommittee/assignCommitteeController.js';


const router =express.Router();

//User Routes
// router.post("/admin/adduser",addUser);
// router.post("/admin/alluser",allUser);
// router.post("/admin/singleuser",singleUser);
// router.post("/admin/updateuser",updateUser);
// router.post("/admin/deleteeuser",deleteUser);




//customer API start here------------------------------------------------------------------
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'server/public/user/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})
const upload=multer({
    storage:storage
    ,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            // cb(new Error('Only .jpg and .png files are allowed'), false);
            req.body.imgExtError = "Only .jpg and .png files are allowed"
            cb(null, true);
        }
    }
})
router.post("/login",login);


//customer API
router.post("/customer/register",upload.single('user_image'),registerCustomer);

//customer API ENDS here------------------------------------------------------------------



//------------------------------------------------------start------------------------


// router.use(tokenChecker);


//------------------------------------------------------end------------------------



//admin routes
router.post("/admin/changePass",changePass);
router.post("/admin/changestatus",changeStatus);

//customer API
router.post("/customer/all",allCustomer);
router.post("/customer/single",singleCusomter);
router.post("/customer/delete",deleteCustomer);
router.post("/customer/update",upload.single('user_image'),updateCustomer);

//committee routes
router.post("/admin/addCommittee",addCommittee);
router.post("/admin/allCommittee",allCommittee);
router.post("/admin/singleCommittee",singleCommittee);
router.post("/admin/updateCommittee",updateCommittee);
router.post("/admin/deleteCommittee",deleteCommittee);

//committeeLog Routes
router.post("/admin/addCommitteeLog",addCommitteeLog);

//slip routes
router.post("/admin/addslip",addSlip);
router.post("/admin/allslip",allSlip);
router.post("/admin/singleslip",singleSlip);
router.post("/admin/updateslip",updateSlip);
router.post("/admin/deleteslip",deleteSlip);


//bidroutes
router.post("/admin/addbid",addBid);
router.post("/admin/allbid",allBid);


//Assing committee API
router.post("/admin/assigncomm",addAssignComm)


//place this route in the end of all of route
router.all("**", (req, res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid Address"
    })
})
export default router;
