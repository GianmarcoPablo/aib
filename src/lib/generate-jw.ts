import jwt from "jsonwebtoken"
const generarJWT = (id: number) => {
    return jwt.sign({ id }, "secreto", {
        expiresIn: "30d",
    });
}

export default generarJWT