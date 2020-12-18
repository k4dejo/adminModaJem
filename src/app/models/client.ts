export class Client {
    constructor(
        public name: string,
        public password: string,
        public phone: string,
        public email: string,
        public dni:   string,
        public address: string,
        public addressDetail: string,
        public photo: string,
        public file: Blob,
        public shops_id: number
    ) {}
}
