import { Request, Response } from "express";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { CreateUserService } from "../service/CreateUsersService"
import AgeFindService from "../service/AgeFindService";
import OrderService from "../service/OrderService";
import RegisterAddrService from "../service/RegisterAddresService";
import RegisterTodosService from "../service/RegisterTodosService"


const usersRepository = new UsersRepository();

export default class UsersController {
    
    //Criar Usuário \/ 
    public async create(request: Request, response: Response) {

        const { name, email, birthDate, cpf } = request.body;
        
        const createUserService = new CreateUserService();

        const user = createUserService.execute({name, email, birthDate, cpf});

        console.log(user)

        response.status(201).json(user)
    }

    //Procurar Cpf especifico de Usuário \/
    public async search(request: Request, response: Response) {

        const { user } = request.user;

        return response.status(200).json(user);

    }

    //Procurar Usuários Maiores de 18 \/
    public async agefind(request: Request, response: Response) {

        const ageFindService = new AgeFindService();

        const users = ageFindService.execute();

        return response.status(200).json(users);
    }

    //Ordenar usuários em ordem Afabética \/
    public async order(request: Request, response: Response) {
        const { organize } = request.headers;

        const orderService = new OrderService();

        const userAux = orderService.execute(String(organize));

        return response.status(200).json(userAux)

    }

    //Valida se o cpf está no banco de dados e registra um Endereço ao usuário \/
    public async regAddr(request: Request, response: Response) {

            const { user } = request.user;

            const { street, number, district, city, state } = request.body;

            const registerAddresService = new RegisterAddrService()

            const userAux = registerAddresService.execute({ user, street, number, district, city, state });

            return response.status(200).json(userAux)

    }

    public async RegTodos(request: Request, response: Response) {

        const { user } = request.user;

        const { title, deadline, done } = request.body;

        const registertodosService = new RegisterTodosService()

        const userAux = registertodosService.execute({ user, title, deadline, done });

        return response.status(404).json(userAux);

    }
}



