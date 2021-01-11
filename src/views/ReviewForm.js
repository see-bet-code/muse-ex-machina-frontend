import React, { useState } from "react";
import { useLocation } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from '@material-ui/core';
// @material-ui/icons
import StarBorderIcon from '@material-ui/icons/StarBorder';
// @material-ui/lab
import { Rating } from '@material-ui/lab';
// core components
import Header from "components/Header/Header";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import styles from "assets/jss/material-kit-react/views/profilePage.js"
const useStyles = makeStyles(styles);

export default function ReviewForm(props) {

  const {review} = useLocation().state;
  const { ...rest } = props;

  const classes = useStyles();

  const [state, setState] = useState({rating: review.rating, description: review.description})

  const handleSubmit = async () => {
    await fetch(`http://localhost:3000/api/v1/reviews/${review.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(state),
    })
    await props.history.push('/profile-page')
  }

  const showForm = () => {
    return <>
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
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
              <h2><b>REVIEW:</b> {review.product.title}</h2>
              <img src={review.product.image} alt={`${review.product.title}`} />
              <Rating
                name="hover-feedback"
                color="primary"
                value={state.rating}
                precision={0.5}
                onChange={(e, newValue) => setState({...state, rating: newValue}) }
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                size="large"
              /><br></br>
              <TextField
                multiline={true}
                rows="3"
                placeholder="Add any comments here"
                value={state.description}
                onChange={(e) => setState({...state, description: e.target.value})}
              />
              <br></br>
              <Button align="center" color="primary" onClick={handleSubmit}>Submit</Button>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      
  </>
  }

  console.log(state)
  return (
    <>
      {review && showForm()}
    </>
  );
}