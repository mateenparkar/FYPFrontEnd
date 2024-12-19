import { Request, Response } from "express";
import { deleteBook, getLikedBooks, hasUserReadBook, likeBook, updateUserBook, viewBook, viewBooks } from "../service/booksService";
import { Book, userBooks } from "../model/likeBooks";
import { getComments } from "../service/commentService";
import { generateQuestions } from "../service/GroqService";


export class BooksController {
    public static getAll = async function(req:Request, res:Response): Promise<void>{
        try{
            const books = await viewBooks();
            res.render('books.html', {books:books, user: req.session.user});
        }catch(e){
            console.error(e);
        }
    };

    public static getOne = async function (req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            const book = await viewBook(id);
            const comment = await getComments(id);
            const bookName = req.params.bookName;
    
            const questions = await generateQuestions(bookName);
    
            const hasReadFlag = await hasUserReadBook(req.session.user!.userId, id);
    
            res.render('book_detail.html', {
                books: book,
                hasRead: hasReadFlag,
                user: req.session.user,
                comments: comment,
                questions: questions, 
            });
        } catch (e) {
            console.error(e);
            res.status(500).send('Internal Server Error');
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
            console.error(e)
            res.locals.errormessage = (e as Error).message;
            res.redirect('/books');
        }
    }

    public static deleteLikeBook = async function(req:Request, res:Response): Promise<void>{
        try{
            const data:Book = {
                user_id: req.session.user!.userId,
                book_id: parseInt(req.params.id, 10)
            }
            await deleteBook(data);
            res.redirect('/books');
        }catch(e){
            console.error(e)
            res.locals.errormessage = (e as Error).message;
            res.redirect('/books');
        }
    }

    public static updateUserBook = async function(req:Request, res:Response): Promise<void>{
        try{
            const data:userBooks = {
                user_id: req.session.user!.userId,
                book_id: parseInt(req.params.id, 10),
                read_status: "Read",
                rating: parseInt(req.body.rating, 10),
                date_read: new Date()

            }
            await updateUserBook(data);
            res.json({ message: 'Book status updated successfully' });
        }catch(e){
            console.error(e)
            res.locals.errormessage = (e as Error).message;
            res.redirect('/books');
        }

    }
}