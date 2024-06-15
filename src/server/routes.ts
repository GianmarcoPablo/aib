import { Router } from "express";
import { UserRoutes } from "../routes/auth/auth.routes";
import { SeedRoutes } from "../routes/seed/seed.routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/v1/auth", UserRoutes.routes)
        router.use("/api/v1/seed", SeedRoutes.routes)
        return router;
    }
}   