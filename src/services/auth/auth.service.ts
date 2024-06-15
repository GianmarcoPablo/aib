import { UserRepository } from "../../repositories/auth/auth.repository";
import { AuthRegisterUserDto } from "../../dtos/auth/auth-register.dto";
import { UserResponse } from "../../types/user-response.type";
import { AuthLoginUserDto } from "../../dtos/auth/auth-login.dto";

export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async createUser(data: AuthRegisterUserDto) {
        return await this.userRepository.createUser(data)
    }

    async loginUser(data: AuthLoginUserDto) {
        return await this.userRepository.loginUser(data)
    }
}