import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Person from '@material-ui/icons/Person'
// core components
import Header from "../../../components/Header/Header";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Button from "../../../components/CustomButtons/Button";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardBody from "../../../components/Card/CardBody";
import CustomInput from "../../../components/CustomInput/CustomInput";
import CardFooter from "../../../components/Card/CardFooter";

import styles from "../../../assets/jss/material-kit-react/views/loginPage.js";
import image from "../../../assets/img/temple-trees.jpg";

// --------- HELPER FUNCTION --------------------------- //
import {attemptSignUp} from "../helpers/helper";

const SignUp = props => {
  
  // --------- DECLARING STATE --------------------------- //
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  // --------- CARD DROP-DOWN STYLE --------------------- //
  const useStyles = makeStyles(styles);
  setTimeout(function() {
    setCardAnimation("");
  }, 400);
  const classes = useStyles();

  return (
    <div>
      <Header
        color="transparent"
        brand="TRIPPER"
        fixed
        user={props.user}
        setUser={props.setUser}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container} style={{ width: "500px" }}>
          <GridContainer>
            <GridItem>
              <Card className={classes[cardAnimaton]}>
                <form
                  className={classes.form}
                  onSubmit={event => {
                    attemptSignUp(
                      event,
                      userFirstName,
                      userLastName,
                      userEmail,
                      userPassword,
                      setError,
                      props.setUser
                    );
                  }}
                >
                  {props.user ? history.goBack() : null}

                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4>SIGN UP</h4>
                  </CardHeader>

                  <CardBody>
                    <p className="length-error">{error}</p>

                    <CustomInput
                      labelText="First Name"
                      id="first_name"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        type: "text",
                        value: userFirstName,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Person className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        onChange: e => {
                          setUserFirstName(e.target.value);
                        }
                      }}
                    />
                    <CustomInput
                      labelText="Last Name"
                      id="last_name"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        type: "text",
                        value: userLastName,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Person className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        onChange: e => {
                          setUserLastName(e.target.value);
                        }
                      }}
                    />
                    <CustomInput
                      labelText="Email"
                      id="email"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        type: "email",
                        value: userEmail,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        onChange: e => {
                          setUserEmail(e.target.value);
                        }
                      }}
                    />

                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        value: userPassword,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                        onChange: e => {
                          setUserPassword(e.target.value);
                        }
                      }}
                    />
                  </CardBody>

                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="info" size="lg">
                      Sign Up
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
};
export default SignUp;