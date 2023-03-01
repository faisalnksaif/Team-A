// // import { Error } from "mongoose";
import moment from "moment";
import appointmentModel from "../models/appointment.model.js";
// import userModel from "../models/user.model.js";
// import { getUserByUsername } from "./user.service.js";

// export async function bookAppointment(patientData, username) {
//   const appointmentDate = patientData.date;
//   if (!moment(appointmentDate, moment.ISO_8601).isValid()) {
//     return "Invalid date format. Date must be a ISOString";
//   }

//   const appointmentData = new appointmentModel(patientData);
//   // const appointmentUSer = await getUserByUsername(username)
//   // const appointment = await appointmentData.save();
//   await appointmentData.save();
//   return appointment;
// }

export async function saveAppoinment(appoinmentData) {
  // const appointmentDate = appoinmentData.date;
  // if (!moment(appointmentDate, moment.ISO_8601).isValid()) {
  //   return "Invalid date format. Date must be a ISOString";
  // }

  const appoinment = new appointmentModel(appoinmentData);
  await appoinment.save();

  return appoinment;
}

//--------------------------------get appointments----------------

export async function getAppointments() {
  const appointments = await appointmentModel
    .find({})
    .populate("userId", ["username", "name"])
    .populate("doctorId", ["hospitalName"]).populate("departmentId","departmentName")
    .populate("doctor", ["name"]);
  return appointments;
}

export async function getAppointmentsByDoctor(doctorId){
  const appointments = await appointmentModel.find({doctorId:doctorId});
  console.log("appoinmts: ",appointments);
  return appointments
}




//------------------past appoinment-----------------//

export async function pastAppointment(today) {
  // const today = new Date()
  const pastAppointment = await appointmentModel
    .find({ date: { $lt: today } })
    .populate("doctorId", ["hospitalName", "userId"]).populate("departmentId","departmentName");
  return pastAppointment;
}

//----------today's Appointment------------

export async function getTodayAppointments(today, tomorrow) {
  const todayAppointments = await appointmentModel
    .find({
      date: { $gte: today, $lt: tomorrow },
    })
    .populate("doctorId", ["hospitalName", "department", "userId"]);

  return todayAppointments;
}

//---------------post Appntmnt-----

export async function getPostAppointment(today) {
  const postAppointment = await appointmentModel
    .find({ date: { $gt: today } })
    .populate("doctorId", ["hospitalName", "department", "userId"]);
  return postAppointment;
}
