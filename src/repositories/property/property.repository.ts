import { prisma } from '../../model/connect';
import { CustomError } from '../../errors/custom.error';
import { CreatePropertyDto } from '../../dtos/property/create-property.dto';
import { UpdatePropertyDto } from '../../dtos/property/update-property.do';

export class PropertyRepository {

    async createProperty(dataProperty: CreatePropertyDto, userId: number, images: { url: string }[]) {

        try {
            if (Number(dataProperty.ownerId) !== userId) throw CustomError.conflict("Ocurrio un conflicto");

            const property = await prisma.property.create({
                data: {
                    ...dataProperty,
                    price: Number(dataProperty.price),
                    ownerId: Number(dataProperty.ownerId),
                    images: { create: images }
                },
                include: { images: true }
            });

            return {
                ok: true,
                property
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    async updateProperty(id: number, userId: number, dataProperty: UpdatePropertyDto, images: { url: string }[]) {
        try {
            // Verificar que la propiedad exista y que el usuario tenga autorización para actualizarla
            const property = await prisma.property.findUnique({
                where: { id },
                include: { images: true }
            });

            if (!property) throw CustomError.notFound("Property not found");
            if (property.ownerId !== userId) throw CustomError.unauthorized("You are not authorized to update this property");

            // Actualizar la propiedad
            const updatedProperty = await prisma.property.update({
                where: { id },
                data: {
                    ...dataProperty,
                    price: Number(dataProperty.price),
                    images: {
                        deleteMany: {}, // Eliminar todas las imágenes actuales
                        create: images // Crear las nuevas imágenes
                    }
                },
                include: { images: true }
            });

            return {
                ok: true,
                property: updatedProperty
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    async getAllProperties(offset: number, limit: number) {
        try {
            const properties = await prisma.property.findMany({
                skip: offset,
                take: limit,
                include: { images: true }
            })

            return {
                ok: true,
                properties
            }
        } catch (error) {
            this.handleError(error);
        }
    }


    async getMyProperties(id: number) {
        try {
            const properties = await prisma.property.findMany({
                where: {
                    ownerId: id
                },
                include: { images: true }
            })

            return {
                ok: true,
                properties
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    async getProperty(id: number) {
        try {
            const property = await prisma.property.findUnique({
                where: {
                    id
                },
                include: { images: true }
            })

            if (!property) throw CustomError.notFound("Property not found");

            return {
                ok: true,
                property
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    async deleteProperty(id: number, userId: number) {
        try {
            const property = await this.getProperty(id);

            if (Number(property?.property.ownerId) !== userId) throw CustomError.unauthorized("You are not authorized to delete this property");

        } catch (error) {
            this.handleError(error);
        }
    }

    async getMyFavoritesProperties(id: number) {
        try {
            const properties = await prisma.property.findMany({
                where: {
                    favorites: {
                        some: {
                            userId: id
                        }
                    }
                },
                include: { images: true }
            })

            return properties
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
