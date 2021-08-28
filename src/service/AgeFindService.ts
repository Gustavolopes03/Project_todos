import { User } from "typeorm/entities/Users";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

class AgeFindService {
   
public execute(): User[] {

    const mage: User[] = []

    const usersRepository = new UsersRepository();

    const users = usersRepository.findAll();


    var data = new Date();
    var diaAtual = String(data.getDate()).padStart(2, '0');
    var mesAtual = String(data.getMonth() + 1).padStart(2, '0');
    var anoAtual = data.getFullYear();
    var dataAtual = diaAtual + '/' + mesAtual + '/' + anoAtual;

    users.forEach(user => {
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

export default AgeFindService