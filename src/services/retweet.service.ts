import repository from "../database/prisma.database";
import { ResponseDto } from "../dtos/response.dto";
import { DeleteRetweetDto, RetweetCreateDto, UpdateRetweetDto } from "../dtos/retweet.dto";
import { Retweet } from "../models/retweet.model";


class RetweetService {
  public async create(data: RetweetCreateDto): Promise<ResponseDto> {
    const retweet = new Retweet(data.content, data.tweetId, data.userID);

    const createdRetweet = await repository.retweet.create({
      data: {
        content: retweet.content,
        tweetId: retweet.tweetId,
        userId: data.userID!,
      },
      include: {
        Tweet: {
          select: {
            content: true,
          },
        },
      },
    });

    return {
      code: 201,
      message: `Você retweetou '${createdRetweet.content}' no tweet '${createdRetweet.Tweet!.content}'.`,
      data: createdRetweet,
    };
  }

  public async list(): Promise<ResponseDto> {
    const result = await repository.retweet.findMany();

    return {
      code: 200,
      message: `List of all retweets:`,
      data: result,
    };
  }

  public async update(data: UpdateRetweetDto): Promise<ResponseDto> {
    const result = await repository.retweet.update({
      where: {
        id: data.id,
        userId: data.userID,
      },
      data: {
        content: data.content,
      },
    });
    return {
      code: 200,
      message: `You changed your retweet. new tweet: '${result.content}'`,
      data: result,
    };
  }

  public async delete(data: DeleteRetweetDto): Promise<ResponseDto> {
    const result = await repository.retweet.delete({
      where: {
        id: data.id,
        userId: data.userID,
      },
      include: {
        Tweet: {
          select: {
            content: true,
          },
        },
      },
    });

    return {
      code: 200,
      message: `You deleted your retweet'${result.content} from tweet '${result.Tweet!.content}'`,
      data: result,
    };
  }

  public async listByUserId(userID: string): Promise<ResponseDto> {
    const result = await repository.retweet.findMany({
      where: {
        userId: userID,
      },
      include: {
        User: {
          select: {
            username: true,
          },
        },
        Tweet: {
          select: {
            content: true,
            User: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    return {
      code: 200,
      message: `List of all retweets ${result[0].User.username}`,
      data: result,
    };
  }

  public async showUniqueRetweet(id:string): Promise<ResponseDto>{
    
    const result = await repository.retweet.findUnique({
      where:{
        id
      }
    })


    return {
      code:200,
      message: "Retweet found successfully.",
      data: result
    }
  }
}
export default new RetweetService();