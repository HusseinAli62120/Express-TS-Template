import { Router } from "express";
import {
  login,
  logout,
  signup,
  testController,
} from "../controllers/authController";

const router = Router();

router.get("/test", testController);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
