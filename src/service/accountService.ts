import { Update } from "../model/auth";
import axios, { AxiosError } from "axios";

export const updatePassword = async function(update:Update): Promise<void>{
    try{
        await axios.put('http://13.49.21.183/api/account', update);
    }catch(e){
        if((e as AxiosError).response?.status === 400){
            throw new Error('Failed to like book');
        }
    }
}