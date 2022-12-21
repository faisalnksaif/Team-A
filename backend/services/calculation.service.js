import { db } from "../database/connection.js";

export async function save(num1, num2,result,operation){
   await db.collection("calculation").insertMany(
    [
      {
        num1,
        num2,
        result,
        operation
      },
    ],
   
  );
  return {result}
      
}

