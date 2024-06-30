import { Request, Response } from "express";
import { CustomError } from "../../errors/custom.error";
import { PropertyService } from "../../services/property/property.service";
import { CreatePropertyDto } from "../../dtos/property/create-property.dto";
import { UpdatePropertyDto } from "../../dtos/property/update-property.do";
export class PropertyController {

    constructor(
        private readonly propertyService: PropertyService
    ) { }

    public createProperty = async (req: Request, res: Response) => {
        try {
            const userId = req.body.user.id;
            const [error, createProfileDto] = CreatePropertyDto.create({ ...req.body, ownerId: userId });
            if (error) return res.status(404).json({ error });

            const images = (req.files as any).map((file: any) => ({ url: file.filename }));
            const property = await this.propertyService.createProperty(createProfileDto!, userId, images);
            res.json(property);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public getAllProperties = async (req: Request, res: Response) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 5;
            const offset = (page - 1) * limit;
            console.log(offset, limit)
            const properties = await this.propertyService.getAllProperties(offset, limit);
            res.json(properties);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public getProperty = async (req: Request, res: Response) => {
        try {
            const propertyId = Number(req.params.id);
            const property = await this.propertyService.getProperty(propertyId);
            res.json(property);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public updateProperty = async (req: Request, res: Response) => {
        try {
            const userId = req.body.user.id
            const propertyId = Number(req.params.id);
            const [error, updatePropertyDto] = UpdatePropertyDto.create(req.body);
            if (error) return res.status(404).json({ error });
            const multipleImages = (req.files as any).map((file: any) => ({ url: file.filename }));
            const property = await this.propertyService.updateProperty(propertyId, userId, updatePropertyDto!, multipleImages);
            res.json(property);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public deleteProperty = async (req: Request, res: Response) => {
        try {
            const userId = req.body.user.id
            const propertyId = Number(req.params.id);
            const property = await this.propertyService.deleteProperty(propertyId, userId);
            res.json(property);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public getMyProperties = async (req: Request, res: Response) => {
        try {
            const id = req.body.user.id
            const properties = await this.propertyService.getMyProperties(id);
            res.json(properties);
        } catch (error) {
            this.handleError(error, res);
        }
    }

    public getMyFavoritesProperties = async (req: Request, res: Response) => {
        try {
            const id = req.body.user.id
            const properties = await this.propertyService.getMyFavoritesProperties(id);
            res.json(properties);
        } catch (error) {
            this.handleError(error, res);
        }
    }


    private handleError(error: any, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(error); // Winston, Console, etc
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
