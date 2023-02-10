import express ,{Router} from 'express'
import { approveDoctor, deleteDoctorData, getDoctorList, profile, update } from '../controllers/doctor.controller.js'
import { adminMiddleware, doctorMiddleware, verifyUser } from '../middlewares/auth.middleware.js'


const router = express.Router()


// router.get("/profile/:id",verifyUser,doctorMiddleware,profile)
router.get("/list",verifyUser,adminMiddleware,getDoctorList)
// router.delete("/delete/:id",verifyUser,adminMiddleware,deleteDoctorData)
router.post("/update/status/:doctorId", adminMiddleware, approveDoctor)
// router.put("/updatedoctor/:id",update)


export default router;