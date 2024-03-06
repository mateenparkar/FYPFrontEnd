import { getLikedBooks } from "../service/booksService";
import { Request, Response } from "express";

export class LikedBooksController{
    public static getLikedBooks = async function(req:Request, res:Response): Promise<void>{
        try{
            const likedBooks = await getLikedBooks(req.session.user!.userId);
            res.render('view-liked-books.html', {liked_books:likedBooks, user: req.session.user});
        }catch(e){
            console.error(e);
        }
    }
}