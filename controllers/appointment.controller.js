// import doctor from "../models/doctor.model.js";
import {
  bookAppointment,
  getAppointments,
  getAppointmentsByDoctor,
  getPostAppointment,
  getTodayAppointments,
  pastAppointment,
} from "../services/appointment.service.js";
import { saveAppoinment } from "../services/appointment.service.js";
import { findDepartment } from "../services/department.sevice.js";
import { findDoctor } from "../services/doctor.service.js";

export async function appoinmentData(req, res, next) {
  try {
    const doctorID = req.body.doctorId;
    const doctorId = await findDoctor(doctorID);
    // const departmentId = await findDepartment(doctorId.departmentId)
    const userId = req.body.patient._id;
    if (!userId) {
      return "missing patient ID";
    }
    const appoinmentData = req.body;
    const result = await saveAppoinment({
      ...appoinmentData,
      userId: userId,
      doctor: doctorId,
      doctorId: doctorID,
      // departmentId:departmentId
    });
   return res.status(200).send({ result });
  } catch (error) {
    console.log(error);
    next({ error });
  }
}

export async function patients(req, res, next) {
  try {
    const getPatients = await getAppointments();
   return res.send({ getPatients });
  } catch (error) {
    // console.log(error);
    next({ error });
  }
}

//---------------------get appointment by doctor--------------//

// export async function getDoctorAppointments(req, res, next) {
//   try {
//     const doctorId = req.params.doctorId;

//     const appointmentData = await getAppointmentsByDoctor(doctorId);
//     res.status(200).send({ appointmentData });
//   } catch (error) {
//     console.log("error:",error);
//     res.status(500).json({message:error.message})
//     // next({ error });
//   }
// }



export async function appointmentsByDoctorByToken(req, res, next) {
  try {
    const doctorId = req.body.doctorId;

    console.log("doctorid: ", doctorId);
    const appointmentData = await getAppointmentsByDoctor(doctorId);
    res.send({ appointmentData });
    console.log("appontmntData: ",appointmentData);

  } catch (error) {
    console.log("errorrr: ",error);
    next({ error });
  }
}

export async function pastAppointmentData(req, res, next) {
  const today = new Date();
  try {
    const appointment = await pastAppointment(today);
    res.send({ appointment });
  } catch (error) {}
}

export async function todayAppointments(req, res, next) {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log("Today:", today, "Tomorrow:", tomorrow);
    const appointment = await getTodayAppointments(today, tomorrow);
    console.log("appnmnt: ", appointment);
    res.send({ appointment });
  } catch (error) {
    console.log("error: ", error);
    next({ error });
  }
}

export async function postAppointment(req, res, next) {
  try {
    const today = new Date();
    // const tomorrow = new Date(today)
    // tomorrow.setDate(tomorrow.getDate() + 1)
    const appointment = await getPostAppointment(today);
    res.send({ appointment });
  } catch (error) {
    next({ error });
  }
}
