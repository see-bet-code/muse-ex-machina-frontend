
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import { ProvideAuth } from "./context/use-auth";
import "assets/scss/material-kit-react.scss?v=1.9.0";
import App from "./App";
import { productsReducer } from "./reducers/productReducer";
import { cartItemReducer } from "./reducers/cartItemReducer";
import { cartReducer } from "./reducers/cartReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productsReducer,
    cartItems: cartItemReducer,
    carts: cartReducer
  }),
  {},
  composeEnhancer(applyMiddleware(thunk))
);

var hist = createBrowserHistory({forceRefresh:true});

ReactDOM.render(
  <React.StrictMode>
    <Router history={hist}>
      <ProvideAuth>
        <Provider store={store}>
          <App />
        </Provider>
      </ProvideAuth>
    </Router>
  </React.StrictMode>
  ,
  document.getElementById("root")
);








