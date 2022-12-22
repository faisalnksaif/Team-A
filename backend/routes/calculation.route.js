import express from "express";

import { Router } from "express";
import { db } from "../database/connection.js";
import { addition, subtraction,division } from "./../controllers/calculation.controller.js";
import { calculationMiddleware } from './../middlewares/calculation.middleware.js';

const router = express.Router();

router.post("/addition",calculationMiddleware,addition,);
router.post("/subtraction",calculationMiddleware, subtraction);
router.post("/division",calculationMiddleware, division);

export default router