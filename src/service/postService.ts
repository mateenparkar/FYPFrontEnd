import axios from "axios";
import { Posts } from "../model/post";

interface PostWithDate extends Posts {
    formattedPublishedDate: string;
}

export const getPosts = async function (): Promise<PostWithDate[]> {
    try{

        const response = await axios.get('http://localhost:8080/api/getPosts');
        const posts: Posts[] = response.data;
        const postsWithDate: Promise<PostWithDate>[] = posts.map(async(post:Posts) => {
            const formattedPublishedDate: string = new Date(post.date_posted)
                .toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' });
            const postWithDate: PostWithDate = { ...post, formattedPublishedDate };
            return postWithDate;
        });
        return Promise.all(postsWithDate);
    }catch(error){
        throw new Error('Could not get posts');
    }

}