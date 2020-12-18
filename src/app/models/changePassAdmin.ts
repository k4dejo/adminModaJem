export class ChangeAdmin {
    constructor(
        public user: string,
        public oldPass: string,
        public newPass: string,
        public rePass: string,
        public priority: string
    ) {}
}  