export class CreateProfilerDto {
    constructor(
        public readonly userId: number,
        public readonly phone?: string,
        public readonly bio?: string,
        public readonly avatarUrl?: string,
        public readonly socialLinks?: any,
        public readonly country?: string,
        public readonly website?: string,
        public readonly dateOfBirth?: Date,
        public readonly gender?: string
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateProfilerDto?] {
        const { userId, phone, bio, avatarUrl, socialLinks, country, website, dateOfBirth, gender } = props;

        if (!userId) {
            return ['UserId is required'];
        }

        return [undefined, new CreateProfilerDto(userId, phone, bio, avatarUrl, socialLinks, country, website, dateOfBirth, gender)];
    }
}

