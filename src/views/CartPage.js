import React, {useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
// @material-ui/icons
// core components
import Header from "components/Header/Header";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks";

import styles from "assets/jss/material-kit-react/views/components.js";
import { removeFromCart, fetchItems, updateCartItem, clearCartItems } from "../actions/cartItemActions";
import { fetchCarts, updateCart } from "../actions/cartActions";
import { connect } from "react-redux";
import Button from "components/CustomButtons/Button";
import { loadStripe } from '@stripe/stripe-js';

const useStyles = makeStyles(styles);

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);


function CartPage(props) {
  const classes = useStyles();
  const {fetchItems, fetchCarts} = props
  const { ...rest } = props;
  let total = 0.00

  useEffect(() => {
    (async () => {
      await fetchItems(await fetchCarts())
    })();
  }, []);

  const checkout = async () => {
    const stripe = await stripePromise
    completePurchase(stripe)
    confirmPayment(stripe)
  }

  const completePurchase = async (stripe) => {


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

    localStorage.setItem("clientSecret", session.secret)

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

  const confirmPayment = async (stripe) => {
    // const stripe = await stripePromise

    // const clientSecret = localStorage.getItem('clientSecret');
    // console.log(clientSecret)
    
    // const {paymentIntent, error} = await stripe.confirmCardPayment(clientSecret);
    // if (error) {
    //   // Handle error here
    //   console.log(error)
    // } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Handle successful payment here
      props.updateCart(props.cart.activeCart.id)
    //   localStorage.removeItem("clientSecret")
      
    // } 
  }

  const updateQty = (i, type) => {
    switch (type) {
      case "+": 
        props.updateCartItem(i, 1)
        break
      default: 
        if (i.quantity === 1) {
          props.removeFromCart(i.id)
        } else {
          props.updateCartItem(i, -1)
        }
        
    }

  }

  const removeItem = (id) => {
    props.removeFromCart(id)
  }

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
      <Button color="primary" block={true} onClick={props.clearCartItems}>
            Clear Cart
          </Button>
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
                      <br></br>
                      <Button color="transparent" simple size="lg" onClick={() => updateQty(c, "+")}>
                        <AddCircleOutlineIcon />
                      </Button>
                      <Button color="transparent" simple size="lg" onClick={() => updateQty(c, "-")}>
                        <RemoveCircleOutlineIcon />
                      </Button>
                      <Button color="transparent" round onClick={() => removeItem(c.id)}>
                        Remove From Cart
                      </Button>
                    </div>

                  }
                  )
          }
          </GridItem>
          <GridItem>
            Total: ${total}
            <br></br>
            {props.items?.length > 0 &&<Button color="primary" round onClick={checkout}>
              Checkout
          </Button>}<br></br>
          </GridItem>
          
        </GridContainer>
      </div>
    </div>
  );
}

export default connect((state) => ({ items: state.cartItems.cartItems, cart: state.carts }), { fetchItems, removeFromCart, fetchCarts, updateCart, updateCartItem, clearCartItems})(CartPage);
