import { Request, Response } from "express";
import { CustomError } from "../../errors/custom.error";
import { ProfileService } from "../../services/profile/profile.service";
import { CreateProfilerDto } from "../../dtos/profile/profile-create.dto";
import { UpdateProfileDto } from "../../dtos/profile/update-profile.dto";
export class ProfileController {

    constructor(
        private readonly profileService: ProfileService
    ) { }

    public createProfile = async (req: Request, res: Response) => {
        try {
            const avatarUrl = req.file ? `${req.file.filename}` : null;
            const profileData = { ...req.body, avatarUrl, userId: req.body.user.id };
            const [error, createProfileDto] = CreateProfilerDto.create(profileData);
            if (error) return res.status(404).json({ error });
            const profile = await this.profileService.createProfile(createProfileDto!);
            res.json(profile);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public getMyProfile = async (req: Request, res: Response) => {
        try {
            const idUser = req.body.user.id
            if (!idUser) return res.json("No user id")
            const profile = await this.profileService.getMyProfile(idUser)
            res.json(profile)
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public updateProfile = async (req: Request, res: Response) => {
        try {
            const profileId = Number(req.params.id)
            const userId = req.body.user.id
            const avatarUrl = req.file ? `${req.file.filename}` : null;
            const profileData = { ...req.body, avatarUrl };
            const [error, createProfileDto] = UpdateProfileDto.create(profileData);
            if (error) return res.status(404).json({ error });
            const profile = await this.profileService.updateProfile(createProfileDto!, profileId, userId);
            res.status(201).json(profile);
        } catch (error) {
            this.handleError(error, res);
        }
    }


    private handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.log(error) // Winston, Console, etc
        return res.status(500).json({ error: "Internal Server Error" })
    }
}