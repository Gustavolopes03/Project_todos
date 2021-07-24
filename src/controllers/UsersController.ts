import { Request,Response } from "express";
import { Any } from "typeorm";
import { v4 as uuid } from "uuid";

var fs = require('fs');

interface iuser {
    id: string,
    name: string,
    birthDate: Date,
    email: string,
    password: string,
    cpf: number,
    address: {
        street:string,
        number:number,
        district:string,
        city:string,
        state:string,
    }
    todos:{
        id:string,
        title:string,
        deadline:string,
        done:boolean,
        created_at:Date,
    }
    

}
const users = <any>[]

export default class UsersController{
    public async create(request: Request, response: Response){
        
        const { name,email,birthDate,cpf } = request.body;

        const fuser = users.find((user:any)=>{
            return user.cpf === cpf
        });

        if (fuser){
            return response.status(200).json(fuser)
        } 
            

        const user =  {
            id:uuid(),
            name,
            email,
            birthDate,
            cpf,
            address: {},
            todos: []
        }
        users.push(user);
        response.status(201).json(users)
    }

    public async search(request:Request ,response: Response){

        const {cpf} = request.headers;

        if (cpf){
        const fuser = users.find((user:any)=>{
            return user.cpf == cpf
        });        
            return response.status(200).json(fuser)
        }
        return response.status(200).json(users);

    }
    public async af(request:Request ,response:Response){
        var tage = Date;
        var data = new Date();
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        var dataAtual = dia + '/' + mes + '/' + ano;
        console.log(dataAtual);
        //const age = users.find((user:any)=>{
          
        //   console.log(tage = user.birthDate-getDay / data)
        //})

    }

}

function newDate() {
    throw new Error("Function not implemented.");
}
