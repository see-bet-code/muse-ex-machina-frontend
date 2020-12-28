import { CLEAR_CART, FETCH_CARTS, UPDATE_CART } from "constants/types";

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

export const updateCart = (id) => async (dispatch) => {
  const res = await fetch(`http://localhost:3000/api/v1/carts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({checked_out: true}),
  })
  const data = await res.json()
  console.log(data)
  dispatch({ type: UPDATE_CART, payload: data.carts })
};

// export const clearOrder = () => (dispatch) => {
//   dispatch({ type: CLEAR_ORDER });
// };
