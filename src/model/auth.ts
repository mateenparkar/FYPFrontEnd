export type Credentials = {
    username: string;
    password: string;
}


export type User = {
    username: string;
    email: string;
    password:string;
}

export type ActiveSession = {
    token:string;
    username:string;
}