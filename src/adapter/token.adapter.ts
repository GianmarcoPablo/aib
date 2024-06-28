import jwt from "jsonwebtoken"
export class TokenAdapter {

    static generateToken(payload: any) {
        return jwt.sign({ payload }, "secreto", {
            expiresIn: "30d",
        });
    }

    static verify(token: string) {
        return jwt.verify(token, "secreto")
    }
}