import { Request, Response } from "express";
import { viewBooks } from "../service/booksService";


export class BooksController {
    public static get = async function(req:Request, res:Response): Promise<void>{
        try{
            const books = await viewBooks();
            res.render('books.html', {books:books});
        }catch(e){
            console.error(e);
        }
    }
}