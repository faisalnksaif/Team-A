import userModel from "../models/user.model.js";
// import doctorModel from "../models/doctor.model.js";

export async function save(data) {
  const user = new userModel(data);
  // console.log();
  await user.save();
  return { user };
}

export async function getProfile(id) {
  const user = await userModel.findById(
    id,
    {},
    { projection: { role: 0, password: 0 } }
  );
  // if (user.role ==="doctor"){
  //   const doctor = await doctorModel.findById(id,{},{projection:{department:1}})
  // }
  return { user };
}

export async function update(id) {
  const userProfile = await userModel.findByIdAndUpdate(
    id,
    {
      username: req.body.username,
      name: req.body.name,
      address: req.body.address,
      mobileNo: req.body.mobileNo,
      email: req.body.email,
    },
    {
      new: true,
    }
  );
  return{ userProfile }
}
