import { IProduct } from "./IProduct";

export class CartItem {
  constructor(
    public product: IProduct,
    public color: string,
    public image: string,
    public amount: number
  ) {}
}
