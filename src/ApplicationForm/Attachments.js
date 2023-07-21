import React, { useState, useContext, forwardRef, useImperativeHandle } from "react";
import { TextField, Grid } from "@material-ui/core";
import axios from "axios";
import { API_URL } from "../constants";
import { ApplicantContext } from "./ApplicantContext";

const generateRandomString = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const Attachments = forwardRef(({ onSubmit }, ref) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];
  const [kcse_certificate, setKcse_certificate] = useState(null);
  const [identity_document, setIdentity_document] = useState(null);
  const [state] = useContext(ApplicantContext);
  const { user, errors } = state;

  const handleKcseCertificateChange = (event) => {
    setKcse_certificate(event.target.files[0]);
  };

  const handleIdentityDocumentChange = (event) => {
    setIdentity_document(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const randomString = generateRandomString(8);
      user.random_string = randomString;

      const formData = new FormData();
      formData.append("random_string", randomString);
      formData.append("kcse_certificate", kcse_certificate);
      formData.append("identity_document", identity_document);

      const response = await axios.post(API_URL + "post_documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response from the backend:", response.data);

      // Call the onSubmit prop to trigger the submission in the parent component (optional)
      if (typeof onSubmit === "function") {
        onSubmit();
      }
    } catch (error) {
      console.error("Error Uploading Documents:", error);
    }
  };

  // Expose the handleSubmit function to the parent component using the ref
  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <Grid container spacing={2}>
      {/* Your form fields here */}
      <Grid item xs={12} lg={6}>
        <TextField
          type="file"
          inputProps={{ accept: allowedFileTypes.join(",") }}
          variant="outlined"
          name="kcse_certificate"
          margin="normal"
          helperText="Upload Scanned KCSE Certificate"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          onChange={handleKcseCertificateChange}
          error={!!errors["kcse_certificate"]}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          type="file"
          inputProps={{ accept: allowedFileTypes.join(",") }}
          variant="outlined"
          name="identity_document"
          margin="normal"
          helperText="Upload Scanned National ID/Passport"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          onChange={handleIdentityDocumentChange}
          error={!!errors["kcse_certificate"]}
        />
      </Grid>
    </Grid>
  );
});

export default Attachments;
