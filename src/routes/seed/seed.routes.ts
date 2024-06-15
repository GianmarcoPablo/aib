import { Router } from "express";
import { SeedController } from "../../controller/seed/seed.controller";


export class SeedRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new SeedController()
        router.post("/execute", controller.seedExecute)

        return router;
    }
}