import React, { useContext, useState } from 'react';
import { TextField, Grid } from "@material-ui/core";
import { ApplicantContext } from "./ApplicantContext";

export default props => {
  const [state] = useContext(ApplicantContext);
  const { user, errors } = state;

  const [phoneNumber, setPhoneNumber] = useState(user.student_mobile_number);

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
    </Grid>
  );
};
