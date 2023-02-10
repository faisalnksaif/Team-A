import doctorModel from "../models/doctor.model.js";
// import user from "../models/user.model.js";
import userModel from "../models/user.model.js";

// export async function save(doctorData) {
//   const result = await doctorModel.create({ ...doctorData });
//   console.log(result);
//   return { result };
// }

export async function save(doctorData) {
  const doctor = new doctorModel(doctorData);
 const savedDoctor = await doctor.save();
  return  savedDoctor ;
}



// export async function getDoctorData(doctorData){
//   const doctor = await doctorModel({userId})
//   return doctor
// }

export async function getDoctorByUserId(userId){
  const doctor = await doctorModel.findOne({userId})
  return doctor
}

export async function doctorProfileView(id) {
  const doctor = await doctorModel
    .findById(id, {}, { projection: { timeEnd: 0, timeStart: 0 } })
    .populate("userId", ["username", "name", "address", "mobileNo", "email"]);
  console.log(doctor);
  return { doctor };
}

export async function getAll() {
  const doctors = await doctorModel.find();
  return { doctors };
}

// export async function updateDoctorDetails(userId,doctorId, doctorData) {
//   await getDoctorByUserId(userId)
//   const updateDoctorData = await doctorModel.findByIdAndUpdate(
//     doctorId,
//     doctorData,
//     { new: true }
//   );
//   console.log("update: ",updateDoctorData);
//   return  updateDoctorData ;
// }

export async function approveDoctorStatus(doctorId) {
  const doctor = await doctorModel.findById(doctorId);
  doctor.isAccepted = true;
  await doctor.save();

  return { doctor };
}

export async function deleteDoctorDetails(doctorId) {
  const deleteDoctor = await doctorModel.findByIdAndDelete(doctorId);

  return { deleteDoctor };
}


