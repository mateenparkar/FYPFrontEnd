import { Request, Response } from "express";
import { Posts } from "../model/post";
import { addPost } from "../service/postService";
import multer from 'multer';
import fs from 'fs';
const upload = multer({ dest: 'uploads/' });
export class PostController {
    public static post = [
        upload.single('post_image_url'),
        async function(req: Request, res: Response): Promise<void> {
            try {
                const data: Posts = {
                    user_id: req.session.user!.userId,
                    title: req.body.title,
                    content: req.body.content,
                    date_posted: new Date(),
                    post_image_url: req.file ? fs.createReadStream(req.file.path) : undefined // Use fs.createReadStream to read the file
                };
                await addPost(data);
                res.redirect('/community');
            } catch (e) {
                res.locals.errormessage = (e as Error).message;
            }
        }
    ];

    public static get = async function(req:Request, res:Response): Promise<void>{
        try{
            res.render('post-to-community', {user: req.session.user})
        }catch(e){
            res.locals.errormessage = (e as Error).message;
        }
    }
}