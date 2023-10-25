import { Request, Response} from "express";
import { v4 as tokenGenerate } from "uuid";
import userService from "../services/user.service";
import { ResponseDto } from "../dtos/response.dto";

export default class AuthController {
  public async create(req: Request, res: Response) {
    try {
      const { emailOrUsername, password } = req.body;

      const user = await userService.getUsernameAndPassword(
        emailOrUsername,
        password
      );

      if (user) {
        const token = tokenGenerate();
        const update = await userService.update({ ...user, token: token });

        const response: ResponseDto = {
          code: 200,
          message: "Login success",
          data: {
            token: token,
          },
        };

        if (update.code === 200) {
          return res.status(response.code).send(response);
        }
      } else {
        const notFoundResponse: ResponseDto = {
          code: 404,
          message: "User not found",
        };
        return res.status(notFoundResponse.code).send(notFoundResponse);
      }
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { token } = req.headers;

      const user = await userService.getByToken(token as string);

      if (user) {
        const response: ResponseDto = {
          code: 200,
          message: "Logout success",
        };

        await userService.update({ ...user, token: null });

        return res.status(response.code).send(response);
      } else {
        const notFoundResponse: ResponseDto = {
          code: 404,
          message: "Logout not found",
        };
        return res.status(notFoundResponse.code).send(notFoundResponse);
      }
    } catch (error: any) {
      res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
