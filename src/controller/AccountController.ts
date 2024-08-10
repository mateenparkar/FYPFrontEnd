import type { Request, Response } from "express"
import { Update } from "../model/auth";
import { updatePassword } from "../service/accountService";


export class AccountController{
    public static async get(req:Request, res:Response): Promise<void> {
        res.render('account', {user: req.session.user})
    }

    public static update = async function(req:Request, res:Response): Promise<void>{
        try{
            const data:Update = {
                userId: req.session.user!.userId,
                password: req.body.password
            }
            await updatePassword(data);
            res.redirect('/account');
        }catch(e){
            console.error(e)
            res.locals.errormessage = (e as Error).message;
            res.redirect('/account');
        }
    }

}