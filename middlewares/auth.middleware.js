import jwt from "jsonwebtoken";
import config from "dotenv";
import userModel from "../models/user.model";
import doctorModel from "../models/doctor.model.js";

export async function verifyUser(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).send("Access denied.No token provided");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await userModel.findOne({ _id: decoded._id });
    console.log("user: ", user._id);
    req.body.user = user;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

export async function adminMiddleware(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).send("Access denied.No token provided");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await userModel.findOne({ _id: decoded._id });
    console.log("user: ", user._id);

    if (user.role != "admin")
      res.status(403).send("Access denied.Not an admin!");
    req.body.user = user;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

export async function doctorMiddleware(req, res, next) {
  const token = req.header("x-auth-token");
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await userModel.findOne({ _id: decoded._id });
    console.log("user: ", user._id);

    if (user.role != "doctor")
      return res.status(403).send("Access denied.Not a doctor!");
    req.body.user = user;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

export async function userMiddleware(req, res, next) {
    const token = req.header("x-auth-token");
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const user = await userModel.findOne({ _id: decoded._id });
      console.log("user: ", user._id);
  
      if (user.role != "patient")
        return res.status(403).send("Access denied.Not a patient!");
      req.body.user = user;
      next();
    } catch (error) {
      res.status(400).send("Invalid token");
    }
  }
  
