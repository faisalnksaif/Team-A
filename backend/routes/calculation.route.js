import express from "express";

import { Router } from "express";
import { db } from "../database/connection.js";
import { addition, subtraction } from "./../controllers/calculation.controller.js";

const router = express.Router();

router.post("/addition", addition);
router.post("/subtraction", subtraction);

export default router