import mongoose from 'mongoose';

const connection_string =
  "mongodb+srv://faisalnksaif:yourClassDay1@cluster0.iaoqh.mongodb.net/classday?retryWrites=true&w=majority";


  // export let db;

  export async function initialize(){
    try{
         await mongoose.connect(connection_string )
            // db = client.db("classday");
            console.log("db connected");
      }catch(err){
          throw err;
    }
}

  