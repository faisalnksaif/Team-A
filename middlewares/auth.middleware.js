import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import doctorModel from "../models/doctor.model.js";

export async function verifyUser(req, res, next) {
  const token = req.header('Authorization') && req.header('Authorization').split('Bearer ')[1] || null;

  // if (!token) {
  if (!token) {
    res.status(401).send({message:"Access denied.No token provided"});
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await userModel.findOne({ _id: decoded._id });
    console.log("user: ", user._id);
    req.body.user = user;
    next();
  } catch (error) {
    res.status(400).send({error:"Invalid token"});
  }
}

// export async function adminMiddleware(req, res, next) {
//   const token = req.header("x-auth-token");

//   if (!token) {
//     res.status(401).send("Access denied.No token provided");
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.TOKEN_KEY);
//     const user = await userModel.findOne({ _id: decoded._id });
//     console.log("user: ", user._id);

//     if (user.role === "admin") {
//       req.body.user = user;
//       return next();
//     }
//     if (user.role === "doctor") {
//       req.body.user = user;
//       return next();
//     }
//     if (user.role === "patient") {
//       req.body.user = user;
//       return next();
//     }
//     return res.status(403).send("Access denied. Invalid role!");
//   } catch (error) {
//     res.status(400).send("Invalid token");
//   }
// }

export async function doctorMiddleware(req, res, next) {
  const token = req.header('Authorization') && req.header('Authorization').split('Bearer ')[1] || null;
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await userModel.findOne({ _id: decoded._id });
    console.log("user: ", user._id);

    if (user.role != "doctor")
      return res.status(403).send({message:"Access denied.Not a doctor!"});
    req.body.doctor = user;
    next();
  } catch (error) {
    return res.status(400).send({error:"Invalid token"});
  }
}

export async function userMiddleware(req, res, next) {
  const token = req.header('Authorization') && req.header('Authorization').split('Bearer ')[1] || null;
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const user = await userModel.findOne({ _id: decoded._id });
      console.log("user: ", user._id);
  
      if (user.role != "patient")
        return res.status(403).send({message:"Access denied.Not a patient!"});
      req.body.patient = user;
      next();
    } catch (error) {
      return res.status(400).send({error:"Invalid token"});
    }
  }
  
