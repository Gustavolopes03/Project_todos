import { uuid } from "uuidv4";


class User {
    
    id?: string;
    name?: string;
    birthDate?: Date;
    email?: string;
    cpf?: string;
    address?: {
        street: string;
        number: number;
        district: string;
        city: string;
        state: string;
    }
    todos?: []

    constructor() {
        if(!this.id){
            this.id = uuid()
        }
    }

}


export { User }

class name {
    constructor() {
    }
}