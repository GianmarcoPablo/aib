import { Request, Response } from "express";
import { CustomError } from "../../errors/custom.error";
import { ActionService } from "../../services/actions/actions.service";
import { FavoritePropertyDto } from "../../dtos/actions/favorite-property.dto";

export class ActionsController {
    constructor(
        private readonly actionService: ActionService
    ) { }


    public addPropertyFavorite = async (req: Request, res: Response) => {
        try {

            const [error, favoritePropertyDto] = FavoritePropertyDto.create(req.body)
            if (error) return res.status(404).json({ error })

            const property = await this.actionService.addPropertyFavorite(favoritePropertyDto!)
            res.json(property)

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