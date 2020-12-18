export class AttachPurchase {
    constructor(
      public purchase_id: string,
      public article_id: string,
      public amount: number,
      public size: string
    ) {}
}