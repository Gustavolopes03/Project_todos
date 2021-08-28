import { User } from "../entities/Users";
import fs from 'fs';
import { Address } from "cluster";

interface itodosDTO {
    id: string,
    title: string,
    deadline: string,
    done: boolean,
    created_at: any,
}
interface iuserDTO {
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
    todos?: itodosDTO[]
}

interface tese {
    user: User,
        street: string,
        number: number,
        district: string,
        city: string,
        state: string,
}

class UsersRepository {
    private users: User[]
    
    constructor() {
        this.users = [];
        const data = fs.readFileSync('db.json',
            { encoding: 'utf8', flag: 'r' });


        this.users = JSON.parse(data);
    }
    
    create({ name, email, birthDate, cpf }: iuserDTO): User {

        const user = new User()

        Object.assign(user, {
            name,
            email,
            birthDate: birthDate,
            cpf,
            todos: []
        })

        this.users.push(user)

        fs.writeFile("db.json", JSON.stringify(this.users), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });

        return user;
    }

    search(cpf: string): User | undefined {

        return this.users.find((user: any) => {
            return user.cpf == cpf
        });

    }
    findAll(): User[] {
        return this.users;
    }


    RegAddr({ street, number, district, city, state }: iuserDTO):User {

        Object.assign(tese = {
            user
            street,
            number,
            district,
            city,
            state
        })

        this.user.push(address)

        fs.writeFile("db.json", JSON.stringify(this.user), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });

        return user;
    }

    
}
export { UsersRepository }