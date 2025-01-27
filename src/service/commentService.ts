import axios from "axios";
import { Comment } from "../model/comment";
import { User } from "../model/auth";

export const getComments = async function (bookId: number): Promise<Comment[]> {
    try{
        const commentResponse = await axios.get(`http://13.49.21.183/api/comments/${bookId}`);
        const comments: Comment[] = commentResponse.data;
        const commentsWithUserDetails = await Promise.all(
            comments.map(async (comment) => {
                const userResponse = await axios.get(`http://13.49.21.183:8080/api/user/${comment.user_id}`);
                const user: User = userResponse.data; 
                return { ...comment, userName: user.username }; 
            })
        );
        return commentsWithUserDetails;
    }catch(error){
        throw new Error('Could not get comments');
    }
}

export const postComment = async function(comment: Comment):Promise<void> {
    try{
        await axios.post("http://13.49.21.183/api/comment", comment);
    }catch(e){
        throw new Error('Failed to post comment')
    }
}