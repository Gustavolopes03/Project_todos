import { uuid } from "uuidv4";


class User { 
    id?: string;
    name: string;
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
    todos?: {
        idtodos?: string,
        title: string,
        deadline: string,
        done: boolean,
        created_at?: any,
    }



    constructor() {
        if(!this.id){
            this.id = uuid()
        }
    }

}


export { User }