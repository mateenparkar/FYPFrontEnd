import { Request, Response } from "express";
import { getPosts } from "../service/postService";


export class CommunityController {
    public static get = async function(req:Request, res:Response): Promise<void>{
        try{
            const posts = await getPosts();
            res.render('community.html', {posts:posts, user: req.session.user});
        }catch(e){
            res.locals.errormessage = (e as Error).message;
        }
    }
}