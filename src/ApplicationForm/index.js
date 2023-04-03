import React, { Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
//MY MODULES
import OtherDetails from "./OtherDetails";
import BasicInformation from "./BasicInformation";
import ApplicantSummary from "./ApplicantSummary";
import FormComplete from "./FormComplete";
import Attachments from "./Attachments";
import GetStarted from "./GetStarted";

//GENERAL
import { Box, Typography, Snackbar, SnackbarContent } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
//STEPPER
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
//FORM
import Button from "@material-ui/core/Button";
//CONTEXT
import { ApplicantContext } from "./ApplicantContext";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(8, 12)
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4, 6)
    }
  },
  center: {
    textAlign: "center"
  },
  content: {
    padding: theme.spacing(3, 0, 3, 5)
  },
  buttonsContainer: {
    margin: theme.spacing(2, 0)
  },
  button: {
    marginRight: theme.spacing(2)
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  footer: {
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1
    },
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0
  }
  
}));

const steps = ["Get Started", "Basic Information", "Other Details", "Attachments", "Summary"];

//MAIN COMPONENT
export default props => {
  const [completed, setCompleted] = React.useState(false);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [errors] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useContext(ApplicantContext);

  const API_URL = 'http://127.0.0.1:8007/api/method/upeoeducation.services.rest.';

  const token = '49ec9faac59a614';
  const secretKey = '2f73a8570ef8ebf';

  const applicantData = { ...state.user };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const isStepOptional = step => {
    return step === 2;
  };
  const handleCloseSnackbar = () => {
    setOpen(false);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (activeStep < steps.length - 1) handleNext();
    else {
      setCompleted(true);
    }
  };

  const handleSubmitData = e => {
    e.preventDefault();
    axios
      .post(API_URL + 'create_student_applicant', { applicantData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Secret-Key': secretKey
          }
        })
      .then(response => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    setCompleted(true)
  }
  

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <GetStarted />;
      case 1:
        return <BasicInformation />;
      case 2:
        return <OtherDetails />;
      case 3:
        return <Attachments />;
      case 4:
        return <ApplicantSummary />;
      default:
        return "Unknown step";
    }
  };

  const handleError = e => {
    errors[e.target.name] = e.target.validationMessage;
    setState({ ...state, errors: { ...errors } });
    setOpen(true);
  };

  const handleChange = e => {

    if (e.target.validity.valid) {
      //OTHER ELEMENTS
      delete errors[e.target.name];
    } else {
      errors[e.target.name] = e.target.validationMessage;
    }
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState({
      ...state,
      user: { ...state.user, [e.target.name]: value },
      errors: { ...errors }
    });
  };

  return (
    <Fragment>
      {!completed && (
        <Box className={classes.root}>
          <Stepper activeStep={activeStep} orientation='vertical'>
            {steps.map((label, index) => {
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant='caption'>Optional</Typography>
                );
              }

              return (
                <Step key={index}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                  <StepContent>
                    <form
                      onSubmit={handleSubmit}
                      onInvalid={handleError}
                      onChange={handleChange}
                      className={classes.content}
                    >
                      {getStepContent(activeStep)}
                      <div className={classes.buttonsContainer}>
                        <Button
                          disabled={activeStep === 0}
                          className={classes.button}
                          variant='contained'
                          onClick={handleBack}
                        >
                          Back
                        </Button>
                        {activeStep < steps.length - 1 && (
                          <Button
                            type='submit'
                            className={classes.button}
                            variant='contained'
                            color='primary'
                          >
                            Next
                          </Button>
                        )}
                        {activeStep === steps.length - 1 && (
                          <Button
                            type='submit'
                            onClick={handleSubmitData}
                            className={classes.button}
                            variant='contained'
                            color='primary'
                          >
                            Submit
                          </Button>
                        )}
                      </div>
                    </form>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        resumeHideDuration={3000}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        open={open}
      >
        <SnackbarContent
          className={(classes.error, classes.error)}
          message={
            <span className={classes.message}>
              <ErrorIcon className={classes.icon} />
              {"Please correct the data"}
            </span>
          }
        />
      </Snackbar>
      {completed && (
        <Box className={(classes.root, classes.center)}>
          <FormComplete />
        </Box>
      )}
    <Typography variant='caption' className={classes.footer}>© Copyright 2023 | Upeosoft Limited</Typography>
    </Fragment>
  );
};
