import { IProduct } from "./models/IProduct";
import { CartItem } from "./models/CartItem";
import { ifShoppingCartEmpty } from "./models/ifShoppingCartEmpty";
import { newAmountOfProducts } from "./localStorageService";

// function getShoppingCartItemFromLs() {

// }

function getProductDetailsFromLs() {
  let productDetails: IProduct = JSON.parse(
    localStorage.getItem("productDetails") || "[]"
  );
  createProductDetailsHtml(productDetails);
}

getProductDetailsFromLs();

function createProductDetailsHtml(productDetails: IProduct) {
  let mainContainer: HTMLDivElement = document.getElementById(
    "mainProductDetails"
  ) as HTMLDivElement;
  let productImage: HTMLImageElement = document.createElement("img");
  let productInfoContainer: HTMLDivElement = document.createElement("div");
  let caseDescription: HTMLHeadingElement = document.createElement("h3");
  let price: HTMLParagraphElement = document.createElement("p");
  let containerColors: HTMLDivElement = document.createElement("div");
  let amountContainer: HTMLDivElement = document.createElement("div");
  let amountNumber: HTMLParagraphElement = document.createElement("p");
  let subtractIcon: HTMLDivElement = document.createElement("div");
  let additionIcon: HTMLDivElement = document.createElement("div");
  let shopButton: HTMLButtonElement = document.createElement("button");

  mainContainer.classList.add("product-details-container");
  productImage.classList.add("product-details-container__product-img");
  productInfoContainer.classList.add(
    "product-details-container__info-container"
  );
  caseDescription.classList.add(
    "product-details-container__info-container__description"
  );
  price.classList.add("product-details-container__info-container__price");

  containerColors.classList.add(
    "product-details-container__info-container__container-colors"
  );

  amountContainer.classList.add(
    "product-details-container__info-container__amount-container"
  );
  amountNumber.classList.add(
    "product-details-container__info-container__amount-container__amount-number"
  );
  subtractIcon.classList.add(
    "product-details-container__info-container__amount-container__subtract-icon"
  );
  additionIcon.classList.add(
    "product-details-container__info-container__amount-container__addition-icon"
  );
  shopButton.classList.add(
    "product-details-container__info-container__shop-button"
  );

  caseDescription.innerHTML = productDetails.description;

  let priceText: string = productDetails.price.toString();
  price.innerHTML = priceText + " kr";

  let selectedColor: string = productDetails.colors[2];
  let selectedImage: string = productDetails.imageUrls[2];
  let selectedAmount: number = 1;

  productDetails.colors.forEach((color: string) => {
    let firstColor: HTMLDivElement = document.createElement("div");
    firstColor.classList.add(
      "product-details-container__info-container__container-colors__first-color"
    );
    firstColor.innerHTML = `<i class="fa-solid fa-circle ${color}"></i>`;
    containerColors.appendChild(firstColor);

    productDetails.imageUrls.forEach((image: string) => {
      productImage.src = image;
      productImage.setAttribute("alt", "mobilskal");
      firstColor.addEventListener("click", () => {
        if (image.match(color)) {
          productImage.src = image;
          productImage.setAttribute("alt", "mobilskal");
          selectedColor = color;
          selectedImage = image;
        }
      });
    });
  });
  let selectedAmountText: string = selectedAmount.toString();

  additionIcon.addEventListener("click", () => {
    let cartItem: CartItem[] = JSON.parse(
      localStorage.getItem("shoppingCart") || "[]"
    );
    selectedAmount++;
    selectedAmountText = selectedAmount.toString();
    amountNumber.innerHTML = selectedAmountText;
    newAmountOfProducts(cartItem);
  });

  subtractIcon.addEventListener("click", () => {
    let cartItem: CartItem[] = JSON.parse(
      localStorage.getItem("shoppingCart") || "[]"
    );
    if (selectedAmount > 1) {
      selectedAmount--;
      selectedAmountText = selectedAmount.toString();
      amountNumber.innerHTML = selectedAmountText;
    }
    newAmountOfProducts(cartItem);
  });

  subtractIcon.innerHTML = `<i class="fa-solid fa-circle-minus"></i>`;
  amountNumber.innerHTML = selectedAmountText;
  additionIcon.innerHTML = `<i class="fa-solid fa-circle-plus"></i>`;

  shopButton.innerHTML = "Lägg i varukorg";

  shopButton.addEventListener("click", () => {
    let shoppingCartItem: CartItem[] = JSON.parse(
      localStorage.getItem("shoppingCart") || "[]"
    );

    let found = false;

    shoppingCartItem.forEach((item) => {
      if (
        productDetails.name === item.product.name &&
        selectedColor === item.color
      ) {
        item.amount += selectedAmount;
        console.log(item.amount);
        found = true;
      }
    });

    console.log(shoppingCartItem);
    if (!found) {
      let selectedProduct = newProductObject(
        productDetails,
        selectedColor,
        selectedImage,
        selectedAmount
      );
      shoppingCartItem.push(selectedProduct);
    }

    newAmountOfProducts(shoppingCartItem);
    ifShoppingCartEmpty();
  });

  ifShoppingCartEmpty();

  mainContainer.appendChild(productImage);
  mainContainer.appendChild(productInfoContainer);
  productInfoContainer.appendChild(caseDescription);
  productInfoContainer.appendChild(price);
  productInfoContainer.appendChild(containerColors);
  productInfoContainer.appendChild(amountContainer);
  amountContainer.appendChild(subtractIcon);
  amountContainer.appendChild(amountNumber);
  amountContainer.appendChild(additionIcon);
  productInfoContainer.appendChild(shopButton);
}

function newProductObject(
  product: IProduct,
  color: string,
  image: string,
  amount: number
) {
  let selectedProduct = new CartItem(product, color, image, amount);
  return selectedProduct;
}
