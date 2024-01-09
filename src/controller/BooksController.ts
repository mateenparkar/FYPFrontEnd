import { Request, Response } from "express";
import { viewBook, viewBooks } from "../service/booksService";


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
            console.log(book)
            res.render('book_detail.html', {books:book});
        }catch(e){
            console.error(e);
        }
    };
}