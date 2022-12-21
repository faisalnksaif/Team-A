import { db } from "../database/connection.js";

//--------------Addition---------------------//

export  function addition (req, res) {
    let firstnumber = req.body.num1;
    let secondnumber = req.body.num2;

    let sum = parseFloat(firstnumber + secondnumber);
    // let sum = a+b;
    // let num = parseInt(sum);
    // res.send(sum);
    db.collection("Addition").insertMany(
      [
        {
          num1: firstnumber,
          num2: secondnumber,
          sum: sum,
        },
      ],
      function (err, data) {
        if (err) {
          res.send("insertion failed");
        } else {
          res.send(`SUM:${sum}`);
          console.log(sum);
        }
      }
    );
  };

  //-----------subtraction-------------------------//

  export function  subtraction (req, res) {
    let firstnumber = req.body.num1;
    let secondnumber = req.body.num2;
    let subtraction = parseFloat(firstnumber - secondnumber);
    db.collection("Addition").insertMany(
      [
        {
          num1: firstnumber,
          num2: secondnumber,
          subtraction: subtraction,
        },
      ],
      function (err, data) {
        if (err) {
          res.send("insertion failed");
        } else {
          res.send(`SUBTRACTION:${subtraction}`);
          console.log(subtraction);
        }
      }
    );
  };