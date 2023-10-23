import repository from "../database/prisma.database";
import { ResponseDto } from "../dtos/response.dto";
import { CreateTweetDTO, DeleteTweetDTO, UpdateTweetDTO } from "../dtos/tweet.dto";
import { Tweet } from "../models/tweet.model";
import { User } from "../models/user.model";

class TweetSevice {
    //criar
    public async create(data: CreateTweetDTO) {
        const tweet = new Tweet(data.content, data.type, data.idUser);

        const createdTweet = await repository.tweet.create({
            data:{
                content:tweet.content,
                type:tweet.type,
                userId:tweet.userId
            },
        });
        return {
            ode:201,
            message:'tweet created successfully.',
            data: createdTweet,
        }
    }
    //listar
    public async list(): Promise<ResponseDto>{
        const result = await repository.tweet.findMany();
        return{
            code:200,
            message:'List of all tweets:',
            data: result,
        }
    }
    //listar por usuário
    public async listByUser(userID:string): Promise<ResponseDto>{
        const data = await repository.tweet.findMany({
            where:{
                userId: userID,
            },
            include:{
                User:{
                    select:{
                        username:true,
                    }
                },
            }
        });
        return{
            code:200,
            message:'List of all user tweets: ${data[0].User.username}',
            data: data
        };
    }
    //atualizar
    public async update(data: UpdateTweetDTO): Promise<ResponseDto>{
        const result = await repository.tweet.update({
            where:{
                userId: data.idUser,
                id: data.id,
            },
            data: {
                content: data.content,
            },include:{
                User:{
                    select:{
                        username:true
                    }
                }
            }
        });
        return {
            code:200,
            message:'Tweet updated successfully.',
            data: result
        };        
    }
    //deletar
    public async delete(data: DeleteTweetDTO):Promise<ResponseDto>{
        const result = await repository.tweet.delete({
            where: {
                userId: data.idUser,
                id: data.id
            },
        });
        return {
            code:200,
            message:'Tweet successfully deleted.',
            data:result
        };
        }
    }

    export default new TweetSevice();