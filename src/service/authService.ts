import type {Credentials, User} from "../model/auth";
import axios, { Axios } from 'axios';
import type { AxiosError } from "axios";


export const login = async function(credentials:Credentials):Promise<string> {
    try{
        const response = await axios.post("http://localhost:8080/api/login", credentials);
        return response.data.token;
    }catch(e){
        if((e as AxiosError).response?.status === 401){
            throw new Error("Invalid credentials");
        }else if ((e as AxiosError).response?.status === 500){
            throw new Error("Server error");
    }
    throw new Error("Could not login");
}
}


export const register = async function(user: User): Promise<void> {

    try {
        await axios.post("http://localhost:8080/api/register", user);
    } catch (e) {
        throw new Error('Failed to register');
    }
}