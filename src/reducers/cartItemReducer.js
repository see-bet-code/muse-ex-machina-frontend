import { ADD_TO_CART, UPDATE_CART_ITEM, REMOVE_FROM_CART, FETCH_ITEMS } from "constants/types";

export const cartItemReducer = (
  state = {
    cartItems: [],
    loading: false},
  action
) => {
  switch (action.type) {
    case 'LOADING_ITEMS':
      return {
        ...state,
        loading: true
      }
    case ADD_TO_CART:
      return { cartItems: action.payload, loading: false };
    case UPDATE_CART_ITEM:
      return { cartItems: action.payload, loading: false };
    case REMOVE_FROM_CART:
      return { cartItems: action.payload, loading: false };
    case FETCH_ITEMS:
      return { cartItems: action.payload, loading: false };
    default:
      return state;
  }
};