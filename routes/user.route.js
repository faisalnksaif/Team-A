import express ,{Router} from 'express'
import { userDetails } from '../controllers/user.controller.js';



const router = express.Router()


router.post("/sign-up",userDetails);

export default router;