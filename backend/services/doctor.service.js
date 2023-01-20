import doctorModel from "../models/doctor.model.js";
import userModel from "../models/user.model.js";


// export async function save(doctorData) {
//   const result = await doctorModel.create({ ...doctorData });
//   console.log(result);
//   return { result };
// }

export async function save(data){
  const doctor = new doctorModel(data);
  await doctor.save()
  return { doctor }
}

export async function doctorProfile(id){
  const doctor = await doctorModel.findById(id,{},{projection:{timeEnd:0,timeStart:0}}).populate("userId",["username","name","address","mobileNo","email"])
  console.log(doctor);
  return { doctor }
}

export async function getAll(){
  const doctorList = await doctorModel.find({})
  return { doctorList }
}


export async function update(req,res){
 const updateProfile = await doctorModel.findByIdAndUpdate(req.params.id,{
  department: req.body.department,
  timeStart: req.body.timeStart,
  timeEnd:req.body.timeEnd,
  qualification:req.body.qualification,
  yearofExperience:req.body.yearofExperience,

 })
 return{updateProfile}
}


export async function deleteDoctor(id){
  const deleteDoctor = await doctorModel.findByIdAndDelete(id)
  return{ deleteDoctor }
}