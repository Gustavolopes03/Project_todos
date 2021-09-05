import { User } from "typeorm/entities/Users";
import { UsersRepository } from "../typeorm/repositories/UsersRepository"


interface UserTodos {
    user:User
    idtodos?: string,
    title: string,
    deadline: string,
    done: boolean,
    created_at?: any,
}

class RegisterTodosService {

    execute({ user, title, deadline, done }:UserTodos):User {

        const usersRepository = new UsersRepository()

        const regAddr = usersRepository.TodosUpdate({ user, title, deadline, done });

        return user
        
    }
    
}

export default RegisterTodosService