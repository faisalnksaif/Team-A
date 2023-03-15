// import doctor from "../models/doctor.model.js";
import mongoose from "mongoose";
import {
  appointmentByToken,
  bookAppointment,
  deleteAppointmentData,
  deleteByToken,
  getAll,
  getAppointments,
  getAppointmentsByDoctor,
  getPostAppointment,
  getTodayAppointments,
  pastAppointment,
  singleAppointment,
  updateAppointment,
  updateByToken,
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
    const query = req.query
      const page = req.query.page
      const limit = (req.query.limit || '10') 
    const getPatients = await getAppointments(page, limit, query);
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



export async function getAllAppoinmentsDoctorByToken(req,res,next){

  try{
    console.log("body",req.body);
    const doctorId = req.params.doctor._id

      console.log(doctorId)
      const appoinmentData = await getAppointmentsByDoctor(doctorId)
      res.status(200).send(appoinmentData)

  }catch(err){
    console.log(err);
      next(err)
  }
}

// export async function appointmentsByDoctorByToken(req, res, next) {
//   try {
//     const doctorId = req.body.doctorId;

//     console.log("doctorid: ", doctorId);
//     const appointmentData = await getAppointmentsByDoctor(doctorId);
//     res.send({ appointmentData });
//     console.log("appontmntData: ", appointmentData);
//   } catch (error) {
//     console.log("errorrr: ", error);
//     next({ error });
//   }
// }

export async function pastAppointmentData(req, res, next) {
  const today = new Date();
  try {
    const appointment = await pastAppointment(today);
    console.log("past appointments:", appointment);
    res.send({ appointment });
  } catch (error) {
    console.log("Error:", error);
    next({ error });
  }
}

export async function todayAppointments(req, res, next) {
  try {
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const appointment = await getTodayAppointments(startOfDay, endOfDay);
    console.log("today appnmnt: ", appointment);
    res.send({ appointment });
  } catch (error) {
    console.log("error: ", error);
    next({ error });
  }
}

export async function postAppointment(req, res, next) {
  try {
    const today = new Date();
    const appointment = await getPostAppointment(today);
    console.log("post appointment::", appointment);
    res.send({ appointment });
  } catch (error) {
    next({ error });
  }
}

//------------------delete appointment-----------//

export async function deleteAppointment(req, res, next) {
  try {
    const id = req.params.id;
    const deleteData = await deleteAppointmentData(id);
    res.send({ deleteData });
  } catch (error) {
    console.log("error", error);
    next({ error });
  }
}

export async function deleteAppointmentByToken(req, res, next) {
  try {
    const userId = req.body.patient._id;
    const appointmentId = req.params.id;
    console.log("appointmentId",appointmentId);
    const deleteAppntmnt = await deleteByToken(userId, appointmentId);
    res.send({ deleteAppntmnt });
  } catch (error) {
    console.log("error", error);
    next({ error });
  }
}


export async function getSingleAppntmnt(req,res,next){
  const id = mongoose.Types.ObjectId(req.params.id.trim());
  try{
    const singleView = await singleAppointment(id)
    console.log("singleView:",singleView);
    res.status(200).send({singleView})
  }catch(error){
    console.log("error:",error);
    next({error})
  }
  
}


export async function singleAppointmentByToken(req,res,next){
  const userId = req.body.patient._id
  const id = req.params.id
  try{
    const singleView = await appointmentByToken(id,userId)
    console.log("singleView:",singleView);
    res.status(200).send({singleView})
  }catch(error){
    console.log("error:",error);
    next({error})
  }
}

export async function updateAppointmentById(req,res,next){
  try {
    const appointmentData = req.body
    const appoinmentId = mongoose.Types.ObjectId(req.params.id.trim());
    const updateData = await updateAppointment(appointmentData,appoinmentId)
    res.status(200).send({updateData})
  } catch (error) {
    console.log("error:",error);
    next({error})
  }
}

export async function updateAppoinmentByToken(req,res,next){
  try{

      const userId = req.body.patient._id
      const appoinmentId = req.params.id
      const appoinmentData = req.body
      const appoinments = await updateByToken(userId,appoinmentData,appoinmentId);
      res.status(200).send(appoinments)

  }catch(err){
      next(err)
  }
}