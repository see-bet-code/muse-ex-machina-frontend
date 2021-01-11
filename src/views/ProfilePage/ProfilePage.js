import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
// import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
import StarBorderIcon from '@material-ui/icons/StarBorder';
// @material-ui/lab
import { Rating } from '@material-ui/lab';
// core components
import Header from "components/Header/Header";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import HeaderLinks from "components/Header/HeaderLinks";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";


import styles from "assets/jss/material-kit-react/views/profilePage.js";

import { useAuth } from "context/use-auth";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const auth = useAuth();
  useEffect(() => {
    (() => {
      auth.signInFromToken();
    })();
  }, []);

  const classes = useStyles();
  
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  const findRating = (prodId) => {
    return auth.user.reviews.find(r => r.product.id === prodId).rating;
  }

  const findReview = (prodId) => {
    return auth.user.reviews.find(r => r.product.id === prodId);

  }

  const showPurchases = () => {
    const purchases = auth.user?.carts?.filter(c => c.checked_out)
    const prods = purchases?.map(c => c.products).flat()
    return prods?.map((p) => (
      <GridItem key={p.asin} xs={6} sm={12} md={6}>
        {p.title}<br></br>
        <Rating
          value={findRating(p.id)}
          precision={0.5}
          readOnly
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
          size="large"
        /><br></br>
        <Link to={{pathname: `/review-form/${p.asin}`, state: {
            review: findReview(p.id)
            }}} className={classes.dropdownLink} >
          <Button>{findRating(p.id) ? "Update Review" : "Review Product"}</Button>
        </Link>
        <Link to={{pathname: `/products/${p.asin}`, state: {
            product: p
            }}} className={classes.dropdownLink} >
          <img src={p.image} alt={`${p.title}`} className={navImageClasses} />
        </Link>
      </GridItem>
    ))
  }

  return (
    <div>
      <Header
        color="transparent"
        brand="Muse Ex Machina"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={"https://cdn.redshift.autodesk.com/2018/01/fashion-tech-header.jpg"} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={`http://localhost:3000${auth.user?.avatar}`} alt="..." className={imageClasses} />
                  </div>
                  <br>
                  </br>
                  <br></br>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{auth.user?.name}</h3>
                    <br></br>
                    Total Orders: {auth.user?.carts?.filter(c => c.checked_out).length}
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Recent Purchases",
                      tabIcon: Camera,
                      tabContent: (
                        <GridContainer justify="center">
                          {auth.user && showPurchases()}
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Recommendations",
                      tabIcon: Favorite,
                      tabContent: (
                        <GridContainer justify="center">
                          
                          <GridItem xs={12} sm={12} md={4}>
                            
                            This feature coming soon!
                          </GridItem>
                          
                        </GridContainer>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}