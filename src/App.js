import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Hidden
} from '@material-ui/core';
import ApplicationForm from './ApplicationForm';
import ApplicantContextProvider from "./ApplicationForm/ApplicantContext";

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
    backgroundColor: "rgb(47, 33, 95)",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(1),
    }
  },
  title: {
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(1)
  },
  subtitle: {
    color: theme.palette.primary.light,
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
    color: theme.palette.primary.contrastText,
    flexGrow: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: theme.spacing(3)
  },
  logo: {
    height: '100px',
    width: '130px',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down("sm")]: {
      height: '50px',
      width: '65px',
      marginRight: 0,
    }
  },
  top: {
    marginBottom: theme.spacing(30),
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
            <img src='ittc_logo.png' alt="Logo" className={classes.logo} />
            <Hidden xsDown>
              <Typography variant="h5" className={classes.logotitle}>
                International Teaching & Training Centre - ITTC
              </Typography>
            </Hidden>
          </Grid>
          <Grid className={classes.pagetitle} >
            <Typography variant='h4' className={classes.title}>
              Application Form
            </Typography>
            <Hidden xsDown>
              <Typography variant='h5' className={classes.subtitle}>
                Complete all steps to finish the application process
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

export default App





