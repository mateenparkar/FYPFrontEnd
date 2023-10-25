import { NextFunction, Request, Response } from "express";

export function login(req:Request, res:Response, next:NextFunction){
    if(req.session.token){
        next();    
}else{
    res.redirect('/login');
}
}

export function role(){
    return function(req:Request, res:Response, next:NextFunction){
        if(req.session){
            return next();
        }else{
            res.locals.errorMessage = 'You must be logged in to view this page';
        }
    }
}


export const user = (req:Request, res:Response, next:NextFunction) => {
    if(req.session && req.session.user){
        res.locals.user = req.session.user;
    }
    next();
}