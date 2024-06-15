import jwt from "jsonwebtoken"
export class TokenAdapter {

    static generateToken(payload: any) {
        return jwt.sign({ payload }, "secreto", {
            expiresIn: "30d",
        });
    }

    static async verify(token: string): Promise<any> {
        return new Promise((resolve) => {
            jwt.verify(token, "secreto", (err, decoded) => {
                if (err) return resolve(null)
                resolve(decoded)
            })
        })
    }
}