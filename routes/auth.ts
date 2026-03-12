import { Router } from "express";
import { login, logout, testController } from "../controllers/authController";

const router = Router();

router.get("/test", testController);
router.post("/login", login);
router.post("/logout", logout);

export default router;
