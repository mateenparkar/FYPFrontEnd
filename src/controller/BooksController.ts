import { Request, Response } from "express";
import { likeBook, viewBook, viewBooks } from "../service/booksService";
import { Book } from "../model/likeBooks";


export class BooksController {
    public static getAll = async function(req:Request, res:Response): Promise<void>{
        try{
            const books = await viewBooks();
            res.render('books.html', {books:books});
        }catch(e){
            console.error(e);
        }
    };

    public static getOne = async function(req:Request, res:Response): Promise<void>{
        try{
            const id = parseInt(req.params.id, 10); 
            const book = await viewBook(id);
            res.render('book_detail.html', {books:book, user: req.session.user});
        }catch(e){
            console.error(e);
        }
    };

    public static likeBook = async function(req:Request, res:Response): Promise<void>{
        try{
            const data:Book = {
                user_id: req.session.user!.userId,
                book_id: parseInt(req.params.id, 10)
            }
            await likeBook(data);
            res.redirect('/books');
        }catch(e){
            res.locals.errormessage = (e as Error).message;
        }
    }
}