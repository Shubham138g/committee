import express from 'express';
import { addCommittee,allCommittee,singleCommittee,updateCommittee,deleteCommittee } from '../apis/committee/committeeController.js';
import { addSlip } from '../apis/slip/slipController.js';
import { addBid } from '../apis/bid/bidController.js';

const router =express.Router();

//committee routes
router.post("/admin/addCommittee",addCommittee);
router.post("/admin/allCommittee",allCommittee);
router.post("/admin/singleCommittee",singleCommittee);
router.post("/admin/updateCommittee",updateCommittee);
router.post("/admin/deleteCommittee",deleteCommittee);

//slip routes
router.post("/admin/addslip",addSlip);


//bidroutes
router.post("/admin/addbid",addBid);


//place this route in the end of all of route
router.all("**", (req, res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid Address"
    })
})
export default router;
