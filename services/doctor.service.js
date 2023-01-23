import doctorModel from "../models/doctor.model.js";
// import user from "../models/user.model.js";
import userModel from "../models/user.model.js";

// export async function save(doctorData) {
//   const result = await doctorModel.create({ ...doctorData });
//   console.log(result);
//   return { result };
// }

export async function save(data) {
  const doctor = new doctorModel(data);
  await doctor.save();
  return { doctor };
}

export async function doctorProfile(id) {
  const doctor = await doctorModel
    .findById(id, {}, { projection: { timeEnd: 0, timeStart: 0 } })
    .populate("userId", ["username", "name", "address", "mobileNo", "email"]);
  console.log(doctor);
  return { doctor };
}

export async function getAll() {
  const doctorList = await doctorModel.find({});
  return { doctorList };
}

export async function updateDoctorDetails(req, res, next) {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      res.send("user not found");
    }
    const doctor = await doctorModel.findOne({ userId: req.params.id });
    if (!doctor) {
      res.send("doctor not found");
    }
    //  const updateProfile = await doctorModel.findByIdAndUpdate(req.params.id,{
    (user.username = req.body.username),
      (user.name = req.body.name),
      (user.address = req.body.address),
      (user.mobileNo = req.body.mobileNo),
      (user.email = req.body.email),
      (doctor.department = req.body.department),
      (doctor.timeStart = req.body.timeStart),
      (doctor.timeEnd = req.body.timeEnd),
      (doctor.qualification = req.body.qualification);

    await user.save();
    await doctor.save();

    return res.status(200).send("successfully updated");
  } catch (error) {
    console.log(error);
    res.send("error");
  }
}

export async function deleteDoctorDetails(id) {
  try {
    const deleteDoctor = await doctorModel.findByIdAndDelete(id);
    const deleteUser = await userModel.findByIdAndDelete(deleteDoctor.userId);

    return { deleteDoctor, deleteUser };
  } catch (error) {
    throw error;
  }
}
