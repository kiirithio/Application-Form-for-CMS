import React, { createContext, useState } from "react";
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
      kcse_certificate: "",
      other_document: "",
      image: "",
      national_id: "",
      acceptTerms: false,
      newsletter: false,
      selectedFile: []
    },
    errors: {}
  });
  return (
    <ApplicantContext.Provider value={[state, setState]}>
      {props.children}
    </ApplicantContext.Provider>
  );
};
