import { Router } from "express";
import { UsersRepository } from "typeorm/repositories/UsersRepository";
import UsersController from "./controllers/UsersController";
import checksExistsUser from "./middlewares/checksExistsUser";


const routes = Router();
const userController = new UsersController();

routes.post("/userCreat", userController.create);
routes.get("/userFind", checksExistsUser, userController.search);
routes.get("/agefind", userController.agefind);
routes.get ("/order",userController.order);
routes.post("/regAddr",userController.regAddr)
routes.post("/RegTodos",userController.RegTodos);

export { routes };