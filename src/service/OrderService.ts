import { User } from "typeorm/entities/Users";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";


class OrderService {
   
    public execute(organize:string): any {
        const usersRepository = new UsersRepository();

        const users = usersRepository.findAll();

        let userAux: any[] = []

        if (organize === "desc") {
            userAux = users.sort((a, b) => {
                if (a.name.toUpperCase() < b.name.toUpperCase()) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                return 0;
            });
        } else {
            userAux = bubbleSort(users)
        }

        return userAux
    }
    


}
function bubbleSort(a: User[]) {
    for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < a.length; j++) {
            if (a[i].name.toUpperCase() < a[j].name.toUpperCase()) {
                var temp = a[i].name;
                a[i].name = a[j].name;
                a[j].name = temp;
            }
        }
    }

    return a;

}

export default OrderService