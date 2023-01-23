import express ,{Router} from 'express'
import { deleteDoctorData, getDoctorList, profile,update } from '../controllers/doctor.controller.js'
// import { verifyToken } from '../middlewares/auth.middleware.js'


const router = express.Router()


router.get("/profile/:id",profile)
router.get("/list",getDoctorList)
router.delete("/delete/:id",deleteDoctorData)
router.put("/update/:id",update)

export default router;