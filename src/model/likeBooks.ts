export type Book = {
    user_id: number;
    book_id: number;
}

export type userBooks = {
    user_id:number;
    book_id:number;
    read_status:string;
    rating:number;
    date_read:Date;
}