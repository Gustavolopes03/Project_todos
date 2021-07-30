import { strict } from "assert/strict";
import { Request,Response } from "express";
import { read } from "fs";
import { addListener } from "process";
import { Any } from "typeorm";
import { stringify, v4 as uuid } from "uuid";

interface iuser {
    id: string,
    name: string,
    birthDate: Date,
    age?: number,
    email: string,
    //password: string,
    cpf: number,
    address?: {
       street:string,
       number:number,
       district:string,
       city:string,
       state:string,
    }
    todos?:{
       id:string,
       title:string,
       deadline:string,
       done:boolean,
       created_at:Date,
    }
    

}
const users: iuser[] = [];

export default class UsersController{
    public async create(request: Request, response: Response){
        
        const { name,email,birthDate,cpf } = request.body;

        const userFindall = users.find((user:any)=> {
            return user.name === name,
            user.email === email,
            user.birthDate === birthDate,
            user.cpf === cpf
        });

        const fuser = users.find((user:any)=>{
            return user.cpf === cpf
        });

        if (fuser){
            return response.status(200).json(fuser)
        } 
            

        const user:iuser =  {
            id:uuid(),
            name,
            email,
            birthDate: birthDate,
            cpf
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
        const mage: any[] = []

        var data = new Date();
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        var dataAtual = dia + '/' + mes + '/' + ano;

        users.forEach(user => {
            const fullDate = String(user.birthDate);
            var fsplit =fullDate.split('/');

            var uday = fsplit.slice(0,1)
            var ncdu = Number(uday)
            var ncdc = Number(dia)
            //var rd= ncdc - ncdu

            var umonth = fsplit.slice(1,2)
            var ncmu = Number(umonth)
            var ncmc = Number(mes)
            //var rm= ncmc - ncmu
            
            var uyear = fsplit.slice(2,3)
            var ncyu = Number(uyear)
            var ncyc = Number(ano)
            var ry = ncyc - ncyu

            if (ncmc < ncmu || ncmc == ncmu && ncdc < ncdu ) {
                ry--;
            }
            
            user.age = ry

            if(user.age >= 18){
                mage.push(user)
                return response.status(200).json(mage);
            }
        });
        return response.status(200).json();
    }

}

function newDate() {
    throw new Error("Function not implemented.");
}
function splitString(udate: Date) {
    throw new Error("Function not implemented.");
}

