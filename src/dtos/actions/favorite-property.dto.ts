export class FavoritePropertyDto {
    constructor(
        public readonly propertyId: number,
        public readonly userId: number,
    ) { }


    static create(props: { [key: string]: any }): [string?, FavoritePropertyDto?] {

        const { propertyId, userId } = props


        if (!propertyId) return ["propertyId is required"]
        if (!userId) return ["userId is required"]

        return [undefined, new FavoritePropertyDto(propertyId, userId)]
    }
}