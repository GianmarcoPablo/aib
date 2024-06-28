export class UpdatePropertyDto {
    constructor(
        public readonly title?: string,
        public readonly description?: string,
        public readonly price?: number,
        public readonly address?: string,
        public readonly city?: string,
        public readonly state?: string,
        public readonly zipCode?: string,
        public readonly country?: string,
        public readonly type?: any,
        public readonly ownerId?: number,
    ) { }

    static create(props: { [key: string]: any }): [string?, UpdatePropertyDto?] {

        const { title, description, price, address, city, state, zipCode, country, type, ownerId } = props

        return [undefined, new UpdatePropertyDto(title, description, price, address, city, state, zipCode, country, type, ownerId)]
    }
}

