export class AuthLoginUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string,
    ) { }


    static create(props: { [key: string]: any }): [string?, AuthLoginUserDto?] {
        const { email, password } = props

        if (!email) return ["email is required"]
        if (!password) return ["password is required"]

        return [undefined, new AuthLoginUserDto(email, password)]
    }
}

