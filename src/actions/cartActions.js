import { CREATE_CART, CLEAR_CART_ITEMS, CLEAR_CART, FETCH_CARTS } from "constants/types";

export const fetchCarts = () => async (dispatch) => {
  const res = await fetch("http://localhost:3000/api/v1/carts", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  const data = await res.json()
  dispatch({ type: FETCH_CARTS, payload: data.carts, active: data.active })
  return data.active.id
};

// export const clearOrder = () => (dispatch) => {
//   dispatch({ type: CLEAR_ORDER });
// };
