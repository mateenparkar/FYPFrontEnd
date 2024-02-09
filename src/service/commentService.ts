import axios from "axios";
import { Comment } from "../model/comment";

export const getComments = async function (bookId: number): Promise<Comment[]> {
    try{
        const commentResponse = await axios.get(`http://localhost:8080/api/comments/${bookId}`);
        const comments: Comment[] = commentResponse.data;
        return comments;
    }catch(error){
        throw new Error('Could not get comments');
    }
}