import axios, { AxiosError } from "axios";
import { Books } from "../model/books";
import { Book, userBooks } from "../model/likeBooks";

interface BookWithAuthor extends Books {
    authorName: string;
    formattedPublishedDate: string;
    genreName: string; 
}

export const viewBooks = async function (): Promise<BookWithAuthor[]> {
    try {
        const booksResponse = await axios.get('http://16.16.24.64:8080/api/books');
        const books: Books[] = booksResponse.data;

        const booksWithAuthors: Promise<BookWithAuthor>[] = books.map(async (book: Books) => {
            const authorResponse = await axios.get(`http://16.16.24.64:8080/api/author/${book.author}`);
            const authorName: string = authorResponse.data.name;

            const genreResponse = await axios.get(`http://16.16.24.64/api/genre/${book.genre}`);
            const genreName: string = genreResponse.data.genre_name;

            const formattedPublishedDate: string = new Date(book.published_date)
                .toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' });
            
            const bookWithAuthor: BookWithAuthor = { ...book, authorName, formattedPublishedDate, genreName };
            return bookWithAuthor;
        });

        return Promise.all(booksWithAuthors);
    } catch (error) {
        throw new Error('Could not get books with authors');
    }
};


export const viewBook = async function (id: number): Promise<BookWithAuthor> {
    try {
        const bookResponse = await axios.get('http://16.16.24.64:8080/api/books/' + id);
        const book: Books = bookResponse.data;

        const authorResponse = await axios.get(`http://16.16.24.64:8080/api/author/${book.author}`);
        const authorName: string = authorResponse.data.name;

        const genreResponse = await axios.get(`http://16.16.24.64:8080/api/genre/${book.genre}`);
        const genreName: string = genreResponse.data.genre_name;

        const formattedPublishedDate: string = new Date(book.published_date)
            .toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' });

        const bookWithAuthor: BookWithAuthor = { ...book, authorName, formattedPublishedDate, genreName };
        return bookWithAuthor;

    } catch (error) {
        throw new Error('Could not get book with author');
    }
};


export const likeBook = async function(book:Book): Promise<void> {
    try{
        await axios.post("http://16.16.24.64:8080/api/addBookToUser", book);
    }catch(e){
        if((e as AxiosError).response?.status === 400){
            throw new Error('Failed to like book');
        }
    }
}

export const deleteBook = async function(book:Book):Promise<void>{
    try{
        console.log("Running deleteBook service with book: ", book)
        await axios.delete("http://16.16.24.64:8080/api/deleteBookFromUser", { data: book });
    }catch(e){
        console.log(e)
        if((e as AxiosError).response?.status != 200){
            throw new Error('Failed to delete book');
        }
    
    }
}

export const getLikedBooks = async function(id:number):Promise<BookWithAuthor[]>{
    try{
        const response = await axios.get('http://16.16.24.64:8080/api/getUserBooks/' + id);
        const book:userBooks[] = response.data;
        const booksWithAuthors: Promise<BookWithAuthor>[] = book.map(async (book: userBooks) => {
            const bookResponse = await viewBook(book.book_id);
            return bookResponse;
        });

        return Promise.all(booksWithAuthors);
    }catch(error){
        throw new Error('Could not get liked books')
    }
}

export const updateUserBook = async function(book:userBooks):Promise<void>{
    try{
        await axios.post("http://16.16.24.64:8080/api/updateBookForUser", book);
    }catch(error){
        if((error as AxiosError).response?.status != 200){
            throw new Error('Failed to delete book');
        }
    }
}

export const hasUserReadBook = async function(userId: number, bookId: number): Promise<boolean> {
    try {
        const response = await axios.get(`http://16.16.24.64:8080/api/getBookDetails/${userId}/${bookId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to check if the user has read the book');
    }
};



