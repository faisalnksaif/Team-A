import { bookAppointment } from "../services/appointment.service.js";

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
