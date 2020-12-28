import React, {useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// import { Link } from "react-router-dom";
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
import Card from "components/Card/Card";
import { useLocation } from "react-router-dom";
import Button from "components/CustomButtons/Button";
import Favorite from "@material-ui/icons/Favorite";
// import { useAuth } from "context/use-auth";

import styles from "assets/jss/material-kit-react/views/components.js";

// import formatCurrency from "../util";
// import Fade from "react-reveal/Fade";
// import Modal from "react-modal";
// import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
// import { fetchProducts } from "../actions/productActions";
import { addToCart, updateCart, fetchItems } from "../actions/cartItemActions";
import { fetchCarts } from "../actions/cartActions";

const useStyles = makeStyles(styles);


function ProductPage(props) {
  const classes = useStyles();
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: false

  // };

  const p = useLocation().state.product;
  const { ...rest } = props;
  let cartId

  useEffect(() => {
    (async () => {
      cartId = await props.fetchCarts();
      props.fetchItems(cartId);
      
    })();
  }, []);

  const checkCart = async () => {
    cartId = await props.fetchCarts();
    const items = await props.fetchItems(cartId);

    let item;
    if (items.length > 0) {
      item = items.find((x) => x.product_id === p.id)
    }
    if (item) {
      console.log("update")
      await props.updateCart(item)
    } else {
      console.log("post")
      await props.addToCart(p)
    }
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
      <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
          <Button justIcon round color="primary">
                <Favorite className={classes.icons} />
              </Button>
            <Card carousel>
                <div>
                  <h4>
                    {p.title + " ♡ " +p.price}
                  </h4>
                    <img src={p.image} alt={`${p.title}`} className="slick-image" />
                </div>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
              
              <Button color="primary" round onClick={checkCart}>
                Add to Cart
              </Button>
            </GridItem>
        </GridContainer>
      </div>
    </div>
      </div>
    </div>
  );
}

export default connect((state) => ({ items: state.cartItems.cartItems }), { addToCart, updateCart, fetchItems, fetchCarts })(ProductPage);
