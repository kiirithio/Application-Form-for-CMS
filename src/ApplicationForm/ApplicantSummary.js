import React, { useContext, Fragment } from "react";
import { ApplicantContext } from "./ApplicantContext";
import { makeStyles } from "@material-ui/core/styles";

//GENERAL
import {
  Typography,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  summary: {
    padding: theme.spacing(3),
    border: "1px solid #ddd",
    marginBottom: theme.spacing(2)
  },
  boldText: {
    fontWeight: 'bold'
  }
}));

// SUMMARY COMPONENT
export default props => {
  const classes = useStyles();
  const [state] = useContext(ApplicantContext);

  const applicantData = { ...state.user };
  
  return (
    <Fragment>
      <Grid container className={classes.summary}>
        <Grid item xs={12}>
          <Typography variant='h6'><strong>Confirm your Details</strong></Typography>
        </Grid>

        <Grid item xs={12} lg={6} >
          <Typography variant='subtitle2'><strong>Full Name</strong></Typography>
          <Typography variant='body2'>{applicantData.last_name+" " + applicantData.first_name+" " + applicantData.middle_name}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant='subtitle2'><strong>Program</strong></Typography>
          <Typography variant='body2'>{applicantData.program}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant='subtitle2'><strong>Email</strong></Typography>
          <Typography variant='body2'>{applicantData.student_email_id}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant='subtitle2'><strong>Student Category</strong></Typography>
          <Typography variant='body2'>{applicantData.student_category}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant='subtitle2'><strong>Mobile Number</strong></Typography>
          <Typography variant='body2'>{applicantData.student_mobile_number}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant='subtitle2'><strong>Date of Birth</strong></Typography>
          <Typography variant='body2'>{applicantData.date_of_birth}</Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};
