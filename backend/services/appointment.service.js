import appointmentModel from "../models/appointment.model.js";


export async function bookAppointment(patientData){
    const appointmentData = new appointmentModel(patientData)
    await appointmentData.save()
    return appointmentData;
}

export async function getAppointments(patientData){
    const appointments = await appointmentModel.find()
    return appointments

}