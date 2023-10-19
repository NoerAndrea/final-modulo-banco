import { Router } from "express";
import { userController } from "../controllers/user.controller";

export const userRoutes = () => {
    const router = Router();

    router.post("/", new userController().create);
    router.delete("/:id", new userController().delete);

    return router;
};
