import { save } from '../services/calculation.service.js';

//--------------Addition---------------------//

export async function addition (req, res) {
    let firstnumber = req.body.num1;
    let secondnumber = req.body.num2;
    let sum = parseInt(+firstnumber + +secondnumber);

    try {
     const result = await save(firstnumber,secondnumber,sum,'sum')
      res.send(result);

    } catch (error) {
      res.send({error:"failed"});

    }
  };
    
  

  //-----------subtraction-------------------------//

  export async function  subtraction (req, res) {
    let firstnumber = req.body.num1;
    let secondnumber = req.body.num2;
    let subtraction = parseFloat(firstnumber-secondnumber);

    try {
      const result = await save(firstnumber,secondnumber,subtraction, 'subtraction')
      res.send(result);
    } catch (error) {
      console.log(error)
      res.send(error);

    }
  };

//-------------------------division----------------------------//


export async function division (req,res) {
  let firstnumber = req.body.num1;
  let secondnumber = req.body.num2;
  let division = parseFloat(firstnumber/secondnumber);

  try {
    const result = await save(firstnumber,secondnumber,division,'division')
    res.send(result);
  } catch (error) {
    res.send(error)
  }

}











  // save(firstnumber,secondnumber,sum)
    // await function (err, data) {
    //   if (err) {
    //     res.send("insertion failed");
    //   } else {
    //     res.send(`SUM:${sum}`);
    //     console.log(sum);
    //   }
    // }



  //   function (err, data) {
  //     if (err) {
  //       res.send("insertion failed");
  //     } else {
  //       res.send(`SUBTRACTION:${subtraction}`);
  //       console.log(subtraction);
  //     }
  //   }
  // );