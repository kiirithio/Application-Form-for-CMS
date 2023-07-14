import React, { Fragment} from "react";
import { Typography, Button, Card, CardContent, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { API_URL, buttonColor, buttonHoverColor } from "../constants";
import axios from "axios";


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
    fontSize: '1.175rem',
    fontWeight: 500,
    lineHeight: 1.57,
    letterSpacing: '0.00714em',
    color: theme.palette.text.primary,
    textAlign: "center"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(3),
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(8)
    },
  },
  card: {
    margin: "auto",
    marginTop: theme.spacing(12),
    maxWidth: 600,
    textAlign: "center",
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("sm")]: {
      boxShadow: theme.shadows[3] 
    }
  },
  cardButtons: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: buttonColor,
    '&:hover': {
      backgroundColor: buttonHoverColor, 
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    }
  }
}));

const open_school_website = () => {
  axios.get(API_URL + "get_school_website")
    .then(response => {
      const schoolWebsite = response.data.message;
      window.open(schoolWebsite, "_blank");
    })
    .catch(error => {
      console.error(error);
    });
};


export default () => {
  const classes = useStyles();
  const reload = () => {
    window.location.reload();
  };
  return (
    <Fragment>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h5' className={classes.title}>
            Thank you for completing the application process! 
            <br /><br /><br />
            We will review your submission and contact you with further information in due course.
          </Typography>
          <div className={classes.cardButtons}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={reload}
                  fullWidth
                  className={classes.button}
                >
                  Make Another Application
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={open_school_website}
                  fullWidth
                  className={classes.button}
                >
                  Visit School Website
                </Button>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};
