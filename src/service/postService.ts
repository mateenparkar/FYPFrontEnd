import axios from "axios";
import FormData from 'form-data';
import { Posts } from "../model/post";
const fs = require('fs');

interface PostWithDate extends Posts {
    formattedPublishedDate: string;
}

export const getPosts = async function (): Promise<PostWithDate[]> {
    try{

        const response = await axios.get('http://13.49.21.183:8080/api/getPosts');
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


export const addPost = async function(postData: Posts) {
    try {
        const formData = new FormData();
        formData.append('user_id', postData.user_id.toString());
        formData.append('title', postData.title);
        formData.append('content', postData.content);
        formData.append('date_posted', postData.date_posted.toISOString().split('T')[0]);
        formData.append('post_image_url', postData.post_image_url);

        await axios.post('http://13.49.21.183:8080/api/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });


    } catch (error) {
        console.log(error)
        throw new Error('Could not add post');
    }
}
