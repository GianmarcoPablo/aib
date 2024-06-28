import { Router } from "express";
import { UserRoutes } from "../routes/auth/auth.routes";
import { SeedRoutes } from "../routes/seed/seed.routes";
import { ProfileRoutes } from "../routes/profile/profile.routes";
import { PropertyRoutes } from "../routes/properties/property.routes";
import { ActionsRoutes } from "../routes/actions/actions.routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/v1/auth", UserRoutes.routes)
        router.use("/api/v1/seed", SeedRoutes.routes)
        router.use("/api/v1/profile", ProfileRoutes.routes)
        router.use("/api/v1/property", PropertyRoutes.routes)
        router.use("/api/v1/action", ActionsRoutes.routes)
        return router;
    }
}   