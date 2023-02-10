import { bookAppointment, getAppointments } from "../services/appointment.service.js";

export async function userAppointment(req, res, next) {
  const patientData = req.body;

  try {
    const appointmentDetails = await bookAppointment(patientData);
    return res.send({ appointmentDetails });
  } catch (error) {
    console.log(error);
    next({error});
  }
}


export async function patients(req,res,next){
  const patientData = req.body
  try {
    const getPatients = await getAppointments(patientData)
    res.send({getPatients})
  } catch (error) {
    next({error})
  }

}