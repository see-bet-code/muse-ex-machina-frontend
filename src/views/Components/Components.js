import React, {useEffect, useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Box} from '@material-ui/core';
import { TextField } from '@material-ui/core';
// core components
import Header from "components/Header/Header";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks";
import CustomDropdown from "components/CustomDropdown/CustomDropdown"

import styles from "assets/jss/material-kit-react/views/components.js";
import { connect } from "react-redux";
import { fetchProducts } from "actions/productActions";
import { sortProducts, filterProducts } from "actions/productActions";

import InfiniteScroll from 'react-infinite-scroller';


const useStyles = makeStyles(styles);

function Components(props) {
  const {products, allProducts, fetchProducts, sortProducts, filterProducts} = props;
  const { ...rest } = props;

  useEffect(() => {
    (() => {
      fetchProducts();
    })();
  }, []);
  
  const [hasMore, setHasMore] = useState(true)
  const [end, setEnd] = useState(0)
  const [sort, setSort] = useState("")
  const [filter, setFilter] = useState("")

  

  const classes = useStyles();
  const dropDown = [
    "",
    "New Arrivals",
    "Price Low to High",
    "Price High to Low"
  ]

  const handleSort = async (e) => {
    setSort(e);
    sortProducts(products, e);
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
    filterProducts(allProducts, e.target.value)
  }

  const showItems = () => {
    return products?.slice(0,end).map((p, i) =>
      <GridItem xs={12} sm={12} md={6} key={p.id} justify="center">
        <Box boxShadow={3} >
          <div >
            <h4> <b>{p.title}</b> <br></br>{" ♡ $" +p.price} </h4>
            <Link to={{pathname: `/products/${p.asin}`, state: {
                  product: p
                }}} >
              
              <img src={p.image} alt={`slide ${i}`} className="slick-image" />
            </Link>
        </div>
        </Box>
      </GridItem>
    
      )
  }


  const loadFunc = () => {
    if (end > products?.length) {
      setHasMore(false)
    } else {
      setTimeout(() => {
        let newEnd = end + 5
        setEnd(newEnd)
      }, 2000);
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
            <GridItem boxShadow={3}>
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

      <div className={classNames(classes.main, classes.mainRaised)} >
        <CustomDropdown
          buttonText={`Sort by: ${sort}`}
          id="sort"
          formControlProps={{
            fullWidth: true
          }}
          align="center"
          dropdownList={dropDown}
          onClick={handleSort}
        />
        <br></br>
        <TextField 
          id="outlined-search"
          label="Search"
          type="search"
          variant="outlined"
          value={filter}
          onChange={handleFilter}/>
        <br></br>
        <GridContainer justify="center" >
          <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={hasMore}
            loader={<div className="loader" key={0}>Loading ...</div>}
            useWindow={false}
          >
            {showItems()}
          </InfiniteScroll>
        </GridContainer>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({ products: state.products.items, allProducts: state.products.allItems }),
  { fetchProducts, sortProducts, filterProducts }
)(Components);
