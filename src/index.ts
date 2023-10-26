import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";

import { userRoutes } from "./routes/user.routes";
import { tweetRoutes } from "./routes/tweet.routes";
import { authRoutes } from "./routes/auth.routes";
import { retweetRoutes } from "./routes/retweet.router";
import { likeRoutes } from "./routes/like.router";
import { followRoutes } from "./routes/follow.router";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/", userRoutes());
app.use("/auth", authRoutes());
app.use("/tweet", tweetRoutes());
app.use("/retweet", retweetRoutes());
app.use("/like", likeRoutes());
app.use("/follow", followRoutes());

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});

app.get('/', (req: Request, res: Response) => {
    return res
    .status(200).send({success: true, message:"API - GrowTwitter"})
});


