import {
  approveDoctorStatus,
  deleteDoctorDetails,
  doctorProfile,
  getAll,
  updateDoctorDetails,
} from "../services/doctor.service.js";

export async function profile(req, res, next) {
  try {
    const profileView = await doctorProfile(req.params.id);
    return res.send(profileView);
  } catch (error) {
    next(error);
  }
}

export async function getDoctorList(req, res) {
  const doctors = await getAll();
  res.send(doctors);
}

// export async function update(req, res, next) {
//   const doctorId = req.params.id;
//   const doctorData = req.body;
//   try {
//     const doctorUpdate = await updateDoctorDetails(doctorId, doctorData);
//     res.send(doctorUpdate);
//   } catch (err) {
//     next(err);
//   }
// }

export async function approveDoctor(req, res, next) {
  const doctorId = req.params.doctorId
  try {
    const doctorStatus = await approveDoctorStatus(doctorId);
    res.send(doctorStatus);
  } catch (err) {
    next(err);
  }
}

// export async function deleteDoctorData(req, res, next) {
//   try {
//     const deletedData = await deleteDoctorDetails(req.params.id);
//     res.send(deletedData);
//   } catch (error) {
//     console.log(error);
//     res.send("error");
//   }
// }
