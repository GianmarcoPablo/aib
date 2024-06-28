import { prisma } from '../../model/connect';
import { CustomError } from '../../errors/custom.error';
import { FavoritePropertyDto } from '../../dtos/actions/favorite-property.dto';

export class ActionRepository {

    async toogleFavorite(data: FavoritePropertyDto) {
        try {
            const exists = await prisma.favorite.findUnique({ where: { userId_propertyId: { userId: data.userId, propertyId: data.propertyId } } })

            if (exists) {
                await prisma.favorite.delete({ where: { userId_propertyId: { userId: data.userId, propertyId: data.propertyId } } })
            } else {
                await prisma.favorite.create({ data: { userId: data.userId, propertyId: data.propertyId } })
            }

            return {
                ok: true
            }
        } catch (error) {
            this.handleError(error);
        }
    }


    private handleError(error: any) {
        if (error instanceof CustomError) {
            throw error;
        }
        throw CustomError.internalServerError();
    }
}
