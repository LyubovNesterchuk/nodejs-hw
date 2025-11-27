import { Router } from 'express';

import { authenticate } from '../middleware/authenticate.js';
import { upload } from "../middleware/multer.js";
import { getMe, updateMe, updateUserAvatar } from "../controllers/userController.js";

const router = Router();

router.get("/users/me", authenticate, getMe);
router.patch("/users/me", authenticate, updateMe);
router.patch("/users/me/avatar", authenticate, upload.single("avatar"), updateUserAvatar);

export default router;
