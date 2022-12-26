import  mongoose from "mongoose";

const calculationSchema = new mongoose.Schema({
    firstnumber : {
        type: mongoose.Schema.Types.Number,
         required: true
    },

    secondnumber : {
        type: mongoose.Schema.Types.Number,
         required:true
    },
    result : {
        type: mongoose.Schema.Types.Number,
        required:true
    },
    operation : {
        type: mongoose.Schema.Types.String,
        required:true
    },
    
})

const model = mongoose.model("calculations",calculationSchema)

export default model