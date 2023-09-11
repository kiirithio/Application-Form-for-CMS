import React, { createContext, useState, useEffect } from "react";
export const ApplicantContext = createContext([{}, () => {}]);

export default props => {
  const [state, setState] = useState({
    user: {
      first_name: "",
      middle_name: "",
      last_name: "",
      student_email_id: "",
      student_mobile_number: "",
      kcse_grade: "",
      kcse_index_number: "",
      student_category: "",
      program: "",
      academic_year: "",
      academic_term: "",
      date_of_birth: "",
      gender: "",
      address_line_1: "",
      town: "",
      county: "",
      country: "",
      kcse_certificate: [],
      other_document: "",
      identity_document: "",
      national_id: "",
      acceptTerms: false,
      newsletter: false,
      selectedFile: [],
      referral: "",
      random_string: ""
    },

    errors: {},
    referrer: {
      first_name: "",
      last_name: "",
      email: "",
      mobile_number: "",
      referrer_parameter: "",
      referral: "" 
    }
  });

  useEffect(() => {
    // Function to extract referral parameter from URL
    const getReferralParameter = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const referralParam = urlParams.get("referral");

      if (referralParam) {
        setState(prevState => ({
          ...prevState,
          user: {
            ...prevState.user,
            referral: referralParam
          }
        }));
      }
    };

    getReferralParameter();
  }, []);


  return (
    <ApplicantContext.Provider value={[state, setState]}>
      {props.children}
    </ApplicantContext.Provider>
  );
};
