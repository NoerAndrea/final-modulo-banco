import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

export const authRoutes = () => {
  const router = Router();
  const controller = new AuthController();

  router.post("/login", authMiddleware,  controller.create);
  router.get("/logout", controller.delete);

  return router;
};