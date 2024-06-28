export class UpdateProfileDto {
    constructor(
        public readonly phone?: string,
        public readonly bio?: string,
        public readonly avatarUrl?: string,
        public readonly socialLinks?: any,
        public readonly country?: string,
        public readonly website?: string,
        public readonly dateOfBirth?: string,
        public readonly gender?: string
    ) { }

    static create(props: { [key: string]: any }): [string?, UpdateProfileDto?] {
        const { phone, bio, avatarUrl, socialLinks, country, website, dateOfBirth, gender } = props;

        return [undefined, new UpdateProfileDto(phone, bio, avatarUrl, socialLinks, country, website, dateOfBirth, gender)];
    }
}

