import { Request, Response } from "express";
import { Comment } from "../model/comment";
import { postComment } from "../service/commentService";

export class CommentController{
    public static postComment = async function(req:Request, res:Response): Promise<void>{
        try{
            const data:Comment = {
                user_id: req.session.user!.userId,
                book_id: parseInt(req.params.id, 10),
                comment_text: req.body.comment_text,
                date_posted: new Date()
            }
            await postComment(data);
            res.redirect('/books')
        }catch(e){
            res.locals.errormessage = (e as Error).message;
        }
    }
}