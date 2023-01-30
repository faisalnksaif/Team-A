
import express ,{Router} from 'express'
// import { updateUserProfile } from '../controllers/authentication.controller.js';
import {  deleteUserProfile, userProfile } from "../controllers/user.controller.js";
import {  userMiddleware, verifyUser } from '../middlewares/auth.middleware.js';



const router = express.Router()



router.get("/profile/:id",verifyUser,userMiddleware,userProfile)
// router.delete("/delete/:id",deleteUserProfile)


export default router;
