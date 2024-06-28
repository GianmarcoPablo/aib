import { prisma } from '../../model/connect';
import { CreateProfilerDto } from '../../dtos/profile/profile-create.dto';
import { CustomError } from '../../errors/custom.error';
import { UpdateProfileDto } from '../../dtos/profile/update-profile.dto';
export class ProfileRepository {

    async createProfile(data: CreateProfilerDto) {
        try {

            const existsProfile = await prisma.profile.findUnique({ where: { userId: data.userId } })

            if (existsProfile) throw CustomError.conflict("You already have profile created")

            const profile = await prisma.profile.create({ data: { ...data, userId: Number(data.userId) } });
            return {
                profile,
                ok: true
            };
        } catch (error) {
            this.handleError(error)
        }
    }

    async updateProfile(dataUpdate: UpdateProfileDto, profileId: number, userId: number) {

        console.log(dataUpdate)
        try {
            const profile = await prisma.profile.findUnique({ where: { userId: profileId } });
            if (profile?.userId !== userId) throw CustomError.unauthorized("you do not have permissions");

            // Converting dateOfBirth from string to Date
            const updatedData = {
                ...dataUpdate,
                dateOfBirth: new Date(dataUpdate.dateOfBirth!) // Converting to Date
            };

            const updateProfile = await prisma.profile.update({
                where: { userId: profileId },
                data: { ...updatedData }
            });

            return {
                updateProfile,
                ok: true
            };
        } catch (error) {
            console.log(error);
            this.handleError(error);
        }
    }

    async getMyProfile(id: number) {
        try {
            const profile = await prisma.profile.findUnique({ where: { userId: id } })
            if (!profile) throw CustomError.notFound("Not Profile")
            return { profile, ok: true };
        } catch (error) {
            this.handleError(error)
        }
    }


    private handleError(error: any) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw CustomError.internalServerError();
    }

}
