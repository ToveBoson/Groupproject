import { CartItem } from "./models/CartItem";

export function newAmountOfProducts(cartItem: CartItem[]) {
  localStorage.setItem("shoppingCart", JSON.stringify(cartItem));
}
