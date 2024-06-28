export class CreatePropertyDto {
    constructor(
        public readonly title: string,
        public readonly description: string,
        public readonly price: number,
        public readonly address: string,
        public readonly city: string,
        public readonly state: string,
        public readonly zipCode: string,
        public readonly country: string,
        public readonly type: any,
        public readonly ownerId: number,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreatePropertyDto?] {

        const { title, description, price, address, city, state, zipCode, country, type, ownerId } = props

        if (!title) return ['title is required'];
        if (!description) return ["description is required"]
        if (!price) return ["price is required"]
        if (!address) return ["address is required"]
        if (!city) return ["city is required"]
        if (!state) return ["state is required"]
        if (!zipCode) return ["zipCode is required"]
        if (!country) return ["country is required"]
        if (!type) return ["type is required"]
        if (!ownerId) return ["ownerId is required"]


        return [undefined, new CreatePropertyDto(title, description, price, address, city, state, zipCode, country, type, ownerId)];
    }
}

