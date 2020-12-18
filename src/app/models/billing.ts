export class Billing {
    constructor(
        public id: string,
        public price: number,
        public client: string,
        public email: string,
        public phone: string,
        public address: string,
        public addressDetail: string,
        public status: string
    ) {}
}
  