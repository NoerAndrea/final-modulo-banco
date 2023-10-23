import { Router } from "express";
import LikeController from "../controllers/like.controller";

export const likeRoutes = () => {
  const router = Router();
  

  router.post("/", new LikeController().create);
  router.get("/list", new LikeController().list)
  router.get("/listAllLikesByUser",  new LikeController().listAllLikesByUser)
  router.delete("/:id", new LikeController().delete)

  return router;
};