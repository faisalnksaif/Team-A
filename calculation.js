// import bodyParser from "body-parser";
// import express from "express";

// import  {Router}  from "express";
// import { db } from './database/connection.js';
 
// var jsonParsor = bodyParser.json();
// export const router = express.Router()



//   router.post("/addition", jsonParsor, function (req, res) {
//     let firstnumber = req.body.num1;
//     let secondnumber = req.body.num2;

//     let sum = parseFloat(firstnumber + secondnumber);
//     // let sum = a+b;
//     // let num = parseInt(sum);
//     // res.send(sum);
//     db.collection("Addition").insertMany(
//       [
//         {
//           num1: firstnumber,
//           num2: secondnumber,
//           sum: sum,
//         },
//       ],
//       function (err, data) {
//         if (err) {
//           res.send("insertion failed");
//         } else {
//           res.send(`SUM:${sum}`);
//           console.log(sum);
//         }
//       }
//     );
//   });

//   router.post("/subtraction", jsonParsor, function (req, res) {
//     let firstnumber = req.body.num1;
//     let secondnumber = req.body.num2;
//     let subtraction = parseFloat(firstnumber - secondnumber);
//     db.collection("Addition").insertMany(
//       [
//         {
//           num1: firstnumber,
//           num2: secondnumber,
//           subtraction: subtraction,
//         },
//       ],
//       function (err, data) {
//         if (err) {
//           res.send("insertion failed");
//         } else {
//           res.send(`SUBTRACTION:${subtraction}`);
//           console.log(subtraction);
//         }
//       }
//     );
//   });
 