export class AttachBilling {
    constructor(
      public billing_id: string,
        public article_id: string,
        public amount: number,
        public size: string
    ) {}
}
  