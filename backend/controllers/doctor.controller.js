import { save } from "../services/doctor.service.js";
import doctorModel from "../models/doctor.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config()


export async function doctorDetails(req, res, next) {
  let doctor = await doctorModel.findOne({ username: req.body.username });
  if (doctor) return res.status(400).send("Doctor already registerd");

  let username = req.body.username;
  let password = req.body.password;
  let name = req.body.name;
  let address = req.body.address;
  let department = req.body.department;
  let startTime = req.body.startTime;
  let endTime = req.body.endTime;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const data = await save({
      username,
      password: hashedPassword,
      name,
      address,
      department,
      startTime,
      endTime,
    });
    res.send(data);
  } catch (error) {
    next(error);
  }
}

export async function doctorLogin(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  try {
    let doctor = await doctorModel.findOne({ username: username });
    console.log("doctor: ", doctor);

    if (!doctor) {
      res.status(500).send("Invalid user");
    } else {
      const validpassword = await bcrypt.compare(password, doctor.password);
      console.log("validpassword :", validpassword);

      if (!validpassword) res.status(500).send("Invalid Password");

      let token = jwt.sign(
        { username: doctor.username },
        'secret'
      );
      doctor.token = token
      res.send(token);
    }
  } catch (error) {
    next(error);
  }
}
