import appointmentModel from "../models/appointment.model.js";


export async function bookAppointment(patientData){
    const appointmentData = new appointmentModel(patientData)
    await appointmentData.save()
    return appointmentData;
}