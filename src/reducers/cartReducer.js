import { CREATE_CART, CLEAR_CART, FETCH_CARTS, SET_ACTIVE_CART } from "constants/types";

const cartReducer = (state = {
  carts: [],
  activeCart: null,
  loading: false
}, action) => {
  switch (action.type) {
    case 'LOADING_CARTS':
      return {
        ...state,
        loading: true
      }
    case CREATE_CART:
      return { carts: action.cart, 
        activeCart: action.active,
        loading: false
      };
    // case CLEAR_CART:
    //   return { carts: action.payload, 
    //     activeCart: action.payload.active,
    //     loading: false
    //   };
    case FETCH_CARTS:
      return { carts: action.payload, 
        activeCart: action.active,
        loading: false
      };
    case SET_ACTIVE_CART:
      return { ...state,
        activeCart: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export { cartReducer };