import { Address } from "cluster";
import { request, Request, response, Response } from "express";
import { stringify, v4 as uuid } from "uuid";

interface iuser {
    id: string,
    name: string,
    birthDate: Date,
    email: string,
    //password: string,
    cpf: number,
    address?: {
        street: string,
        number: number,
        district: string,
        city: string,
        state: string,
    }
    todos?: {
        id: string,
        title: string,
        deadline: string,
        done: boolean,
        created_at: Date,
    }

}
const users: iuser[] = [];

export default class UsersController {
//Criar Usuário \/ 
    public async create(request: Request, response: Response) {

        const { name, email, birthDate, cpf } = request.body;

        const userFindall = users.find((user: any) => {
            return user.name === name,
                user.email === email,
                user.birthDate === birthDate,
                user.cpf === cpf
        });

        const fuser = users.find((user: any) => {
            return user.cpf === cpf
        });

        if (fuser) {
            return response.status(200).json(fuser)
        }


        const user: iuser = {
            id: uuid(),
            name,
            email,
            birthDate: birthDate,
            cpf
        }
        users.push(user);
        response.status(201).json(users)
    }
//Procurar Cpf especifico de Usuário \/
    public async search(request: Request, response: Response) {

        const { cpf } = request.headers;

        if (cpf) {
            const fuser = users.find((user: any) => {
                return user.cpf == cpf
            });
            return response.status(200).json(fuser)
        }
        return response.status(200).json(users);

    }
//Procurar Usuários Maiores de 18 \/
    public async agefind(request: Request, response: Response) {
        const mage: any[] = []
        const Userage: any[] = []

        var data = new Date();
        var diaAtual = String(data.getDate()).padStart(2, '0');
        var mesAtual = String(data.getMonth() + 1).padStart(2, '0');
        var anoAtual = data.getFullYear();
        var dataAtual = diaAtual + '/' + mesAtual + '/' + anoAtual;

        users.forEach(user => {
            const fullDate = String(user.birthDate);
            var fsplit = fullDate.split('/');

            var userday = fsplit.slice(0, 1)
            var nUday = Number(userday)
            var nAday = Number(diaAtual)

            var usermonth = fsplit.slice(1, 2)
            var nUmonth = Number(usermonth)
            var nAmonth = Number(mesAtual)

            var uyear = fsplit.slice(2, 3)
            var nUyear = Number(uyear)
            var nAyear = Number(anoAtual)
            var ry = nAyear - nUyear

            if (nAmonth < nUmonth || nAmonth == nUmonth && nAday < nUday) {
                ry--;
            }
            if (ry >= 18) {
                mage.push(user)
            }
        });

        return response.status(200).json(mage);
    }
//Ordenar usuários em ordem Afabética \/
    public async order(request: Request, response: Response) {
        const { organize } = request.headers;
        let userAux: iuser[] = []

        if (organize === "desc") {
            userAux = users.sort((a, b) => {
                if (a.name.toUpperCase < b.name.toUpperCase) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                return 0;
            });
        } else {
            userAux = bubbleSort(users)
        }

        return response.status(200).json(userAux)

    }
//Valida se o cpf está no banco de dados e registra um Endereço ao usuário \/
    public async regAddr(request: Request, response: Response) {

        const { cpf } = request.headers;

        console.log(cpf);
        if (cpf) {
            const fuser = users.find((user: any) => {
                console.log(user)
                return user.cpf === Number(cpf)
            });
            if (!fuser) {
                return response.status(404).json({ message:"Usuario não existe"});
            }

            const { street, number, district, city, state } = request.body;

            fuser.address = {
                street,
                number,
                district,
                city,
                state
            }

            return response.status(200).json(fuser)
        }
        return response.status(404).json({ message:"Cpf não preechido"});

    }
}
//BubbleSort utilizado em order \/
function bubbleSort(a: iuser[]) {
    for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < a.length; j++) {
            if (a[i].name.toUpperCase < a[j].name.toUpperCase) {
                var temp = a[i].name;
                a[i].name = a[j].name;
                a[j].name = temp;
            }
        }
    }

    return a;
}

