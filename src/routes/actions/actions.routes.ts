import { Router } from "express";
import { ActionsController } from "../../controller/actions/actions.controller";
import { ActionRepository } from "../../repositories/actions/actions.repository";
import { ActionService } from "../../services/actions/actions.service";
import { AuthMiddleware } from "../../middlewares/auth/is-auth.middleware";

export class ActionsRoutes {
    static get routes(): Router {

        const repository = new ActionRepository();
        const service = new ActionService(repository);
        const controller = new ActionsController(service);

        const router = Router();

        router.post("/add/favorite/property", [AuthMiddleware.verify], controller.addPropertyFavorite)

        return router;
    }
}