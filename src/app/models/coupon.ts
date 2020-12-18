export class Coupon {
    constructor(
        public name: string,
        public discount: string,
        public expiration: string,
        public status: boolean, 
        public adminId: number
    ) {}
}
