import { Router } from "express";
import { UserController } from "../../controller/auth/auth.controller";
import { UserService } from "../../services/auth/auth.service";
import { UserRepository } from "../../repositories/auth/auth.repository";


export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const repository = new UserRepository()
        const service = new UserService(repository)
        const controller = new UserController(service);

        router.post("/login", controller.login)
        router.post("/register", controller.register)


        return router;
    }
}