
import { UsersRepository } from "../typeorm/repositories/UsersRepository"


interface Request {
    name: string,
    birthDate: Date,
    email: string,
    password?: string,
    cpf: number,
    address?: {
        street: string,
        number: number,
        district: string,
        city: string,
        state: string,
    }
    todos?: Request[]

}

        const usersRepository = new UsersRepository();
class CreateUserService {
    public execute({ name, email, birthDate, cpf }:Request) {      

        const user = usersRepository.create({name, email, birthDate, cpf});

        return user

    }
}


export { CreateUserService }