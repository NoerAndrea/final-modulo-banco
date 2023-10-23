import repository from "../database/prisma.database";
import { CreateUserDTO} from "../dtos/user.dto";
import { User } from "../models/user.model";
import { UpdateUserDTO } from "../dtos/user.dto";
import { v4 as createUuid} from "uuid";
import { ResponseDto } from "../dtos/response.dto";

class UserService {
    public async create(data: CreateUserDTO): Promise<ResponseDto> {
        const user = new User(data.name, data.email, data.username, data.password);

        const createdUser = await repository.user.create({
            data: {
                name: user.name,
                email: user.email,
                username: user.username,
                password: user.password,
            },
        });
        return {
            code:201,
            message:'user created successfully.',
            data: createdUser,
        };
    }   
    
    /*public async update(data: UpdateUserDTO): Promise<ResponseDto>{
        const user = await repository.user.update({
            where:{
                username: data.username,
            },
        });

        if(!user){
            return {
                code: 404,
                message: 'User not found.'
            };
        }

        const updateUser = await repository.user.update({
            where: {
                id: user.id,
            },
            data:{
                name: data.name,
                email: data.email,
                password: data.password,
                username: data.username,
            }
        });
        return {
            code:200,
            message:'User updated successfully.',
            data: updateUser
        };
    }*/
   
    public async delete(id:string): Promise<ResponseDto> {
        const user = await repository.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            return {
                code: 404,
                message: "User not found.",
            };
        }

        await repository.user.delete({
            where: {
                id,
            },
        });

        return {
            code: 200,
            message: "User successfully deleted.",
        }
    }

    public async getById(id: string): Promise<ResponseDto> {
        const result = await repository.user.findUnique({
          where: {
            id,
          },
        });
    
        return {
          code: 200,
          message: `Successfully.`,
          data: result,
        };
      }
}

export default new UserService();