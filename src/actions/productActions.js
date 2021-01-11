import { FETCH_PRODUCTS, FILTER_PRODUCTS, ORDER_PRODUCTS } from "constants/types";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("http://localhost:3000/api/v1/products");
  const data = await res.json();
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const filterProducts = (products, str) => (dispatch) => {
  console.log(str)
  dispatch({
    type: FILTER_PRODUCTS,
    payload: {
      allItems: products,
      items:
        str === ""
          ? products
          : products.filter((p) => p.title.toLowerCase().includes(str)),
    },
  });
};
export const sortProducts = (products, sort) => (dispatch) => {
  const sortedProducts = products.slice();
  switch (sort) {
    case "New Arrivals":
      sortedProducts.sort((a, b) => (a.asin < b.asin ? 1 : -1));
      break
    case "Price Low to High":
      sortedProducts.sort((a, b) => a.price > b.price ? 1 : -1);
      break
    case "Price High to Low":
      sortedProducts.sort((a, b) => a.price < b.price ? 1 : -1);
      break
    default:
      break
  }
  
  console.log(sortedProducts);
  dispatch({
    type: ORDER_PRODUCTS,
    payload: {
      allItems: products,
      items: sortedProducts
    },
  });
};
