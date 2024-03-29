// // import { Error } from "mongoose";
import moment from "moment";
import _ from "lodash";
import { toNumber } from "lodash";

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
  const appoinment = new appointmentModel(appoinmentData);
  await appoinment.save();

  return appoinment;
}

//--------------------------------get all appointments----------------

export async function getAppointments(page, limit, query) {
  const queryData = {}
  if(query?.search){
    queryData["$or"]=[
      {name : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 
      {place : { $regex: query?.search ? query?.search : '', $options: 'i' }}, 

    ]
  }
  const appointments = await appointmentModel
    .find(queryData)
    .populate("userId", ["username", "name"])
    .populate("doctorId", ["hospitalName", "departmentId"])
    .populate("doctor", ["name"])
    .limit(toNumber(limit))
    .skip((toNumber(page ? page : 1) - 1) * toNumber(limit));

    const total = await appointmentModel
    .find().countDocuments()

  return {appointments,total};
}

export async function getAll(doctorId) {
  const appoinmentData = await appointmentModel
    .find({ doctorId: doctorId })
    .populate("userId", ["name", "place", "mobileNo"])
    .populate("doctor", ["name", "mobileNo"])
    .populate("doctorId", ["department", "qualification"]);
  return appoinmentData;
}

export async function getAppointmentsByDoctor(doctorId) {
  const appointments = await appointmentModel.find({ doctorId: doctorId });
  console.log("appoinmts: ", appointments);
  return appointments;
}

//------------------past appoinment-----------------//

export async function pastAppointment(today) {
  const pastAppointment = await appointmentModel
    .find({ date: { $lt: today } })
    .populate("doctorId", ["hospitalName", "userId", "departmentId"]);
  console.log("past:", pastAppointment);
  return pastAppointment;
}

//----------today's Appointment------------

export async function getTodayAppointments(startOfDay, endOfDay) {
  const todayAppointments = await appointmentModel
    .find({
      date: { $gte: startOfDay, $lte: endOfDay },
    })
    .populate("doctorId", ["hospitalName", "departmentId", "userId"]);
  console.log("today ::", todayAppointments);

  return todayAppointments;
}

//---------------post Appntmnt-----

export async function getPostAppointment(today, tomorrow) {
  const postAppointment = await appointmentModel
    .find({ date: { $gt: today } })
    .populate("doctorId", ["hospitalName", "departmentId", "userId"]);
  console.log("post :", postAppointment);
  return postAppointment;
}

//-------------delete Appintmnt-------------//

export async function deleteAppointmentData(id) {
  const deleteAppointment = await appointmentModel.findByIdAndDelete(id);
  return deleteAppointment;
}

export async function deleteByToken(userId, appoinmentId) {
  const appointment = await appointmentModel.findOne({ userId: userId });
  if (!appointment) {
    return { message: "No appointment found" };
  }
  console.log("userId:", userId, "appointmntId :", appoinmentId);
  console.log("appntmntt:", appointment);
  const deleteData = await appointmentModel.findByIdAndDelete(appoinmentId);
  console.log("idd:", appoinmentId);
  console.log("dltData::", deleteData);

  return deleteData;
}

//---------singleView of an appointment------//

export async function singleAppointment(id) {
  const singleAppntmnt = await appointmentModel
    .findById(id)
    .populate("userId", ["username", "name"])
    .populate("doctorId", ["hospitalName", "departmentId"])
    .populate("doctor", ["name"]);
  if (!singleAppntmnt) return "no appointment found";
  console.log("singleAppntmnt", singleAppntmnt);
  return singleAppntmnt;
}

export async function appointmentByToken(id, userId) {
  const appointment = await appointmentModel.findOne({ userId });
  if (!appointment) return "no appointment found";
  const singleAppntmnt = await appointmentModel
    .findById(id)
    .populate("userId", ["username", "name"])
    .populate("doctorId", ["hospitalName", "departmentId"])
    .populate("doctor", ["name"]);
  if (!singleAppntmnt) return "no appointment found";
  console.log("singleAppntmnt", singleAppntmnt);
  return singleAppntmnt;
}

export async function updateAppointment(appoinmentData, appoinmentId) {
  const appointment = await appointmentModel.findByIdAndUpdate(
    appoinmentId,
    { appoinmentData },
    { new: true }
  );
  return appointment;
}

export async function updateByToken(userId, data, appoinmentId) {
  const appoinment = await appointmentModel.findOne({ userId: userId });
  console.log(appoinment);

  if (!appoinment) return "No appoinment is there";
  // const appoinmentId = appoinment._id

  const appoinmentData = await appointmentModel.findByIdAndUpdate(
    appoinmentId,
    data,
    { new: true }
  );

  return { appoinmentData };
}


