export class AuthRegisterUserDto {
    constructor(
        public readonly email: string,
        public readonly name: string,
        public readonly password: string,
    ) { }


    static create(props: { [key: string]: any }): [string?, AuthRegisterUserDto?] {
        const { email, name, password } = props

        if (!name) return ["name is required"]
        if (!email) return ["email is required"]
        if (!password) return ["password is required"]
        if (!Validators.email.test(email)) return ['email is invalid', undefined];

        return [undefined, new AuthRegisterUserDto(email, name, password)]
    }
}


export class Validators {
    static get email() {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    }
}