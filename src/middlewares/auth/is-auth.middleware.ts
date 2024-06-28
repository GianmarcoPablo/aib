
import { NextFunction, Request, Response } from "express";
import { TokenAdapter } from "../../adapter/token.adapter";
import { prisma } from "../../model/connect";

export class AuthMiddleware {
    static async verify(req: Request, res: Response, next: NextFunction) {
        const autorizacion = req.header("Authorization")
        if (!autorizacion) return res.status(401).json({ msg: "No autorizado" })
        if (!autorizacion.startsWith("Bearer ")) return res.status(401).json({ msg: "No autorizado" })

        const token = autorizacion.split(" ")[1]

        try {
            const decoded = TokenAdapter.verify(token) as any
            if (!decoded) return res.status(401).json({ msg: "Authorization" })
            const idUser = decoded.payload
            if (!idUser) return res.status(401).json({ msg: "Authorization" })
            const user = await prisma.user.findUnique({ where: { id: idUser } })
            if (!user) return res.status(401).json({ msg: "Authorization" })
            const { password, createdAt, updatedAt, ...rest } = user
            req.body.user = rest
            next()
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Error de servidor" })
        }
    }

}