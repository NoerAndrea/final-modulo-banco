import repository from "../database/prisma.database";
import { CreateLikeDto, DeleteLikeDto } from "../dtos/like.dto";
import { ResponseDto } from "../dtos/response.dto";
import { Like } from "../models/like.model";
import retweetService from "./retweet.service";
import tweetService from "./tweet.service";
import userService from "./user.service";

class LikeService {
  public async create(data: CreateLikeDto): Promise<ResponseDto> {
    if (!data.retweetId && !data.tweetId) {
      return {
        code: 404,
        message: "No content was selected to like.",
      };
    }
    const like = new Like(data.userID, data.tweetId, data.retweetId);

    const user = await userService.getById(data.userID);

    if (!user) {
      return {
        code: 404,
        message: "User is not logged in",
      };
    }

    if (data.tweetId) {
      
      const createLike = await repository.like.create({
        data: {
          userId: user.data.id,
          tweetId: tweet.data.id,
        },
        include: {
         Tweet: true,
        },
      });

      if (!createLike) {
        return {
          code: 500,
          message: "Unable to like this tweet.",
        };
      }

      const userWhoTweeted = await repository.user.findUnique({
        where: {
          id: createLike.TweetId!.userId,
        },
      });

      return {
        code: 201,
        message: `Did you like the tweet: '${createLike.TweetId!.content}' from user ${userWhoTweeted!.username}`,
        data: createLike,
      };
    }

    if (data.retweetId) {
      const retweet = await retweetService.showUniqueRetweet(data.retweetId);

      if (retweet.code !== 200) {
        return { code: 500, message: "Retweet not found" };
      }

      const createLike = await repository.like.create({
        data: {
          userId: user.data.id,
          retweetId: retweet.data.id,
        },
        include: {
          RetweetId: true,
        },
      });

      const userWhoRetweeted = await repository.user.findUnique({
        where: {
          id: createLike.RetweetId!.userId,
        },
      });
      return {
        code: 201,
        message: `
        Did you like the retweet: '${createLike.RetweetId!.content}' from user ${userWhoRetweeted!.username}`,
        data: createLike,
      };
    }

    return {
      code: 500,
      message: "It was not possible to leave your like, there was an error locating the content.",
    };
  }

  public async list(): Promise<ResponseDto> {
    const result = await repository.like.findMany();

    return {
      code: 200,
      message: `List of all likes:`,
      data: result,
    };
  }

  public async listAllLikesByUser(userID: string): Promise<ResponseDto> {
    const result = await repository.like.findMany({
      where: {
        userId: userID,
      },
      include: {
        TweetId: {
          select: {
            content: true,
          },
        },
        RetweetId: {
          select: {
            content: true,
          },
        },
      },
    });
    return {
      code: 200,
      message: `List of all tweets you liked:`,
      data: result,
    };
  }

  public async delete(data: DeleteLikeDto): Promise<ResponseDto> {
    const result = await repository.like.delete({
      where: {
        id: data.id,
        userId: data.userID,
      },
      include: {
        TweetId: {
          select: {
            content: true,
          },
        },
        RetweetId: {
          select: {
            content: true,
          },
        },
      },
    });

    return {
      code: 200,
      message: `You liked this tweet.`,
      data: result,
    };
  }
}

export default new LikeService();