import mongoose from "mongoose";


const departmentSchema = new mongoose.Schema({
    departmentName:{
        type:mongoose.Schema.Types.String,
        required : true

    }
})

const department = mongoose.model("department",departmentSchema)
export default department;