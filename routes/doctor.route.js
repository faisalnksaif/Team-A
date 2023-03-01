import express ,{Router} from 'express'
import { approveDoctor, deleteDoctorData, doctorProfileById, doctorProfileByToken, getDoctorList, getDoctorSingleView, getDoctorSingleViewByToken, profile, update } from '../controllers/doctor.controller.js'
import { adminMiddleware, doctorMiddleware, verifyUser } from '../middlewares/auth.middleware.js'


const router = express.Router()


// router.get("/profile/:id",verifyUser,doctorMiddleware,profile)
router.get("/list",getDoctorList)
router.get("/singleview/:id",getDoctorSingleView)
router.get("/doctorsingleview",doctorMiddleware,getDoctorSingleViewByToken)
router.get("/doctorprofile",doctorMiddleware,doctorProfileByToken)
router.get("/doctorProfile/:id",doctorProfileById)

// router.delete("/delete/:id",verifyUser,adminMiddleware,deleteDoctorData)
router.post("/update/status/:doctorId", approveDoctor)
// router.put("/updatedoctor/:id",update)


export default router;