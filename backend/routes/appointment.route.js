import express  from 'express'
import { userAppointment } from '../controllers/appointment.controller.js';


const router = express.Router()


router.post("/appointment", userAppointment)


export default router;