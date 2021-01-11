import React, {useEffect, useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles} from "@material-ui/core/styles";
// @material-ui/icons
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import StarBorderIcon from '@material-ui/icons/StarBorder';
// @material-ui/lab
import { Rating } from '@material-ui/lab';
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
import CustomDropdown from "components/CustomDropdown/CustomDropdown"
import Favorite from "@material-ui/icons/Favorite";
import SpringModal from "views/Components/SpringModal"

import styles from "assets/jss/material-kit-react/views/components.js";

// import formatCurrency from "../util";
// import Fade from "react-reveal/Fade";
// import Modal from "react-modal";
// import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { addToCart, updateCartItem, fetchItems } from "../actions/cartItemActions";
import { fetchCarts } from "../actions/cartActions";

const useStyles = makeStyles(styles);


function ProductPage(props) {
  const [qty, setQty] = useState(1)
  const [open, setOpen] = useState(false);
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
  const {fetchItems, fetchCarts} = props
  const { ...rest } = props;
  
  useEffect(() => {
    (async () => {
      fetchItems(await fetchCarts());
      
    })();
  }, []);

  const averageRating = () => {
    const ratings = p.reviews.map(r => r.rating)
    switch (ratings.length) {
      case 0:
        return null
      case 1:
        return ratings[0]/ ratings.length
      default:
        return ratings.reduce((r, sum) => sum + r, 0) / ratings.length
    }
  }

  const checkCart = async () => {
    const items = await props.fetchItems(await props.fetchCarts());

    let item;
    if (items.length > 0) {
      item = items.find((x) => x.product_id === p.id)
    }
    if (item) {
      await props.updateCartItem(item, qty)
    } else {
      await props.addToCart(p, qty)
    }
    setOpen(true)
  }
  

  const handleClose = () => {
    setOpen(false);
  };


  const handleQuantity = (e) => {
    setQty(e)
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
          <Button justIcon round color="primary" onMouseEnter={() => {"Add to favorites"}}>
                <Favorite className={classes.icons} />
              </Button>
            <Card carousel>
                <div>
                  <h4>
                    {p.title + " ♡ " +p.price}
                  </h4>
                    <img src={p.image} alt={`${p.title}`} className="slick-image" />
                    Average rating:
                    <Rating
                      value={averageRating()}
                      precision={0.5}
                      readOnly
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      size="small"
                    />
                </div>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <CustomDropdown
                        buttonText={`Qty: ${qty}`}
                        id="qty"
                        formControlProps={{
                          fullWidth: true
                        }}
                        dropdownList={[...Array(26).keys()]}
                        onClick={handleQuantity}
                      />
                
              <Button color="primary" round aria-label="add to shopping cart" onClick={checkCart}>
                <AddShoppingCartIcon/>
                Add to Cart
              </Button>
              <SpringModal open={open} handleClose={handleClose}/>
            </GridItem>
        </GridContainer>
      </div>
    </div>
      </div>
    </div>
  );
}

export default connect((state) => ({ items: state.cartItems.cartItems }), { addToCart, updateCartItem, fetchItems, fetchCarts })(ProductPage);
