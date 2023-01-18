import express from "express";
import cors from "cors"
import { initialize } from './database/connection.js';
import hospitalRouter from "./routes/hospital.route.js";

import mongoose from 'mongoose'
import { errorMiddleware } from "./errorMiddleware.js";
import authenticationRouter from './routes/authentication.route'
import userRouter from './routes/user.route.js'
import doctorRouter from './routes/doctor.route.js'
import departmentRouter from './routes/department.route.js'


// import { errorHandling } from "./errorHandler.js";


(async () =>{
  var app = express()

  await initialize()



  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({limit:"50mb"}))
  app.use(express.urlencoded({limit:"50mb",extended:true}))

  app.use("/department",departmentRouter)
  app.use("/doctor",doctorRouter)
  app.use("/user",userRouter)
  app.use("/authentication",authenticationRouter)
  app.use("/hospital",hospitalRouter)

  
  //  app.use(function(err,req,res,next){
  //   res.send(500).send("Something Went Wrong")
  //  })

  app.use(errorMiddleware)
  app.listen(4000,function(){
    console.log("server connected");  
  })
})();

 




















// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// // import url from "url"
// import {router as calculationRoute} from "./calculation.js";
// // import router from "./calculation.js";
// import { initialize } from "./database/connection.js";

// //  var routes = express.Router()
// // var defaulteRoutes = require('./calculation');

// var app = express();
// var jsonParsor = bodyParser.json();
// app.use(cors({ origin: true, credentials: true }));

// //-----------------------db connection-------------------//
// await initialize()

// // calculationRoute(app, db)

// app.use('/calculation', calculationRoute)

// app.get("/", function (req, res) {
//   res.send("<h2>welcome guyss</h2>");
// });

// app.listen(8080, function () {
//   console.log("server started");
// });
