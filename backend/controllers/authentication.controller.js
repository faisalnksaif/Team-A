import { save as saveUser } from "../services/user.service.js";
import { save as saveDoctor } from "../services/doctor.service.js";
import bcrypt, { hash } from "bcrypt";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// get user details

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
 const role = req.body.role

  try {
    let user = await userModel.findOne({ username: username,role:role });
    console.log("user: ", user);

    if (!user) {
      res.status(500).send("Username is invalid!");
    } else {
      const validpassword = await bcrypt.compare(password, user.password);
      console.log("validpassword :", validpassword);

      if (!validpassword) res.status(500).send("invalid password");

      let token = jwt.sign(
        { username: user.username, role: user.role },
        process.env.TOKEN_KEY
      );

      // user.token = token;
      res.header("x-auth-token", token).send(token);
    }
  } catch (error) {
    next(error);
  }
}
