// import { deleteUser, getProfile} from "../services/user.service.js";

import {
  getPatientProfileById,
  getProfileByToken,
  updateUserDetails,
} from "../services/user.service.js";

export async function userProfileView(req, res, next) {
  try {
    const userId = req.body.user._id;
    const profile = await getProfileByToken(userId);
    return res.send({ profile });
  } catch (error) {
    next({ error });
  }
}

export async function patientProfileById(req, res, next) {
  try {
    const userId = req.params.id;
    const profileView = await getPatientProfileById(userId);
    res.send({ profileView });
  } catch (error) {
    // console.log(error);
    res.send("error: ", error);
  }
}

// export async function deleteUserProfile(req,res,next){
//     try {
//         const deletedProfile = await deleteUser(req.params.id)
//         res.send(deletedProfile)
//     } catch (error) {
//         next(error)
//     }
// }

export async function updateProfile(req, res, next) {
  try {
    const userId = req.params.id;
    const userData = req.body.user;
    

    const user = await updateUserDetails(
      userId,
      userData,
     
    );
    // console.log("data: ", user);
    return res.send( {user} );
  } catch (error) {
    console.log(error);
    next({error});
  }
}
