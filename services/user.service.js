import userModel from "../models/user.model.js";

export async function save(data) {
  const user = new userModel(data);
  await user.save();
  return { user };
}

export async function getPatients(){
  const patients = await userModel.find()
  return { patients }
}

export async function getProfile(id) {
  const user = await userModel.findById(
    id,
    {},
    { projection: { role: 0, password: 0 } }
  );
  return { user };
}

export async function updateUserDetails(userId,userData) {
  const userDetails = await userModel.findByIdAndUpdate(
    userId,
   userData,

    {
      new: true,
    }
  );
  console.log("userData:", userData);
  return { userDetails };
}


export async function deleteUser(userId){
  const deleteUserData = await userModel.findByIdAndDelete(userId)
  return {deleteUserData}
}