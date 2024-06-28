import { CreateProfilerDto } from "../../dtos/profile/profile-create.dto"
import { UpdateProfileDto } from "../../dtos/profile/update-profile.dto"
import { ProfileRepository } from "../../repositories/profile/profile.repository"

export class ProfileService {
    constructor(
        private readonly profileRepository: ProfileRepository
    ) { }

    async createProfile(data: CreateProfilerDto) {
        return await this.profileRepository.createProfile(data)
    }

    async updateProfile(data: UpdateProfileDto, profileId: number, userId: number) {
        return await this.profileRepository.updateProfile(data, profileId, userId)
    }

    async getMyProfile(id: number) {
        return await this.profileRepository.getMyProfile(id)
    }
}