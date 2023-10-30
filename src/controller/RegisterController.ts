import type { Request, Response } from "express"
import { register } from "./../service/authService";
import { User } from "./../model/auth";




export class RegisterController {
    public static async get(req:Request, res:Response): Promise<void> {
        res.render('register', {user: req.session.user})
    }


    public static async post( req: Request, res: Response): Promise<void> {
        const data: User = req.body;

        try {
            await register(data)

            res.redirect('/login');
        } catch (e) {

            res.locals.errormessage = (e as Error).message;

            res.render('register');
        }
    }
 }