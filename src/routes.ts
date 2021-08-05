import { Router } from "express";
import UsersController from "./controllers/UsersController";


const routes = Router();
const userController = new UsersController();

routes.post("/userCreat", userController.create);
routes.get("/userFind", userController.search);
routes.get("/agefind", userController.agefind);
routes.get ("/order",userController.order);
routes.post("/regAddr",userController.regAddr)

export { routes };