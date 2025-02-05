import type {Credentials, User} from "../model/auth";
import axios, { Axios } from 'axios';
import type { AxiosError } from "axios";


export const login = async function(credentials:Credentials):Promise<string> {
    try{
        const response = await axios.post("http://13.49.21.183/api/login", credentials);
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
        await axios.post("http://13.49.21.183/api/register", user);
    } catch (e) {
        const axiosError = e as AxiosError;
        if (axiosError.response?.data) {
            throw new Error(axiosError.response.data as string);
        } else {
            throw new Error('Failed to register');
        }
    }
}

export const whoami = async function(token: string): Promise<User> {
    try {
        const response = await axios.get("http://13.49.21.183/api/whoami", {
            headers: { Authorization: `Bearer ${token}` },
        })
        if (response.status === 200) {
            return response.data as User
        }
    } catch (e) {
        if ((e as AxiosError).response?.status === 401) {
            throw new Error("User isn't logged in")
        }
    }
    throw new Error("Couldn't get user")
}