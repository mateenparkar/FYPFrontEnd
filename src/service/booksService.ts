import axios from "axios";
import { Books } from "../model/books";

interface BookWithAuthor extends Books {
    authorName: string;
    formattedPublishedDate: string;
    genreName: string; // Add a new property for formatted date
}

export const viewBooks = async function (): Promise<BookWithAuthor[]> {
    try {
        const booksResponse = await axios.get('http://localhost:8080/api/books');
        const books: Books[] = booksResponse.data;

        // Fetch author names and format published_date for each book asynchronously
        const booksWithAuthors: Promise<BookWithAuthor>[] = books.map(async (book: Books) => {
            const authorResponse = await axios.get(`http://localhost:8080/api/author/${book.author}`);
            const authorName: string = authorResponse.data.name;

            const genreResponse = await axios.get(`http://localhost:8080/api/genre/${book.genre}`);
            const genreName: string = genreResponse.data.genre_name;

            // Convert published_date from timestamp to a readable date format (day/month/year)
            const formattedPublishedDate: string = new Date(book.published_date)
                .toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' });
            
            const bookWithAuthor: BookWithAuthor = { ...book, authorName, formattedPublishedDate, genreName };
            return bookWithAuthor;
        });

        // Wait for all the asynchronous operations to complete and return the result
        return Promise.all(booksWithAuthors);
    } catch (error) {
        throw new Error('Could not get books with authors');
    }
};


export const viewBook = async function (id: number): Promise<BookWithAuthor> {
    try {
        const bookResponse = await axios.get('http://localhost:8080/api/books/' + id);
        const book: Books = bookResponse.data;

        const authorResponse = await axios.get(`http://localhost:8080/api/author/${book.author}`);
        const authorName: string = authorResponse.data.name;

        const genreResponse = await axios.get(`http://localhost:8080/api/genre/${book.genre}`);
        const genreName: string = genreResponse.data.genre_name;

        // Convert published_date from timestamp to a readable date format (day/month/year)
        const formattedPublishedDate: string = new Date(book.published_date)
            .toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' });

        const bookWithAuthor: BookWithAuthor = { ...book, authorName, formattedPublishedDate, genreName };
        return bookWithAuthor;

    } catch (error) {
        throw new Error('Could not get book with author');
    }
};
