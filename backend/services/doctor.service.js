import doctorModel from '../models/doctor.model.js'

export async function save(data){
    const doctor = new doctorModel(data);
    await doctor.save();
    return{doctor}
}

