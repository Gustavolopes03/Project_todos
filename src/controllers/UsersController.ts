import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { CreateUserService } from "../service/CreateUsersService"

interface itodos{
    id: string,
    title: string,
    deadline: string,
    done: boolean,
    created_at: any,
}
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
    todos: itodos[]

}
const users: iuser[] = [];
const usersRepository = new UsersRepository();
const createUserService = new CreateUserService();

export default class UsersController {
    //Criar Usuário \/ 
    public async create(request: Request, response: Response) {

        const { name, email, birthDate, cpf } = request.body;

        const user = createUserService.execute({name, email, birthDate, cpf});

        response.status(201).json(user)
    }
    //Procurar Cpf especifico de Usuário \/
    public async search(request: Request, response: Response) {
        const { user } = request.user;

        if (!user) {
            return response.status(200).send("User not found!")
        }

        return response.status(200).json(user);

    }
    //Procurar Usuários Maiores de 18 \/
    public async agefind(request: Request, response: Response) {
        const mage: any[] = []

        usersRepository.agefind(mage);
        console.log(mage)

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
                return response.status(404).json({ message: "Usuario não existe" });
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
        return response.status(404).json({ message: "Cpf não preechido" });

    }

    public async RegTodos(request: Request, response: Response) {

        const { cpf } = request.headers;
        let usertodos: any;

        console.log(cpf);
        if (cpf) {
            const fuser = users.find((user: any) => {
                console.log(user)
                return user.cpf === (cpf)
            });
            if (!fuser) {
                return response.status(404).json({ message: "Usuario não existe" });
            }

            const { title, deadline, done } = request.body;

            const todos = {
                id: uuid(),
                title,
                deadline,
                done,
                created_at: new Date()
            }
            fuser.todos.push(todos);
            console.log(request.body)

            return response.status(200).json(fuser)
        }
        return response.status(404).json({ message: "Cpf não preechido" });

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



