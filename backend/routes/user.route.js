
import express ,{Router} from 'express'
import { updateUser, userProfile } from "../controllers/user.controller.js";
// import { verifyToken } from '../middlewares/auth.middleware.js';



const router = express.Router()



router.get("/profile/:id",userProfile)
router.put("/updateprofile/:id",updateUser)


export default router;
