import express from 'express'
import { signUp, signIn, updateProfile, deleteProfile, getUserDetails, getDoctorDetails, doctorProfile, updateProfileByToken } from '../controllers/authentication.controller.js';
import { makeValidateBody} from 'express-class-validator'
import { LoginDto, RegistrationDto } from '../dto/authentication.dto.js';
// import { updationDto } from '../dto/update.dto.js';
import { updateUserMiddlewar } from '../middlewares/update.middleware.js';


const router = express.Router()
const path = "/auth"

router.post(`${path}/sign-up`,makeValidateBody(RegistrationDto),signUp);
router.post(`${path}/sign-in`,makeValidateBody(LoginDto),signIn);
// router.put(`${path}/update/:id`,updateUserMiddlewar,updateProfile);
router.delete(`${path}/delete/:id`,deleteProfile);
router.get(`${path}/userdetails`,getUserDetails);
router.get(`${path}/doctorProfile/:id`,doctorProfile);
router.put(`${path}/updateProfile`,updateProfileByToken);


router.get(`${path}/doctordetails`,getDoctorDetails);




export default router;