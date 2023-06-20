import React, { Fragment } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    border: "1px solid #ddd",
    marginBottom: theme.spacing(2),
    textAlign: "center"
  },
  title: {
    padding: theme.spacing(2),
    fontFamily: 'Roboto',
    fontSize: '1.375rem',
    fontWeight: 500,
    lineHeight: 1.57,
    letterSpacing: '0.00714em',
    color: theme.palette.text.primary
  },  
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(2, 0)
  }
}));

export default () => {
  const classes = useStyles();
  const reload = () => {
    window.location.reload();
  };
  return (
    <Fragment>
      <Typography variant='h5' className={classes.title}>
      Thank you for completing the application process! 
      <br /> <br /> <br />
      We will review your submission and contact you with further information in due course.
      </Typography>
      <div className={classes.buttonContainer}>
        <Button variant='contained' color='primary' onClick={reload} className={classes.button}>
          Make Another Application
        </Button>
        <Button variant='contained' color='primary' onClick={reload} className={classes.button}>
          Visit School Website
        </Button>
      </div>
     
    </Fragment>
  );
};
