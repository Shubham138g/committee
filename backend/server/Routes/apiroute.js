import express from 'express';
import { addCommittee,allCommittee,singleCommittee } from '../apis/committee/committeeController.js';

const router =express.Router();

router.post("/admin/addCommittee",addCommittee);
router.get("/admin/allCommittee",allCommittee);
router.get("/admin/singleCommittee",singleCommittee);


//place this route in the end of all of route
router.all("**", (req, res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid Address"
    })
})
export default router;
