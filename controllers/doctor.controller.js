import {
  approveDoctorStatus,
  deleteDoctorDetails,
  doctorProfile,
  doctorProfileView,
  doctorProfileViewById,
  doctorProfileViewByToken,
  doctorSingleView,
  doctorSingleViewByToken,
  getAll,
  getDoctors,
  updateDoctorDetails,
} from "../services/doctor.service.js";

// export async function profile(req, res, next) {
//   try {
//     const profileView = await doctorProfile(req.params.id);
//     return res.send(profileView);
//   } catch (error) {
//     next(error);
//   }
// }

export async function getDoctorList(req, res) {
  const doctors = await getDoctors();
  res.send({ doctors });
}

// export async function update(req, res, next) {
//   const doctorId = req.body.doctor._id;
//   const doctorData = req.body.doctor;
//   const userId =req.params.id
//   try {
//     const doctorUpdate = await updateDoctorDetails(userId,doctorId, doctorData);
//     res.send(doctorUpdate);
//   } catch (err) {
//     next(err);
//   }
// }

export async function approveDoctor(req, res, next) {
  const doctorId = req.params.doctorId;
  try {
    const doctorStatus = await approveDoctorStatus(doctorId);
    res.send({ doctorStatus });
  } catch (err) {
    next({ err });
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

export async function doctorProfileByToken(req, res, next) {
  try {
    const userId = req.body.user._id;
    const data = await doctorProfileViewByToken(userId);
    console.log("data: ",data);
    res.send({ data });
  } catch (error) {
    console.log(error);
    return res.send({ error: "cannot find user" });
  }
}


export async function doctorProfileById(req, res, next) {
  try {
    const userId = req.params.id;
    const data = await doctorProfileViewById(userId);
    console.log("data: ",data);
    res.send({ data });
  } catch (error) {
    console.log(error);
    return res.send({ error: "cannot find user" });
  }
}


export async function getDoctorSingleView(req, res, next) {
  const userId = req.params.id;
  const doctorId = req.params.doctorId;
  try {
    const result = await doctorSingleView(doctorId, userId);
    console.log(result);
    res.send({ result });
  } catch (error) {
    console.log(error);
    next({ error });
  }
}

export async function getDoctorSingleViewByToken(req, res, next) {
  try {
    const userId = req.body.user._id;
    const result = await doctorSingleViewByToken(userId);
    console.log(result);
    return res.send({ result });
  } catch (error) {
    console.log(error);
    next({ error });
  }
}
