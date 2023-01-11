import { CartItem } from "./models/CartItem";
import { ifShoppingCartEmpty } from "./models/ifShoppingCartEmpty";

window.addEventListener("load", () => {
  ifShoppingCartEmpty();
});

ifShoppingCartEmpty();

function lsFromCart() {
  let checkoutSummary: CartItem[] = JSON.parse(
    localStorage.getItem("shoppingCart") || "[]"
  );
  summaryOfOrder(checkoutSummary);
}

lsFromCart();

function summaryOfOrder(summary: CartItem[]) {
  let totalCost: HTMLParagraphElement = document.getElementById(
    "checkoutSummaryTotalCost"
  ) as HTMLParagraphElement;

  let arrayOfTotalCost: number[] = [];
  let sum = 0;

  summary.forEach((summaryItem: CartItem) => {
    let summaryContainer: HTMLDivElement = document.getElementById(
      "orderSummaryContainer"
    ) as HTMLDivElement;
    let productContainer: HTMLDivElement = document.createElement("div");
    let summaryDescription: HTMLParagraphElement = document.createElement("p");
    let summaryColorContainer: HTMLParagraphElement =
      document.createElement("p");
    let summaryAmount: HTMLParagraphElement = document.createElement("p");
    let summaryPrice: HTMLParagraphElement = document.createElement("p");

    summaryContainer.classList.add("checkout__summary-container");
    productContainer.classList.add("checkout__summary-container__product");
    summaryDescription.classList.add(
      "checkout__summary-container__product__description"
    );
    summaryPrice.classList.add("checkout__summary-container__product__price");
    summaryAmount.classList.add("checkout__summary-container__product__amount");
    summaryColorContainer.classList.add(
      "checkout__summary-container__product__color"
    );

    summaryDescription.innerHTML = summaryItem.product.description;
    summaryColorContainer.innerHTML = summaryItem.color.toString();
    summaryAmount.innerHTML = summaryItem.amount.toString() + " st";
    summaryPrice.innerHTML = summaryItem.product.price.toString() + " kr";

    arrayOfTotalCost.push(summaryItem.amount * summaryItem.product.price);

    summaryContainer.appendChild(productContainer);
    productContainer.appendChild(summaryDescription);
    productContainer.appendChild(summaryColorContainer);
    productContainer.appendChild(summaryAmount);
    productContainer.appendChild(summaryPrice);
    summaryContainer.appendChild(totalCost);
  });
  for (let i = 0; i < arrayOfTotalCost.length; i++) {
    sum += arrayOfTotalCost[i];
  }
  let sumText: string = sum.toString();
  if (
    typeof localStorage["shoppingCart"] === "undefined" ||
    localStorage["shoppingCart"] === "[]"
  ) {
    totalCost.style.display = "none";
  } else {
    totalCost.innerHTML = `Total summa: ${sumText} kr`;
  }
}
