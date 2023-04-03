import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
//GENERAL
import { TextField, Grid } from "@material-ui/core";
//CONTEXT
import { ApplicantContext } from "./ApplicantContext";

export default props => {

  const [state] = useContext(ApplicantContext);
  const { user, errors } = state;

  const API_URL = 'http://127.0.0.1:8007/api/method/upeoeducation.services.rest.';

  const [phoneNumber, setPhoneNumber] = useState(user.student_mobile_number);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (phoneNumber && phoneNumber.toString().length > 8 && !isNaN(phoneNumber)) {
        axios
          .post(API_URL + "post_applicant_phone_number", { phoneNumber: phoneNumber })
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [phoneNumber]);


  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <TextField
          placeholder="Type your mobile number"
          type="tel"
          name='student_mobile_number'
          value={phoneNumber}
          label='Mobile Number'
          variant='outlined'
          margin='normal'
          inputProps={{
            minLength: 9,
            maxLength: 15,
            pattern: "^[+]?[0-9]*$",
            inputMode: "numeric"
          }}
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["student_mobile_number"]}
          required
          fullWidth
          onChange={handlePhoneNumberChange}
        />
      </Grid>
    </Grid >
  );
};