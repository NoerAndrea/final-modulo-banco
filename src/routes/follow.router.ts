import { Router } from "express";
import FollowController from "../controllers/follow.controller";

export const followRoutes = () => {
  const router = Router();

  router.post("/", new FollowController().create);
  router.get("/listAllWhoIFollow", new FollowController().listAllWhoIFollow);
  router.get("/listWhoFollowMe", new FollowController().listWhoFollowMe);
  router.delete('/delete/:followedId', new FollowController().deleteWhoIFollow)
  
  return router;
};