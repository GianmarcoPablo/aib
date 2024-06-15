import { Request, Response } from "express";
import { UserService } from "../../services/auth/auth.service";
import { AuthRegisterUserDto } from "../../dtos/auth/auth-register.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthLoginUserDto } from "../../dtos/auth/auth-login.dto";

export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }


    public login = async (req: Request, res: Response) => {
        try {
            const [error, loginUserDto] = AuthLoginUserDto.create(req.body);
            if (error) return res.status(404).json({ error })
            const user = await this.userService.loginUser(loginUserDto!)
            res.status(201).json(user)
        } catch (error) {
            this.handleError(error, res)
        }

    }

    public register = async (req: Request, res: Response) => {
        try {
            const [error, registerUserDto] = AuthRegisterUserDto.create(req.body);
            if (error) return res.status(404).json({ error })
            const user = await this.userService.createUser(registerUserDto!)
            res.status(201).json(user)
        } catch (error) {
            this.handleError(error, res)
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