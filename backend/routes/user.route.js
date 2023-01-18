
import express ,{Router} from 'express'
import { userProfile } from "../controllers/user.controller.js";



const router = express.Router()



router.get("/profile/:id",userProfile)

export default router;
