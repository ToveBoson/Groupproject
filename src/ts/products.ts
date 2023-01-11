import { ifShoppingCartEmpty } from "./models/ifShoppingCartEmpty";
import { IProduct } from "./models/IProduct";
import { products } from "./products/products";

window.addEventListener("load", () => {
  ifShoppingCartEmpty();
});

ifShoppingCartEmpty();

let container: HTMLDivElement = document.getElementById(
  "products"
) as HTMLDivElement;

function createHtml(products: IProduct[]) {
  products.forEach((product: IProduct) => {
    let productContainer: HTMLDivElement = document.createElement(
      "div"
    ) as HTMLDivElement;

    let productImg: HTMLImageElement = document.createElement(
      "img"
    ) as HTMLImageElement;

    let productInfo: HTMLHeadingElement = document.createElement(
      "h3"
    ) as HTMLHeadingElement;

    let productPrice: HTMLParagraphElement = document.createElement(
      "p"
    ) as HTMLParagraphElement;

    container.classList.add("products");
    productContainer.classList.add("products__container");
    productImg.classList.add("products__container__image");
    productInfo.classList.add("products__container__info");
    productPrice.classList.add("products__container__price");

    product.imageUrls.forEach((image: string) => {
      productImg.src = image;
      productImg.setAttribute("alt", "mobilskal");
    });

    productImg.addEventListener("click", () => {
      window.location.href = "product-details.html";
      sendProductDetailsToLs(product);
    });

    productInfo.innerHTML = product.description;

    let priceText: string = product.price.toString();
    productPrice.innerHTML = priceText + " kr";

    container.appendChild(productContainer);
    productContainer.appendChild(productImg);
    productContainer.appendChild(productInfo);
    productContainer.appendChild(productPrice);
  });
}

// All products
let allProductsLink: HTMLLIElement = document.getElementById(
  "all-products"
) as HTMLLIElement;

allProductsLink.addEventListener("click", () => {
  container.innerHTML = "";
  // createHtml(products);
  sendToLs(products);
  getFromLs();
});

// iPhone
let iphoneLink: HTMLLIElement = document.getElementById(
  "iPhone"
) as HTMLLIElement;

iphoneLink.addEventListener("click", () => {
  container.innerHTML = "";
  let iphoneList: IProduct[] = products.filter(
    (newArrayOfObjects) => newArrayOfObjects.brand === "iphone"
  );
  // createHtml(iphoneList);
  sendToLs(iphoneList);
  getFromLs();
});

// Samsung
let samsungLink: HTMLLIElement = document.getElementById(
  "samsung"
) as HTMLLIElement;

samsungLink.addEventListener("click", () => {
  container.innerHTML = "";
  let samsungList: IProduct[] = products.filter(
    (newArrayOfObjects) => newArrayOfObjects.brand === "samsung"
  );
  // createHtml(samsungList);
  sendToLs(samsungList);
  getFromLs();
});

//Huawei
let huaweiLink: HTMLLIElement = document.getElementById(
  "huawei"
) as HTMLLIElement;

huaweiLink.addEventListener("click", () => {
  container.innerHTML = "";
  let huaweiList: IProduct[] = products.filter(
    (newArrayOfObjects) => newArrayOfObjects.brand === "huawei"
  );
  // createHtml(huaweiList);
  sendToLs(huaweiList);
  getFromLs();
});

function sendToLs(products: IProduct[]) {
  localStorage.setItem("products", JSON.stringify(products));
}

function getFromLs() {
  let productList: IProduct[] = JSON.parse(
    localStorage.getItem("products") || "[]"
  );
  createHtml(productList);
}

window.addEventListener("load", () => {
  getFromLs();
});

function emptyLS() {
  if (typeof localStorage["products"] === "undefined") {
    sendToLs(products);
  }
}
emptyLS();

function sendProductDetailsToLs(product: IProduct) {
  localStorage.setItem("productDetails", JSON.stringify(product));
}
