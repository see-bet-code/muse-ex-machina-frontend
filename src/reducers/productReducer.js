import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS,
  ORDER_PRODUCTS,
} from "constants/types";

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case FILTER_PRODUCTS:
      return {
        ...state,
        allItems: action.payload.allItems,
        items: action.payload.items
      };
    case ORDER_PRODUCTS:
      return {
        ...state,
        allItems: action.payload.allItems,
        items: action.payload.items,
      };
    case FETCH_PRODUCTS:
      return { ...state,
        allItems: action.payload,
        items: action.payload
      };
    default:
      return state;
  }
};