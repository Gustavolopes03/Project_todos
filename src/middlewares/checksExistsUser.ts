import { NextFunction,Request,Response } from "express";
import { User } from "../typeorm/entities/Users";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";


export default function checksExistsUser(request:Request, response:Response, next:NextFunction):void {  
    const { cpf } = request.headers;

    try {

        const findUserRepository = new UsersRepository();

        if(!cpf){
            throw new Error("Unfilled Cpf");
            
        }

        const user = findUserRepository.search(String(cpf));

        if(!user){
            throw new Error("User not found");
        }

        request.user = {
            user
        }

        return next()
    } catch {
        throw new Error ("Bad Request")
    }
}