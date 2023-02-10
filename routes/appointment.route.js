import express  from 'express'
import { makeValidateBody } from 'express-class-validator';
import { patients, userAppointment } from '../controllers/appointment.controller.js';
import { appointmentDto } from '../dto/appointment.dto.js';


const router = express.Router()


router.post("/appointment", makeValidateBody(appointmentDto),userAppointment)
router.get("/appointments",patients)


export default router;