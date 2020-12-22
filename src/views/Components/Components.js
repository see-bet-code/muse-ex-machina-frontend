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
// import SectionBasics from "./Sections/SectionBasics.js";
// import SectionNavbars from "./Sections/SectionNavbars.js";
// import SectionTabs from "./Sections/SectionTabs.js";
// import SectionTypography from "./Sections/SectionTypography.js";
// import SectionJavascript from "./Sections/SectionJavascript.js";
// import SectionCarousel from "./Sections/SectionCarousel.js";
// import SectionCompletedExamples from "./Sections/SectionCompletedExamples.js";
// import SectionLogin from "./Sections/SectionLogin.js";
// import SectionExamples from "./Sections/SectionExamples.js";

import styles from "assets/jss/material-kit-react/views/components.js";
import { connect } from "react-redux";
import { fetchProducts } from "actions/productActions";
// import Button from "components/CustomButtons/Button";
import { sortProducts } from "actions/productActions";



const useStyles = makeStyles(styles);

function Components(props) {

  useEffect(() => {
    (() => {
      props.fetchProducts();
    })();
  });

  const classes = useStyles();
  const { ...rest } = props;
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
        {/* <SectionBasics />
        <SectionNavbars />
        <SectionTabs />
        <SectionJavascript /> */}
        {/* <Button color="primary" round onClick={console.log}>
                        Remove From Cart
                      </Button> */}
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
          {props.products?.map((p, i) => <div>
                  <h4>
                    {p.title + " ♡ " +p.price}
                  </h4>
                  <Link to={{pathname: `/products/${p.asin}`, state: {
                        product: p
                      }}} className={classes.dropdownLink}>
                    <img src={p.image} alt={`slide ${i}`} className="slick-image" />
                  </Link>
                    </div>)
                }
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({ products: state.products.filteredItems }),
  { fetchProducts, sortProducts }
)(Components);
