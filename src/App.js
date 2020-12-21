import React, { useEffect, Suspense } from "react";
// import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Components from "views/Components/Components";
import LandingPage from "views/LandingPage/LandingPage";
import ProfilePage from "views/ProfilePage/ProfilePage";
import SignupPage from "views/SignupPage/SignupPage";
import ProductPage from "views/ProductPage"
import LoginPage from "views/LoginPage"
import CartPage from "views/CartPage"

function App() {
 

  return (
    <div>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/landing-page" component={LandingPage} />
            <Route path="/profile-page" component={ProfilePage} />
            <Route path="/signup-page" component={SignupPage} />
            <Route path="/login-page" component={LoginPage} />
            <Route path="/products/:asin" component={ProductPage} />
            <Route path="/cart" component={CartPage} />
            <Route exact path="/" component={Components} />
          </Switch>
        </Suspense>
      
      </Router>
    </div>
  );
}

export default App;
