import { Request, Response } from "express";
import { CustomError } from "../../errors/custom.error";
import { prisma } from "../../model/connect";
import bcrypt from "bcrypt";

export class SeedController {

    public seedExecute = async (req: Request, res: Response) => {
        try {
            // Eliminar datos existentes
            await prisma.image.deleteMany();
            await prisma.property.deleteMany();
            await prisma.profile.deleteMany();
            await prisma.user.deleteMany();

            // Crear usuario
            const user = await prisma.user.create({
                data: {
                    name: "admin",
                    email: "example@example.com",
                    password: await bcrypt.hash("123456", 10),
                    role: "ADMIN"
                }
            });

            // Crear propiedades
            const properties = await prisma.property.createMany({
                data: [
                    {
                        title: "Casa 1",
                        description: "Casa 1",
                        address: "Calle 1",
                        city: "Ciudad 1",
                        price: 1000,
                        state: "State 1",
                        zipCode: "ZipCode 1",
                        country: "Country 1",
                        type: "HOUSE",
                        ownerId: user.id
                    },
                    {
                        title: "Casa 2",
                        description: "Casa 2",
                        address: "Calle 2",
                        city: "Ciudad 2",
                        price: 2000,
                        state: "State 2",
                        zipCode: "ZipCode 2",
                        country: "Country 2",
                        type: "HOUSE",
                        ownerId: user.id
                    }
                ]
            });

            const createdProperties = await prisma.property.findMany();

            const imagesPropertyOne = [
                "propiedad1.png",
                "propiedad2.png",
                "propiedad3.png",
                "propiedad4.png",
                "propiedad5.png",
                "propiedad6.png",
            ];

            const imagesPropertyTwo = [
                "propiedad7.png",
                "propiedad8.png",
                "propiedad9.png",
                "propiedad10.png",
                "propiedad11.png",
                "propiedad12.png",
            ]

            for (let i = 0; i < createdProperties.length; i++) {
                const property = createdProperties[i];
                const images = [
                    {
                        url: imagesPropertyOne[i],
                        propertyId: property.id
                    },
                    {
                        url: imagesPropertyTwo[i],
                        propertyId: property.id
                    }
                ];
                await prisma.image.createMany({
                    data: images
                });
            }

            return res.status(200).json({ ok: true });

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
