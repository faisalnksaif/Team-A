import express ,{Router} from 'express'
import { userDetails, userLogin } from '../controllers/user.controller.js';
import { makeValidateBody} from 'express-class-validator'
import { User } from '../dto/user.dto.js';



const router = express.Router()


router.post("/sign-up", userDetails);
router.post("/sign-in", userLogin);


export default router;