import { Router } from "express";
import multer from "multer";
import crypto from "crypto"
import { ProfileService } from "../../services/profile/profile.service";
import { ProfileRepository } from "../../repositories/profile/profile.repository";
import { ProfileController } from "../../controller/profile/profile.controller";
import { AuthMiddleware } from "../../middlewares/auth/is-auth.middleware";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/profile'); // La carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        console.log(file)
        const extension = file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length)
        cb(null, `${crypto.randomBytes(4).toString("hex")}${extension}`)
    }
});


const upload = multer({ storage });

export class ProfileRoutes {
    static get routes(): Router {
        const router = Router();
        const repository = new ProfileRepository()
        const service = new ProfileService(repository)
        const controller = new ProfileController(service)
        router.post("/create", upload.single('avatarUrl'), AuthMiddleware.verify, controller.createProfile);
        router.put("/update/:id", upload.single('avatarUrl'), AuthMiddleware.verify, controller.updateProfile);
        router.get("/my-profile", AuthMiddleware.verify, controller.getMyProfile)
        return router;
    }
}