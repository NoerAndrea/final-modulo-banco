import { Router } from "express"
import { TweetController } from "../controllers/tweet.controller"


export const tweetRoutes = ()=>{
    const router = Router()
    
    router.post('/', new TweetController().create);
    router.get('/listUser', new TweetController().listByUser);
    router.get('/list', new TweetController().list);
    router.put('/', new TweetController().update);
    router.delete('/', new TweetController().delete);

    return router;
}