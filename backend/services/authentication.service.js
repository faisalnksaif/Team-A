import { getDoctorByUserId } from "./doctor.service.js";
import { getUserByUsername } from "./user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import HttpException from "http-errors";
import { save as saveUser } from "./user.service.js";
import { save as saveDoctor } from "./doctor.service.js";
import { department } from "./department.sevice.js";

export async function userSignUp(userData,doctorData) {
  let findUser = await getUserByUsername(userData);
  if (findUser) return "user already registerd";
  // console.log("userData:",userData);
  let password = userData.password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // user.password = hashedPassword
  const savedUser = await saveUser({
    ...userData,
    password: hashedPassword,
  });
  if (savedUser.role === "doctor") {
    await saveDoctor({
      userId: savedUser._id,
      departmentId:department._id,
      ...doctorData,
    });

  }
    return savedUser;

  
}

export async function userLogin(userData) {
  let user = await getUserByUsername(userData); //
  console.log("user: ", user);
  if (!user) return "user not found";

  // console.log('userData: ',userData);
  const validPassword = await bcrypt.compare(userData.password, user.password);
  if (!validPassword) return { error: "invalid password" };
  console.log(validPassword);

  if (user.role === "doctor") {
    const userId = user._id;
    let doctor = await getDoctorByUserId(userId); //
    if (doctor && !doctor.isAccepted) return "doctor not accepted by admin";
  }
  let token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);

  let roleToken = {
    role: user.role,
    token: token,
  };
  // user.token = token;
  return roleToken;
}

