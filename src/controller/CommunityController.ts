import { Request, Response } from "express";


export class CommunityController {
    public static get = async function(req:Request, res:Response): Promise<void>{
        try{
            res.render('community.html');
        }catch(e){
            res.locals.errormessage = (e as Error).message;
        }
    }
}