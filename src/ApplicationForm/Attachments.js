import React, { useContext } from "react";

//GENERAL
import { TextField, Grid } from "@material-ui/core";
//CONTEXT
import { ApplicantContext } from "./ApplicantContext";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../constants";

export default props => {
  const [state] = useContext(ApplicantContext);
  const { user, errors } = state;
  const [selectedFile, setSelectedFile] = useState({ data: null, name: "" });
  

  const handleChange = (event) => {
    event.preventDefault();
  
    if (selectedFile) {
      console.log(selectedFile);
  
      axios
        .post(API_URL + "post_applicant_file", { 
          filename: selectedFile.name,
          file_data: selectedFile.data
        }, {
          // headers: {
          //   "Content-Type": "multipart/form-data",
          //   Authorization: `Bearer ${token}`
          // },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6} >
        <TextField
          name='kcse_certificate'
          type='file'
          label='KCSE Certificate'
          helperText='PDF, Word or Scanned Image'
          variant='outlined'
          multiple={false}
          onDone={({ base64, name }) => {
            handleChange(base64, name);
            setSelectedFile({ data: base64, name: name });
          }}          
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["kcse_certificate"]}
        />
      </Grid>
      <Grid item xs={12} lg={6} >
        <TextField
          type='file'
          name='other_document'
          label='Other Relevant Document'
          value={user.other_document}
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["other_document"]}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={6} >
        <TextField
          type='file'
          name='image'
          label='Passport Photo'
          value={user.image}
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["image"]}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={6} >
        <TextField
          type='file'
          name='national_id'
          label='Identity Document'
          helperText='If Applicable'
          value={user.national_id}
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["national_id"]}
          fullWidth
        />
      </Grid>

    </Grid>
  );
};
