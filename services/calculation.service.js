import CalculationModal from '../models/calculation.model.js'

export async function save(num1, num2,result,operation){

  const obj = new CalculationModal({
    firstnumber: num1,
    secondnumber: num2,
    result:result,
    operation:operation,
  })
  await obj.save()
  //  await db.collection("calculation").insertMany(
  //   [
  //     {
  //       num1,
  //       num2,
  //       result,
  //       operation
  //     },
  //   ],
   
  // );




  return {result}
      
}

