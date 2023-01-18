import express from 'express'
import { signUp, signIn } from '../controllers/authentication.controller.js';
import { makeValidateBody} from 'express-class-validator'
import { LoginDto, RegistrationDto } from '../dto/authentication.dto.js';


const router = express.Router()

router.post("/sign-up",makeValidateBody(RegistrationDto),signUp);
router.post("/sign-in",makeValidateBody(LoginDto),signIn);


export default router;