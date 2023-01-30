import express from 'express'
import { signUp, signIn, updateProfile, deleteProfile, getUserDetails, getDoctorDetails } from '../controllers/authentication.controller.js';
import { makeValidateBody} from 'express-class-validator'
import { LoginDto, RegistrationDto } from '../dto/authentication.dto.js';
// import { updationDto } from '../dto/update.dto.js';
import { updateUserMiddlewar } from '../middlewares/update.middleware.js';


const router = express.Router()

router.post("/sign-up",makeValidateBody(RegistrationDto),signUp);
router.post("/sign-in",makeValidateBody(LoginDto),signIn);
router.put("/update/:id",updateUserMiddlewar,updateProfile);
router.delete("/delete/:id",deleteProfile);
router.get("/userdetails",getUserDetails);
router.get("/doctordetails",getDoctorDetails);




export default router;