import express from "express";
import cors from "cors";
import { initialize } from "./database/connection.js";
import hospitalRouter from "./routes/hospital.route.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import authenticationRouter from "./routes/authentication.route";
import userRouter from "./routes/user.route.js";
import doctorRouter from "./routes/doctor.route.js";
import departmentRouter from "./routes/department.route.js";
import dotenv from "dotenv";
(async () => {
  var app = express();

  await initialize();

  dotenv.config();

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use("/department", departmentRouter);
  app.use("/doctor", doctorRouter);
  app.use("/user", userRouter);
  app.use("/auth", authenticationRouter);
  app.use("/hospital", hospitalRouter);
  app.use(errorMiddleware);
  app.listen(4000, function () {
    console.log("server connected");
  });
})();

