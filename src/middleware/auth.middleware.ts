/*import { NextFunction, Request, Response } from "express";
import userServece from "../services/user.servece";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try{
        const token = req.headers.authorization;
        
        if(!token){
            return res.status(401).send({
                code:401,
                message:'Authentication token fail.',
            });
        }

        const result = await userServece.getUserByToken(token as string);
        if(!result.data){
            return res.status(401).send({
                code: 401,
                message: 'Authentication token fail.',
            });
        }

        req.body.id = result.data.id;

        next();
    } catch (error){
        return res.status(500).send({
            code: 500,
            message: error,
        });
    }
}

export default authMiddleware;*/