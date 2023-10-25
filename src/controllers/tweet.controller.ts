import { Request, Response } from "express";
import tweetService from "../services/tweet.service";

export class TweetController {
    //criar
    public async create (req: Request, res: Response) {
        try {
            const {content, type, idUser} = req.body;
            
            const result = await tweetService.create({
                content,
                type,
                idUser            
            });

            return res.status(201).send({
                result
            });
        } catch (error: any) {
            res.status(500).send({
                code: 500,
                message: "Internal server error",
                error: error.toString(),
            });
        };        
    }
    //listar
    public async list (req: Request, res: Response) {
        try {
            const result= await tweetService.list();

            return res.status(200).send(result);
        }catch (error: any){
            return res.status(500).send({
                code: 500,
                message: "Internal server error",
                error: error.toString(),});
        }
    }

    public async listByUser(req:Request, res:Response){
        try {
            const {idUser} = req.body;

            const result = await tweetService.listByUser(idUser);

            return res.status(200).send(result)
        }catch (error: any){
            return res.status(500).send({
                code: 500,
                message: "Internal server error",
                error: error.toString(),});
        }
    }

    //atualizar
    public async update(req: Request, res: Response){
        try{
            const{id, idUser, content} = req.body;

            const result = await tweetService.update({id, idUser, content});

            return res.status(200).send(result)
        }catch (error: any){
            return res.status(500).send({
                code: 500,
                message: "Internal server error",
                error: error.toString(),
            });
        }
    }

    //deletar
    public async delete(req: Request, res: Response) {
        try {
          const { id, idUser } = req.body;
    
          const result = await tweetService.delete({ id, idUser });
    
          return res.status(200).send(result);
        } catch (error: any){
            return res.status(500).send({
                code: 500,
                message: "Internal server error",
                error: error.toString(),
            });
        }
      }
}
