import { Router } from "express";
import RetweetController from "../controllers/retweet.controller";

export const retweetRoutes = ()=>{
    const router = Router()

    router.post('/', new RetweetController().create)
    router.get('/', new RetweetController().list)
    router.put('/', new RetweetController().update)
    router.delete('/', new RetweetController().delete)
    router.get('/listar-by-user', new RetweetController().listByUserId)
   
    return router
}