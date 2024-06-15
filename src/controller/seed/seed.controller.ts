import { Request, Response } from "express";
import { CustomError } from "../../errors/custom.error";
import { prisma } from "../../model/connect";

export class SeedController {

    public seedExecute = async (req: Request, res: Response) => {
        try {
            await prisma.user.deleteMany()

            res.json({
                msg: "Seed executing"
            })
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