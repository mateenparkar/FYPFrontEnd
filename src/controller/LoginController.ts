import type { Request, Response } from "express";
import {Credentials} from "../model/auth";
import { login } from "../service/authService";


export class LoginController {
    public static get(req:Request, res:Response):void {
        res.render('login', req.session.user);
    }

    public static async post (req:Request, res:Response):Promise<void> {
        const data:Credentials = req.body;

        try{
            req.session.token = await login(data);
            res.redirect('/empty');
        }catch(e){
            res.locals.errormessage = (e as Error).message;
            res.render('login');
        }
    }

    public static logOut(req:Request, res:Response):void {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    }
}