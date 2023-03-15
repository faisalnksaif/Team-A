import express  from 'express'
import { makeValidateBody } from 'express-class-validator';
import { appoinmentData, appoinmentDataSave, appointments, appointmentsByDoctorByToken, deleteAppointment, deleteAppointmentByToken, getAllAppoinmentsDoctorByToken, getDoctorAppointments, getSingleAppntmnt, pastAppointmentData, patients, postAppointment, singleAppointmentByToken, todayAppointments, updateAppoinmentByToken, updateAppointmentById, userAppointment } from '../controllers/appointment.controller.js';
import { appointmentDto } from '../dto/appointment.dto.js';
import { appointmentMiddleware } from '../middlewares/appointment.middleware.js';
import { doctorMiddleware, userMiddleware } from '../middlewares/auth.middleware.js';


const router = express.Router()


router.post("/create", userMiddleware,appointmentMiddleware,appoinmentData)
router.get("/getAppointments",patients)
// router.get("/getDoctorAppointments",doctorMiddleware,getDoctorAppointments)
// router.get("/appointmentsByDoctor",doctorMiddleware,appointmentsByDoctorByToken)


router.get("/past",userMiddleware,pastAppointmentData)
router.get("/today",userMiddleware,todayAppointments)
router.get("/post",userMiddleware,postAppointment)
router.delete("/delete/:id",deleteAppointment)
router.delete("/deleteData/:id",userMiddleware,deleteAppointmentByToken)
router.get("/single/:id",getSingleAppntmnt)
router.get("/singleAppointment/:id",userMiddleware,singleAppointmentByToken)
router.patch("/update/:id",updateAppointmentById)
router.patch("/updateAppointment/:id",userMiddleware,updateAppoinmentByToken)
router.get('/all-doctor/:id',doctorMiddleware,getAllAppoinmentsDoctorByToken)




export default router;