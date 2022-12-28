import mongoose from 'mongoose'


const hospitalSchema = new mongoose.Schema({
    hospital_name:{
        type : mongoose.Schema.Types.String,
        required : true
    },
    address:{
        type : mongoose.Schema.Types.String,
        required : true
    },
    place:{
        type : mongoose.Schema.Types.String,
        required : true
    },
    contact_no:{
        type : mongoose.Schema.Types.Number,
        required : true
    },
    
})

const model = mongoose.model("hospital",hospitalSchema);
export default model;