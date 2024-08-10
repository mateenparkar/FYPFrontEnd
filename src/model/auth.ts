export type Credentials = {
    username: string;
    password: string;
}

export type Update = {
    userId:number;
    password:string;
}


export type User = {
    userId:number;
    username: string;
    email: string;
    password:string;
    name:string;
}

export type ActiveSession = {
    token:string;
    username:string;
}