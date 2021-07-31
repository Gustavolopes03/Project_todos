import { Router } from "express";
import UsersController from "./controllers/UsersController";


const routes = Router();
const userController = new UsersController();

routes.post("/users", userController.create);
routes.get("/users", userController.search);
routes.get("/agefind", userController.agefind);
routes.get ("/order",userController.order)

export { routes };