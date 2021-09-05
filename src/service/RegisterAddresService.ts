import { User } from "typeorm/entities/Users";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";


interface UserAddr {
    user: User,
    street: string,
    number: number,
    district: string,
    city: string,
    state: string,
}

class RegisterAddrService {

    execute({ user,street, number, district, city, state }:UserAddr):User {

        const usersRepository = new UsersRepository()

        const regAddr = usersRepository.AddressUpdate({ user, street, number, district, city, state });

        return user

        
    }
    
}

export default RegisterAddrService