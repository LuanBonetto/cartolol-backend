export default class User {
    constructor(
        private id: string,
        private firstname: string,
        private lastname: string,
        private birthdate: number,
        private nickname: string,
        private email: string,
        private password: string,
        private isAdmin: boolean
    ) { }

    public getId(): string {
        return this.id;
    }

    public getFirstName(): string {
        return this.firstname;
    }

    public getLastName(): string {
        return this.lastname;
    }

    public getBirthDate(): number {
        return this.birthdate;
    }

    public getEmail(): string {
        return this.email;
    }

    public getNickname(): string {
        return this.nickname;
    }

    public getPassword(): string {
        return this.password;
    }

    public getIsAdmin(): boolean {
        return this.isAdmin;
    }

}