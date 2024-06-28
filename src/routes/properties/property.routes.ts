import { Router } from "express";
import { PropertyController } from "../../controller/property/property.controller";
import { PropertyRepository } from "../../repositories/property/property.repository";
import { PropertyService } from "../../services/property/property.service";
import { AuthMiddleware } from "../../middlewares/auth/is-auth.middleware";
import multer from "multer";
import crypto from "crypto"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/property'); // La carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length);
        cb(null, `${crypto.randomBytes(4).toString("hex")}${extension}`);
    }
});

const upload = multer({ storage });



export class PropertyRoutes {
    static get routes(): Router {
        const router = Router();
        const repository = new PropertyRepository();
        const service = new PropertyService(repository);
        const controller = new PropertyController(service);

        router.get("/", controller.getAllProperties);
        router.get("/one/:id", controller.getProperty);
        router.get("/my/properties", [AuthMiddleware.verify], controller.getMyProperties);
        router.post("/create", upload.array('images', 10), [AuthMiddleware.verify], controller.createProperty);
        router.put("/update/:id", upload.array('images', 10), [AuthMiddleware.verify], controller.updateProperty);
        router.delete("/delete/:id", [AuthMiddleware.verify], controller.deleteProperty);
        router.get("my/favorites", [AuthMiddleware.verify], controller.getMyFavoritesProperties);
        return router;
    }
}
