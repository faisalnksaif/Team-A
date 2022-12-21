import express from "express";

import { Router } from "express";
import { db } from "../database/connection.js";
import { addition, subtraction,division } from "./../controllers/calculation.controller.js";

const router = express.Router();

router.post("/addition", addition);
router.post("/subtraction", subtraction);
router.post("/division", division);


export default router