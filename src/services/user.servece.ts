import repository from "../database/prisma.database";
import { ResponseDto } from "../dtos/response.dto";
import { CreateUser } from "../dtos/user.dto";
import { User } from "../models/user.model";

class UserService {
    public async create(data: CreateUser) {
        const user = new User(data.name, data.email, data.username, data.password);

        const createdUser = await repository.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
                password: user.password
            },
        });
        return createdUser;
    }

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
                id
            },
        });

        return {
            code: 200,
            message: "User successfully deleted.",
        }
    }
}

export default new UserService();