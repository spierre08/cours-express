import express from "express";
import { validator } from "../middlewares/validator.middleware.js";
import {
  registerSchema,
  loginSchema,
  updateUserSchema,
} from "../validators/user.validator.js";
import {
  CreateAccount,
  Login,
  GetAllUsers,
  GetUserById,
  DeleteUser,
  UpdateUser,
  GetProfile,
} from "../controllers/user.controller.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", validator(registerSchema), CreateAccount);
router.post("/login", validator(loginSchema), Login);
router.get("/:id", authMiddleware, authorizeRoles("admin"), GetUserById);
router.get("/", authMiddleware, authorizeRoles("admin"), GetAllUsers);
router.get("/me", authMiddleware, GetProfile);
router.patch(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "user"),
  validator(updateUserSchema),
  UpdateUser,
);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), DeleteUser);

export default router;
