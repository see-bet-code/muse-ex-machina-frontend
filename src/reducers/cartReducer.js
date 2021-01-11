import { FETCH_CARTS, UPDATE_CART } from "constants/types";

const cartReducer = (state = {
  carts: [],
  activeCart: null,
  loading: false
}, action) => {
  switch (action.type) {
    case FETCH_CARTS:
      return { carts: action.payload, 
        activeCart: action.active,
        loading: false
      };
    case UPDATE_CART:
      return { ...state, carts: action.cart, 
        loading: false
      };
    default:
      return state;
  }
};
export { cartReducer };