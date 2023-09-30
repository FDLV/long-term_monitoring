import { Router } from "express";
import { create_metrics } from "../controllers/metrics.js";

const router = Router();

router.post("/", create_metrics);

export default router;
