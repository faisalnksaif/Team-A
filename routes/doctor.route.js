import express ,{Router} from 'express'
import { approveDoctor, deleteDoctorData, getDoctorList, profile } from '../controllers/doctor.controller.js'
import { adminMiddleware, doctorMiddleware, verifyUser } from '../middlewares/auth.middleware.js'


const router = express.Router()


router.get("/profile/:id",verifyUser,doctorMiddleware,profile)
router.get("/list",verifyUser,adminMiddleware,getDoctorList)
// router.delete("/delete/:id",verifyUser,adminMiddleware,deleteDoctorData)
router.post("/update/status/:doctorId", adminMiddleware, approveDoctor)

export default router;