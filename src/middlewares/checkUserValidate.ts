import { Request, NextFunction, Response } from "express";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";


const checkUserValidate = ( requestSchema:OptionalObjectSchema <ObjectShape> ) => 
    async (request:Request,response:Response,next:NextFunction) => {
        const { name, email, birthDate, cpf } = request.body;
        try {
            await requestSchema.validate
            ({
                name, email, birthDate, cpf 
            })
            
            return next()

        }
        catch {
            return response.send("Validation error")
            
            
        }
    }


export default checkUserValidate