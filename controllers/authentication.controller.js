import {
  deleteUser,
  getPatients,
  save as saveUser,
  updateUserDetails,
} from "../services/user.service.js";
import {
  deleteDoctorDetails,
  save as saveDoctor,
  updateDoctorDetails,
} from "../services/doctor.service.js";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import doctorModel from "../models/doctor.model.js";

dotenv.config();

export async function signUp(req, res, next) {
  let user = await userModel.findOne({ username: req.body.user.username });
  if (user) return res.status(400).send("user already registered");

  const { password } = req.body.user;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const { user } = await saveUser({
      ...req.body.user,
      password: hashedPassword,
    });

    console.log(user);
    if (user.role === "doctor") {
      await saveDoctor({
        userId: user._id,
        ...req.body.doctor,
      });
    }

    res.send({ success: true });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function signIn(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    let user = await userModel.findOne({ username: username });
    console.log("user: ", user);
    // let role = user.role;

    if (!user) {
      res.status(500).send("Username is invalid!");
    } else {
      const validpassword = await bcrypt.compare(password, user.password);
      console.log("validpassword :", validpassword);

      if (!validpassword) return res.status(500).send("invalid password");

      if (user.role === "doctor") {
        try {
          let doctor = await doctorModel.findOne({ userId: user._id });
          if (doctor && !doctor.isAccepted)
            return res.status(401).send("Doctor is not accepted by admin");
        } catch (error) {
          return res.status(500).send("Error while fetching doctor details!");
        }
      }

      let token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);

      let roleToken = {
        role: user.role,
        token: token,
      };
      // user.token = token;
      res.header("x-auth-token", token).send(roleToken);
    }
  } catch (error) {
    next();
  }
}

//----------update--------

export async function updateProfile(req, res, next) {
  try {
    let user = await userModel.findById(req.params.id);

    if (!user) return res.status(403).send("user not found");
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
    return res.send("cannot update user");
  }
}

//-----------delete-----------

export async function deleteProfile(req, res, next) {
  try {
    let user = await userModel.findById(req.params.id);

    if (!user) return res.status(403).send("user not found");
    const userId = req.params.id;

    if (user) {
      await deleteUser(userId);
    }

    if (user.role === "doctor") {
      const doctor = await doctorModel.findOne({ userId });
      const doctorId = doctor._id;
      await deleteDoctorDetails(doctorId);
    }
    res.send({ success: true });
  } catch (error) {
    return res.send("cannot delete user");
  }
}

//------------get userDetails-----

export async function getUserDetails(req, res, next) {
  try {
    let patients = await userModel.find(
      { role: "patient" },
      {},
      { projection: { username: 0 } }
    );
    if (patients) {
      res.send(patients);
    } else {
      res.send("no patient found");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getDoctorDetails(req, res, next) {
  try {
    let doctors = await doctorModel
      .find()
      .populate("userId", ["username", "name", "address", "mobileNo", "email"]);
    return res.send({ doctors });
  } catch (error) {
    next(error);
  }
}
