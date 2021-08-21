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


class CreateUserService {
    public execute({ name, email, birthDate, cpf }:Request) {

        const usersRepository = new UsersRepository();

        if (cpf > 3 || cpf <3){
            throw console.error("Formato de Cpf Incorreto");         
        }


        //const user = usersRepository.create({name, email, birthDate, cpf});

    }
}

function TestaCPF(cpf) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

export { CreateUserService }