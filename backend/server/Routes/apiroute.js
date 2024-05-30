import express from 'express';
import { addCommittee,allCommittee,singleCommittee } from '../apis/committee/committeeController.js';

const router =express.Router();

router.post("/admin/addCommittee",addCommittee);
router.get("/admin/allCommittee",allCommittee);
router.get("/admin/singleCommittee",singleCommittee);

export default router;
