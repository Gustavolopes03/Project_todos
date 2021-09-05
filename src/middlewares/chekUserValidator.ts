import * as Yup from 'yup';


const requestSchema = Yup.object({
    name:Yup.string().required(), 
    email:Yup.string().email().required(),
    birthDate:Yup.string().required() , 
    cpf:Yup.string().length(9).required()
    

});


export default requestSchema