export class Purchase {
    constructor(
      public id: string,
        public clients_id: string,
        public price: number,
        public coupon_id: number,
        public shipping: number,
        public status: string,
        public addresspurchases_id: string
    ) {}
}

