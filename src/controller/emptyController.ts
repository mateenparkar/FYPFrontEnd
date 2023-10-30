import type { Request, Response } from "express";


export class EmptyController {
    public static async get(req:Request, res:Response):Promise<void> { 
        res.render('empty', req.session.user);
    }
}