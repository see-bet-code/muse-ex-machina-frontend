import React, {useRef, useState, useCallback} from "react";
import Webcam from "react-webcam"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
// import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import { useAuth } from "context/use-auth";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const auth = useAuth();
  const [show, setShow] = useState(false)
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");

  
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc)
    setImgSrc(imageSrc)
  }, [webcamRef, setImgSrc]);
    

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    formData.append('name', e.target.first.value);
    formData.append('username', e.target.username.value);
    formData.append('email', e.target.email.value);
    formData.append('password', e.target.pass.value);
    formData.append('avatar', e.target.av.files[0]);
    if (imgSrc) {
      fetch(imgSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "File name",{ type: "image/png" })
          formData.append('avatar', file)
          auth.signup(formData)
          props.history.push("/profile-page")
        })
    } else {
      auth.signup(formData)
      props.history.push("/profile-page")
    }
    
  }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Muse Ex Machina"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(https://www.microsoft.com/inculture/uploads/prod/2020/09/rag-and-bone-header.gif)",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Signup</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>or</p>
                  <CardBody>
                    <CustomInput
                      labelText="Username..."
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <AlternateEmailIcon position="end">
                            <People className={classes.inputIconsColor} />
                          </AlternateEmailIcon>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                    <CustomInput
                      labelText="First Name..."
                      id="first"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Avatar"
                      id="av"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "file",
                        endAdornment: (
                          <InputAdornment position="end">
                            <AccountCircleIcon className={classes.inputIconsColor}>
                              lock_outline
                            </AccountCircleIcon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                    <Button justify="right" onClick={() =>setShow(!show)}>
                      <AddAPhotoIcon/>
                    </Button>
                    {show && <>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/png"
                      />
                      <Button onClick={capturePhoto}>Capture photo</Button>
                      {imgSrc && (
                        <img
                          src={imgSrc} alt="webcam capture"
                        />
                      )}
                    </>}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" type="submit">
                      Get started
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
