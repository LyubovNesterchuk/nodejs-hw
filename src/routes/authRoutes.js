import { Router } from "express";
import { celebrate } from "celebrate";

import { registerUser, loginUser, logoutUser, refreshUserSession, requestResetEmail, resetPassword,
  checkSession  } from "../controllers/authController.js";
import { registerUserSchema, loginUserSchema, requestResetEmailSchema, resetPasswordSchema } from "../validations/authValidation.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post("/api/auth/register", celebrate(registerUserSchema), registerUser);
router.post("/api/auth/login", celebrate(loginUserSchema), loginUser);
router.post("/api/auth/logout", logoutUser);
router.post("/api/auth/refresh", refreshUserSession);
router.post("/api/auth/request-reset-email", celebrate(requestResetEmailSchema), requestResetEmail);
router.post("/api/auth/reset-password", celebrate(resetPasswordSchema), resetPassword);

router.get("/api/auth/session", authenticate, checkSession);

export default router;
