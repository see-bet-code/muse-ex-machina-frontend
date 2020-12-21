import React, {useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks";

import styles from "assets/jss/material-kit-react/views/components.js";
import { removeFromCart, fetchItems } from "../actions/cartItemActions";
import { fetchCarts } from "../actions/cartActions";
import { connect } from "react-redux";
import Button from "components/CustomButtons/Button";
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from "context/use-auth";

const useStyles = makeStyles(styles);

const stripePromise = loadStripe('pk_test_51Hf7V4JGFWpzASnGce3wiFh3nVkn3WfNwKYMyr1iimkbDd81YOfZuCyqhuU6TTTqLCIEBX3xEqTemxHrUdZypj5o00GeZaz7MG');


function CartPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const auth = useAuth();
  let total = 0.00

  useEffect(() => {
    (async () => {
      auth.signInFromToken();
      const cartId = await props.fetchCarts()
      props.fetchItems(cartId)
    })();
  }, []);

  const checkout = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch('http://localhost:3000/api/v1/create_session', { 
                              method: 'POST',
                              headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                              },
                              body: JSON.stringify(props.items)
                            })
        

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      console.log(result.error.message)
    }
  };

  return (
    <div>
      <Header
        brand="Muse Ex Machina"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/bg4.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Muse Ex Machina.</h1>
                <h3 className={classes.subtitle}>
                  [insert tagline here...]
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            {props.items?.map((c, i) => {
              const p = c.product
            total += c.quantity * c.product.price
          return <div key={i}>
                  <h4>
                    {p.title + " ♡ Price:" +p.price}
                    
                  </h4>
                  <Link to={{pathname: `/products/${p.asin}`, state: {
                        product: p
                      }}} className={classes.dropdownLink}>
                    <img src={p.image} alt={`slide ${i}`} className="slick-image" />
                  </Link>
                    Quantity: {c.quantity}  
                      Subtotal: {c.quantity * p.price}
                      <Button color="primary" round onClick={() => props.removeFromCart(c.id)}>
                        Remove From Cart
                      </Button>
                    </div>

                  }
                  )
          }
          </GridItem>
          <GridItem>
            Total: {total}
            {props.items?.length > 0 &&<Button color="primary" round onClick={checkout}>
              Checkout
          </Button>}
          </GridItem>
          
        </GridContainer>
      </div>
    </div>
  );
}

export default connect((state) => ({ items: state.cartItems.cartItems, cart: state.carts  }), { fetchItems, removeFromCart, fetchCarts })(CartPage);
