import { Router } from "express";
import {
  get_local_statistics,
  set_local_statistics,
  delete_local_statistics,
} from "../controllers/local_statistics.js";

const router = Router();

router.get("/", get_local_statistics);
router.post("/", set_local_statistics);
router.delete("/", delete_local_statistics);

export default router;
