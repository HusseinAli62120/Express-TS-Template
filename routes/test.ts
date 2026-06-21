import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { testController } from "../controllers/testController";

const router = Router();

router.get("/test", requireAuth as any, testController as any);

export default router;
