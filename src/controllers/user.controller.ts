import { Request, Response } from "express";
import userServece from "../services/user.service";

export class userController {
    //criar
    public async create (req: Request, res: Response) {
        try {
            const {name, email, username, password} = req.body;

            if(!name || !email || !username || !password) {
                return res.status(400).send({
                    ok: false,
                    message: "Unidentified user.",
                })
            };

            const result = await userServece.create({
                name,
                email,
                username,
                password,                
            });

            return res.status(201).send({
                ok: true,
                message: "User successfully registered!",
                data: result,
            });
        } catch (error: any) {
            res.status(500).send({
                ok:false,
                message: error.toString(),
            });
        };        
    }
    
    //deletar
    public async delete(req: Request, res: Response) {
        try {
            const {id} = req.params;

            const result = await userServece.delete(id);

            return res.status(result.code).send(result);
        } catch (error: any) {
            res.status(500).send({
                ok:false,
                message:error.toString(),
            });
        }
    }
}
