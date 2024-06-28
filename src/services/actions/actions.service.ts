import { ActionRepository } from "../../repositories/actions/actions.repository";
import { FavoritePropertyDto } from "../../dtos/actions/favorite-property.dto";

export class ActionService {
    constructor(
        private readonly actionRepository: ActionRepository
    ) { }

    async addPropertyFavorite(data: FavoritePropertyDto) {
        return await this.actionRepository.toogleFavorite(data)
    }


}