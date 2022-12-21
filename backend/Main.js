import express from "express";
import cors from "cors";
import { initialize } from "./database/connection.js";
import  calculationRoute from "./routes/calculation.route.js";

// app.use(bodyParser.json());
// app.use(express.json())
var app = express();
app.use(cors({ origin: true, credentials: true }));

//-----------------------db connection-------------------//

await initialize()

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb",extended:true}))




// calculationRoute(app, db)

app.use('/calculation', calculationRoute)

app.get("/", function (req, res) {
  res.send("<h2>welcome guyss</h2>");
});

app.listen(8080, function () {
  console.log("server started");
});
