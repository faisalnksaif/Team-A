import moment from "moment";
// import { Error } from "mongoose";
import appointmentModel from "../models/appointment.model.js";


export async function bookAppointment(patientData,username){
    const appointmentDate = patientData.date;
    if (!moment(appointmentDate, moment.ISO_8601).isValid()) {
      return ("Invalid date format. Date must be a ISOString");
    }
  
    const appointmentData = new appointmentModel(patientData)
    await appointmentData.save()
    return appointmentData;
}

export async function getAppointments(patientData){
    const appointments = await appointmentModel.find({}).populate('username')
    return appointments

}