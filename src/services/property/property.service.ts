import { CreatePropertyDto } from "../../dtos/property/create-property.dto";
import { UpdatePropertyDto } from "../../dtos/property/update-property.do";
import { PropertyRepository } from "../../repositories/property/property.repository";

export class PropertyService {
    constructor(
        private readonly propertyRepository: PropertyRepository
    ) { }

    async createProperty(dataProperty: CreatePropertyDto, userId: number, images: { url: string }[]) {
        return await this.propertyRepository.createProperty(dataProperty, userId, images);
    }

    async getAllProperties() {
        return await this.propertyRepository.getAllProperties();
    }

    async getMyProperties(id: number) {
        return await this.propertyRepository.getMyProperties(id);
    }

    async getProperty(id: number) {
        return await this.propertyRepository.getProperty(id);
    }

    async updateProperty(id: number, userId: number, dataProperty: UpdatePropertyDto) {
        return await this.propertyRepository.updateProperty(id, userId, dataProperty);
    }

    async deleteProperty(id: number, userId: number) {
        return await this.propertyRepository.deleteProperty(id, userId);
    }


    async getMyFavoritesProperties(id: number) {
        return await this.propertyRepository.getMyFavoritesProperties(id);
    }
}