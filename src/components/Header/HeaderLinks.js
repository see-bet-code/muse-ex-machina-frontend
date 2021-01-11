/*eslint-disable*/
import React from "react";
// import DeleteIcon from "@material-ui/icons/Delete";
// import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

import { useAuth } from "context/use-auth";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const auth = useAuth();
  const classes = useStyles();

  const signout = async () => {
    await auth.signout()
    await window.alert("You've been signed out.");
  }
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Menu Dropdown"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              Home
            </Link>,
            <Link to="/profile-page" className={classes.dropdownLink}>
              Profile
            </Link>,
            <Link to="/login-page" className={classes.dropdownLink}>
              Login
            </Link>,
            <Link to="/signup-page" className={classes.dropdownLink}>
            Signup
          </Link>,
            <Link to="/cart" className={classes.dropdownLink}>
              Cart
            </Link>
          ]}
        />
      </ListItem>

      <ListItem className={classes.listItem}>
        {/* <Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <ExitToAppIcon />
          </IconButton>
        </Tooltip> */}
        <Tooltip
          id="logout-tooltip"
          title="Logout/end session"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="/signup-page"
            target="_self"
            className={classes.navLink}
            onClick={signout}
          >
            <ExitToAppIcon />
          </Button>
        </Tooltip>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
