import { deleteDoctor, doctorProfile, getAll,Update } from "../services/doctor.service.js";


export async function profile(req,res,next){
    try{
        const profileView = await doctorProfile(req.params.id)
        res.send(profileView)
    }catch(error){
        next(error)
    }
}

export async function getDoctorList(req,res){
    const {doctorList} = await getAll()
    res.send(doctorList)
}

// export async function update(req,res,next){
//     try{
//         const doctorUpdate = await Update(req,res)
//         res.send(doctorUpdate)
//     }catch(err){
//         next(err)
//     }
   
// }


export async function deleteDoctorData(req,res,next){
    try {
        const deletedData = await deleteDoctor(req.params.id)
        res.send(deletedData)
    } catch (error) {
        next(error)
    }
}

