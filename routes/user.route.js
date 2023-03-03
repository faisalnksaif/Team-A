
import express ,{Router} from 'express'
// import { updateUserProfile } from '../controllers/authentication.controller.js';
import {  deleteUserProfile, patientProfileById, updateProfile, updateProfileView, userProfile, userProfileView } from "../controllers/user.controller.js";
import {  userMiddleware, verifyUser } from '../middlewares/auth.middleware.js';
import { updateUserMiddlewar } from '../middlewares/update.middleware.js';



const router = express.Router()



router.get("/profile",verifyUser,userProfileView)
router.get("/profileview/:id",patientProfileById)

router.put("/updateprofile/:id",updateProfile)
// router.patch("/updateprofile",verifyUser,updateProfileView)

// router.delete("/delete/:id",deleteUserProfile)


export default router;
