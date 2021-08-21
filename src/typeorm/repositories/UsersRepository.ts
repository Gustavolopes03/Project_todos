import { User } from "../entities/Users";
import fs from 'fs';

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

class UsersRepository {
    private users: User[]
    
    constructor() {
        this.users = [];
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

        let users: User[] = [];
        const data = fs.readFileSync('db.json',
            { encoding: 'utf8', flag: 'r' });


        users = JSON.parse(data);

        return users.find((user: any) => {
            return user.cpf == cpf
        });
    }

    
    agefind(mage: any[] = []): any {


        var data = new Date();
        var diaAtual = String(data.getDate()).padStart(2, '0');
        var mesAtual = String(data.getMonth() + 1).padStart(2, '0');
        var anoAtual = data.getFullYear();
        var dataAtual = diaAtual + '/' + mesAtual + '/' + anoAtual;

        this.users.forEach(user => {
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
        return mage
    }

}
export { UsersRepository }