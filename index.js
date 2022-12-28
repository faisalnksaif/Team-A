import express from "express";
import cors from "cors"
import { initialize } from './database/connection.js';
import router from "./routes/hospital.route.js";
import mongoose from 'mongoose'


(async () =>{
  var app = express()

  await initialize()



  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({limit:"50mb"}))
  app.use(express.urlencoded({limit:"50mb",extended:true}))
  
  app.use("/hospital",router)
   
  
  app.listen(8080,function(){
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
