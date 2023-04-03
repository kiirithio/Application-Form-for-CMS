import React, { useContext, Fragment } from "react";
import { ApplicantContext } from "./ApplicantContext";
import { makeStyles } from "@material-ui/core/styles";

//GENERAL
import {
  Typography,
  Grid,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  summary: {
    padding: theme.spacing(3),
    border: "1px solid #ddd",
    marginBottom: theme.spacing(2)
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
          <Typography variant='h4'>Confirm your Details</Typography>
        </Grid>

        <Grid item xs={12} lg={6} >
          <Typography variant='h6'>Full Name</Typography>
          <Typography variant='body2'>{applicantData.last_name+" " + applicantData.first_name+" " + applicantData.middle_name}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant='h6'>Program</Typography>
          <Typography variant='body2'>{applicantData.program}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant='h6'>Email</Typography>
          <Typography variant='body2'>{applicantData.student_email_id}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant='h6'>Student Category</Typography>
          <Typography variant='body2'>{applicantData.student_category}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant='h6'>Mobile Number</Typography>
          <Typography variant='body2'>{applicantData.student_mobile_number}</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant='h6'>Date of Birth</Typography>
          <Typography variant='body2'>{applicantData.date_of_birth}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.user.newsletter}
                color='primary'
                name='newsletter'
              />
            }
            label='Sign me up for Newsletter, to receive regular updates.'
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.user.acceptTerms}
                required
                color='primary'
                name='acceptTerms'
              />
            }
            label='I accept terms and conditions'
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};
