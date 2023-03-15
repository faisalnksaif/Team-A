import {
  deleteUser,
  findUserById,
  save as saveUser,
  updateUser,
  updateUserDetails,
} from "../services/user.service.js";
import {
  deleteDoctorDetails,
  doctorProfileView,
  findDoctor,
  save as saveDoctor,
  updateDoctor,
  updateDoctorDetails,
} from "../services/doctor.service.js";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import doctorModel from "../models/doctor.model.js";
import { userLogin, userSignUp } from "../services/authentication.service.js";
import mongoose from "mongoose";
import { ObjectID } from "bson";

dotenv.config();

//-----sign-up--------

export async function signUp(req, res, next) {
  const userData = req.body.user;
  const doctorData = req.body.doctor;

  try {
    const user = await userSignUp(userData, doctorData);
    res.send({ user });
  } catch (error) {
    // console.log(error);
    next({ error });
  }
}

//-------sign-in-----

export async function signIn(req, res, next) {
  const userData = req.body;
  try {
    const result = await userLogin(userData);
    res.send({ result });
  } catch (error) {
    console.log(error);
    next({ error });
  }
}

export async function signOut(req, res, next) {
  try {
    res.clearCookie("token");
    res.status(200).send("Logged out successfully");
  } catch (error) {
    console.log(error);
    next({ error });
  }
}

//----------update--------

export async function updateProfile(req, res, next) {
  try {
    let user = await userModel.findById(req.params.id); //

    if (!user) return res.status(404).send({ error: "user not found" });
    const userId = req.params.id;

    if (user) {
      const userData = req.body.user;

      await updateUserDetails(userId, userData);
    }

    if (user.role === "doctor") {
      const doctor = await doctorModel.findOne({ userId });
      const doctorId = doctor._id;
      const doctorData = req.body.doctor;
      await updateDoctorDetails(doctorId, doctorData);
    }
    res.send({ success: true });
  } catch (error) {
    return res.status(500).send({ error: "updation failed" });
  }
}

//------update by token---

export async function updateProfileByToken(req, res, next) {
  try {
    // const userId = mongoose.Types.ObjectId(req.body.user._id);
    const id = req.body.user._id;
    // const userId = new ObjectID(id)
    const userId = mongoose.Types.ObjectId(req.body.user.id.trim());

    let user = await userModel.findById({ userId: userId });
    console.log("userrr:", user);

    if (!user) return res.status(403).send({ error: "cannot find user" });
    // const userId = req.body.user._id;

    if (user) {
      const userData = req.body.user;

      await updateUserDetails(userId, userData);
    }

    if (user.role === "doctor") {
      const doctor = await doctorModel.findOne({ userId: userId });
      const doctorId = doctor._id;
      const doctorData = req.body.doctor;
      await updateDoctorDetails(doctorId, doctorData);
    }
    res.send({ success: true });
  } catch (error) {
    console.log("aaaa:", error);
    return res.send({ error: "cannot update user" });
  }
}

//-----------delete-----------

export async function deleteProfile(req, res, next) {
  try {
    let user = await userModel.findById(req.params.id); //

    if (!user) return res.status(403).send({ error: "user not found" });
    const userId = req.params.id;

    if (user) {
      await deleteUser(userId);
    }

    if (user.role === "doctor") {
      const doctor = await doctorModel.findOne({ userId }); //
      const doctorId = doctor._id;
      await deleteDoctorDetails(doctorId);
    }
    res.send({ success: true });
  } catch (error) {
    return res.status(500).send({ error: "cannot delete user" });
  }
}

//------------get userDetails-----

export async function getUserDetails(req, res, next) {
  try {
    let patients = await userModel.find(
      //
      { role: "patient" },
      {},
      { projection: { password: 0 } }
    );
    if (patients) {
      res.send({ patients });
    } else {
      res.send({ message: "no user found" });
    }
  } catch (error) {
    console.log(error);
    next({ error });
  }
}

// export async function getDoctorDetails(req, res, next) {
//   try {
//     let doctors = await doctorModel
//       .find()
//       .populate("userId", ["username", "name", "address", "mobileNo", "email"]);
//     return res.send({ doctors });
//   } catch (error) {
//     next({ error });
//   }
// }

//update profile
// export async function updateProfile(req, res, next) {
//   try {
//     let userId = req.params.id;
//     let { user } = await findUserById(userId);
//     if (!user) return res.status(400).send({ message: "user not found" });

//     if (user) {
//       const userData = req.body.user;

//       await updateUser(userId, userData);
//     }

//     if (user.role === "doctor") {
//       const { doctor } = await findDoctor(userId);
//       const doctorId = doctor._id;
//       console.log("doctorId....", doctorId);
//       const doctorData = req.body.doctor;

//       await updateDoctor(doctorId, doctorData);
//     }

//     console.log(user);
//     res.status(200).send({ success: true });
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// }
