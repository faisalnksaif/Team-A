import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import {
  approveDoctorStatus,
  deleteDoctorDetails,
  doctorProfile,
  doctorProfileView,
  doctorProfileViewById,
  doctorProfileViewByToken,
  doctorSingleView,
  doctorSingleViewByToken,
  findDoctor,
  getAll,
  getDoctors,
  updateDoctor,
} from "../services/doctor.service.js";
import { findUserById, updateUser, updateUserDetails } from "../services/user.service.js";

// export async function profile(req, res, next) {
//   try {
//     const profileView = await doctorProfile(req.params.id);
//     return res.send(profileView);
//   } catch (error) {
//     next(error);
//   }
// }

export async function getDoctorList(req, res) {
  const doctors = await getDoctors();
  res.send({ doctors });
}

// export async function update(req, res, next) {
//   const doctorId = req.body.doctor._id;
//   const doctorData = req.body.doctor;
//   const userId =req.params.id
//   try {
//     const doctorUpdate = await updateDoctorDetails(userId,doctorId, doctorData);
//     res.send(doctorUpdate);
//   } catch (err) {
//     next(err);
//   }
// }

export async function approveDoctor(req, res, next) {
  const doctorId = req.params.doctorId;
  try {
    const doctorStatus = await approveDoctorStatus(doctorId);
    res.send({ doctorStatus });
  } catch (err) {
    next({ err });
  }
}

// export async function deleteDoctorData(req, res, next) {
//   try {
//     const deletedData = await deleteDoctorDetails(req.params.id);
//     res.send(deletedData);
//   } catch (error) {
//     console.log(error);
//     res.send("error");
//   }
// }

export async function doctorProfileByToken(req, res, next) {
  try {
    const userId = req.body.user._id;
    const data = await doctorProfileViewByToken(userId);
    console.log("data: ",data);
    res.send({ data });
  } catch (error) {
    console.log(error);
    return res.send({ error: "cannot find user" });
  }
}


export async function doctorProfileById(req, res, next) {
  try {
    const userId = req.params.id;
    const data = await doctorProfileViewById(userId);
    console.log("data: ",data);
    res.send({ data });
  } catch (error) {
    console.log(error);
    return res.send({ error: "cannot find user" });
  }
}


export async function getDoctorSingleView(req, res, next) {
  const userId = req.params.id;
  const doctorId = req.params.doctorId;
  try {
    const result = await doctorSingleView(doctorId, userId);
    console.log(result);
    res.send({ result });
  } catch (error) {
    console.log(error);
    next({ error });
  }
}

export async function getDoctorSingleViewByToken(req, res, next) {
  try {
    const userId = req.body.user._id;
    const result = await doctorSingleViewByToken(userId);
    console.log(result);
    return res.send({ result });
  } catch (error) {
    console.log(error);
    next({ error });
  }
}

export async function updateDoctorByToken(req, res, next) {

  try {

    let userId = req.body.doctor._id
    console.log(userId)
    let user = await findUserById(userId);
    if (!user) return res.status(400).send({ message: "user not found" })

    if (user) {
      const userData = req.body.user

      await updateUser(
        userId,
        userData)
    }

    if (user.role === "doctor") {
      const doctor = await findDoctor(userId)
      const doctorId = doctor._id;
      const doctorData = req.body.doctor

      await updateDoctor(
        doctorId,
        doctorData

      )
    }

    console.log(user);
    res.send({ success: true });
  } catch (err) {
    console.log(err);
    next(err);
  }
}