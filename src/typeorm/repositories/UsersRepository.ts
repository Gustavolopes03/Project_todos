import { User } from "../entities/Users";
import fs from 'fs';
import { uuid } from "uuidv4";


interface todos {
    id: string,
    title: string,
    deadline: string,
    done: boolean,
    created_at: any,
}

interface CreatUser {
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
    todos?: todos[]
}

interface UserAddr {
    user: User,
    street: string,
    number: number,
    district: string,
    city: string,
    state: string,
}

interface UserTodos {
    user:User
    idtodos?: string,
    title: string,
    deadline: string,
    done: boolean,
    created_at?: any,
}

class UsersRepository {
    private users: User[]
    
    constructor() {
        this.users = [];
        const data = fs.readFileSync('db.json',
            { encoding: 'utf8', flag: 'r' });


        this.users = JSON.parse(data);
    }
    
    findAll(): User[] {
        return this.users;
    }
    create({ name, email, birthDate, cpf }: CreatUser): User {

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
    

    AddressUpdate({ user,street, number, district, city, state }:UserAddr):any{

        const index = this.users.findIndex(function(a){
            return a.id === user.id
        });
        
        if(index >=0){ 

            this.users.splice(index,1)

        }
        
        user.address = {

            street,
            number, 
            district,
            city, 
            state

        }

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

    TodosUpdate({ user, title, deadline, done }:UserTodos):any{

        const index = this.users.findIndex(function(a){
            return a.id === user.id
        });
           
        if(index >=0){ 

            this.users.splice(index,1)

        }
        
        user.todos = {
            
            idtodos: uuid(),
            title, 
            deadline,
            done, 
            created_at : new Date

        }

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
    
}
export { UsersRepository }