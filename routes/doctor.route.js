import express ,{Router} from 'express'
import { deleteProfile } from '../controllers/authentication.controller.js'
import { approveDoctor, deleteDoctorData, doctorProfileById, doctorProfileByToken, getDoctorList, getDoctorSingleView, getDoctorSingleViewByToken, profile, update, updateDoctorByToken } from '../controllers/doctor.controller.js'
import { adminMiddleware, doctorMiddleware, verifyUser } from '../middlewares/auth.middleware.js'


const router = express.Router()


// router.get("/profile/:id",verifyUser,doctorMiddleware,profile)
router.get("/list",getDoctorList)
router.get("/singleview/:id",getDoctorSingleView)
router.get("/doctorsingleview",doctorMiddleware,getDoctorSingleViewByToken)
router.get("/doctorprofile",doctorMiddleware,doctorProfileByToken)
router.get("/doctorProfile/:id",doctorProfileById)

router.delete("/delete/:id",verifyUser,deleteProfile)
router.post("/update/status/:doctorId", approveDoctor)
router.put("/updatedoctor",doctorMiddleware,updateDoctorByToken)


export default router;