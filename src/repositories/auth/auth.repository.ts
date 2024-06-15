import { prisma } from '../../model/connect';
import { HashPasswordAdapter } from '../../adapter/bcrypt.adapter';
import { CustomError } from '../../errors/custom.error';
import { AuthRegisterUserDto } from '../../dtos/auth/auth-register.dto';
import { AuthLoginUserDto } from '../../dtos/auth/auth-login.dto';
import { TokenAdapter } from '../../adapter/token.adapter';

export class UserRepository {

    async createUser(data: AuthRegisterUserDto) {
        try {
            const { password, email } = data;
            const hashPassword = HashPasswordAdapter.hashPaassword(password);
            const existsUser = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            if (existsUser) throw CustomError.badRequest("User already exists");

            const user = await prisma.user.create({
                data: {
                    ...data,
                    password: hashPassword
                }
            });
            const token = TokenAdapter.generateToken(user.id)
            const { password: passwordPass, updatedAt, createdAt, ...rest } = user
            return {
                user: rest,
                token
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServerError();
        }
    }

    async loginUser(data: AuthLoginUserDto) {
        try {
            const { email, password } = data;
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            if (!user) throw CustomError.badRequest("User not found");
            const token = TokenAdapter.generateToken(user.id)
            if (HashPasswordAdapter.comparePassword(password, user.password)) {
                const { password, updatedAt, createdAt, ...rest } = user
                return {
                    user: rest,
                    token
                };
            } else {
                throw CustomError.unauthorized("Invalid credentials");
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServerError();
        }
    }
}
