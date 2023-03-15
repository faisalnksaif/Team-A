import userModel from "../models/user.model.js";
import doctorModel from "../models/doctor.model.js";
import { getDoctorByUserId, updateDoctorDetails } from "./doctor.service.js";

export async function getUserByUsername(userData) {
  const user = await userModel.findOne({ username: userData.username });
  return user;
}

export async function save(userData) {
  const user = new userModel(userData);
  const savedUser = await user.save();
  return savedUser;
}

export async function getPatients() {
  const patients = await userModel.find();
  return { patients };
}

export async function getPatientProfileById(id) {
  const user = await userModel.findById(
    id,
    {},
    { projection: { role: 0, password: 0 } }
  );
  if (!user) return "user not found";
  return user;
}

export async function getProfileByToken(userId) {
  const user = await userModel.findById(
    userId,
    {},
    { projection: { role: 0, password: 0 } }
  );
  return user;
}

//-----------update-----------

export async function updateUserDetails(userId, userData) {
  let user = await userModel.findByIdAndUpdate(userId, userData, {
    new: true,
  });
  console.log("userdata: ", userData);
  return user;
}

export async function deleteUser(userId) {
  const deleteUserData = await userModel.findByIdAndDelete(userId);
  return { deleteUserData };
}

// export async function findUserById(userId){

//   const user = await userModel.findById(userId)
//   return {user}
// }

export async function findUserById(userId) {
  const user = await userModel.findById({userId:userId});
  return { user };
}

export async function updateUser(userId, userData) {
  const userProfile = await userModel.findByIdAndUpdate(
    userId,
    userData,

    {
      new: true,
    }
  );
  console.log("userProfile:",userProfile)

  return { userProfile };
}
