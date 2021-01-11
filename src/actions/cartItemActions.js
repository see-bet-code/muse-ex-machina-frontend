import { ADD_TO_CART, UPDATE_CART_ITEM, CLEAR_CART_ITEMS, REMOVE_FROM_CART, FETCH_ITEMS } from "constants/types";

export const fetchItems = (id) => async (dispatch) => {
  const res = await fetch(`http://localhost:3000/api/v1/carts/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  const data = await res.json();
  dispatch({
    type: FETCH_ITEMS,
    payload: JSON.parse(data.active_cart).cart_items,
  });
  return JSON.parse(data.active_cart).cart_items
};

export const addToCart = (item, qty) => (dispatch, getState) => {
  const cartId = getState().carts.activeCart.id
  dispatch({ type: 'LOADING_ITEMS'})
  fetch(`http://localhost:3000/api/v1/cart_items/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({product_id: item.id, cart_id: cartId, quantity: qty}),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: ADD_TO_CART,
        payload: JSON.parse(data.cart_items),
      });
    });
};

export const updateCartItem = (item, qty) => (dispatch) => {
  dispatch({ type: 'LOADING_ITEMS'})
  const newQ = item.quantity + qty
  fetch(`http://localhost:3000/api/v1/cart_items/${item.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({quantity: newQ}),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: JSON.parse(data.cart_items),
      });
    });
}

export const removeFromCart = (id) => async (dispatch) => {
  dispatch({ type: 'LOADING_ITEMS'})
  const res = await fetch(`http://localhost:3000/api/v1/cart_items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  const data = await res.json();
  dispatch({
    type: REMOVE_FROM_CART,
    payload: JSON.parse(data.cart_items),
  });
};

export const clearCartItems = () => (dispatch, getState) => {
  const cartId = getState().carts.activeCart.id
  fetch(`http://localhost:3000/api/v1/clear_cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({cart_id: cartId}),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: CLEAR_CART_ITEMS,
        payload: data.cart_items,
      });
    });
}