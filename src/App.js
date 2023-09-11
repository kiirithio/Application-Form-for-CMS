import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Hidden
} from '@material-ui/core';
import ApplicationForm from './ApplicationForm';
import ApplicantContextProvider from "./ApplicationForm/ApplicantContext";
import { primaryColor, titleColor, titleFont } from './constants';

// const title2Color = 'linear-gradient(to right, #f45c20, #ff7f50)'; 
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    alignContent: "stretch",
    [theme.breakpoints.down("sm")]: {
      alignContent: "flex-start"
    }
  },
  header: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: primaryColor,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(1),
    }
  },
  title: {
    color: titleColor,
    marginBottom: theme.spacing(2),
    fontFamily: titleFont,
    [theme.breakpoints.down("sm")]: {
      fontSize: '18px',
    }
  },
  subtitle: {
    color: titleColor,
    fontFamily: titleFont,
    [theme.breakpoints.down("sm")]: {
      "& .MuiTypography-root": {
        display: "none"
      },
      "& .MuiTypography-root + .MuiTypography-root": {
        display: "block",
        marginLeft: theme.spacing(1),
        marginBottom: 0,
        flexGrow: 0
      }
    }
  },
  logotitle: {
    color: titleColor,
    flexGrow: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: theme.spacing(3)
  },
  logo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '60px',
    borderRadius: '10px',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      
      height: '30px',
      marginBottom: theme.spacing(0),
    }
  },
  top: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(2),
    }
  },
  pagetitle: {
    paddingTop: theme.spacing(3),
  }
}));

function App() {
  const classes = useStyles();

  return (
    <ApplicantContextProvider>
      <Grid container className={classes.root}>
        <Grid item className={classes.header} xs={12} md={4}>
          <Grid className={classes.top} >
            <img src='rakti.jpg' alt="Logo" className={classes.logo} />
            <Hidden xsDown>
              <Typography variant="h4" className={classes.logotitle}>
                Rural Aid Kenya Foundation
              </Typography>
            </Hidden>
          </Grid>
          <Grid className={classes.pagetitle} >
            <Typography variant='h5' className={classes.title}>
              Application Form
            </Typography>
            <Hidden xsDown>
              <Typography variant='h6' className={classes.subtitle}>
                Complete all steps to finish the application process.
              </Typography>
            </Hidden>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <ApplicationForm />
        </Grid>
      </Grid>
    </ApplicantContextProvider>
  );
}

export default App;