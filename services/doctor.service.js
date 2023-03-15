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
  return savedDoctor;
}

export async function getDoctors() {
  const doctors = await doctorModel
    .find()
    .populate("userId", ["username", "name", "address", "mobileNo", "email"])
    .populate("departmentId", ["departmentName"])
    .populate("hospitalId", ["hospitalName"]);

  return  doctors ;
}

// export async function getDoctorData(doctorData){
//   const doctor = await doctorModel({userId})
//   return doctor
// }

export async function getDoctorByUserId(userId) {
  const doctor = await doctorModel.findOne({ userId });
  return doctor;
}

export async function doctorProfileView(id) {
  const doctor = await doctorModel
    .findById(id, {}, { projection: { timeEnd: 0, timeStart: 0 } })
    .populate("userId", ["username", "name", "address", "mobileNo", "email"])
    .populate("departmentId", ["departmentName"])
    .populate("hospitalId", ["hospitalName"]);
  console.log(doctor);
  return doctor;
}

export async function doctorProfileViewByToken(userId) {
  let user = await userModel.findById(userId);

  if (!user) return {message:"user not found"};

  if (user.role === "doctor") {
    const doctor = await doctorModel.findOne({ userId });
    const doctorId = doctor._id;
    const doctorData = await doctorProfileView(doctorId);
    return doctorData;
  }
}

export async function doctorProfileViewById(userId) {
  let user = await userModel.findById(userId);

  if (!user) return {message:"user not found"};

  if (user.role === "doctor") {
    const doctor = await doctorModel.findOne({ userId });
    const doctorId = doctor._id;
    const doctorData = await doctorProfileView(doctorId);
    return doctorData;
  }
}

export async function doctorSingleView(doctorId, userId) {
  const user = await userModel.findById(userId);
  if (!user) return {message:"user not found"};
  if (user.role === "doctor") {
    const doctor = await doctorModel.findOne({ userId });
    const doctorId = doctor._id;
    console.log("doctorrr: ", doctor);
    const doctorData = await doctorModel
      .findById(doctorId)
      .populate("userId", ["username", "name", "address", "mobileNo", "email"]);
    console.log("doctordata: ", doctorData);
    return doctorData;
  }
}

export async function doctorSingleViewByToken(userId) {
  const user = await userModel.findById(userId);
  if (!user) return {message:"user not found"};
  if (user.role === "doctor") {
    const doctor = await doctorModel.findOne({ userId });
    const doctorId = doctor._id;
    console.log("doctorrr: ", doctor);
    const doctorData = await doctorModel
      .findById(doctorId)
      .populate("userId", ["username", "name", "address", "mobileNo", "email"]);
    console.log("doctordata: ", doctorData);
    return doctorData;
  }
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

// export async function findDoctor(doctorID) {
//   const doctor = await doctorModel.findById( doctorID);
//   const doctorId = doctor.userId
//   return doctorId;
// }
export async function findDoctor(userId){
  const doctor = await doctorModel.findOne({userId:userId})
  console.log("doctor::",doctor);
  return doctor
}

// export async function findDoctor(userId){
//   const doctor = await doctorModel.findOne({userId:userId})
//   return {doctor}
// }

// export async function  updateUserDetails(doctorId,doctorData) {
//   const result = await doctorModel.findByIdAndUpdate(doctorId,doctorData, 

//    {
//       new: true
//   })
//   return { result }

// }
export async function  updateDoctor(doctorId,doctorData) {
  const result = await doctorModel.findByIdAndUpdate(doctorId,doctorData, 

   {
      new: true
  })
  return { result }

}


export async function findDoctoryd(doctorID){
  const doctor = await doctorModel.findOne({doctorID:doctorID})
  console.log("doctor::",doctor);
  return doctor
}