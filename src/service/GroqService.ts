import axios from "axios";


export const generateQuestions = async function(bookName:string): Promise<string[]> {
    try {
        const response = await axios.post(`http://13.49.21.183/api/groq/${bookName}`);
        return response.data;
    } catch (error) {
        throw new Error('Could not get questions');
    }
}