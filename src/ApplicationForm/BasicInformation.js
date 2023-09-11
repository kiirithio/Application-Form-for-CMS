
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
//GENERAL
import { TextField, Grid, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
//CONTEXT
import { ApplicantContext } from "./ApplicantContext";
import { API_URL } from "../constants";

export default props => {

  const [state] = useContext(ApplicantContext);
  const { user, errors } = state;


  const [programs, setPrograms] = useState([]);
  const [studentCategories, setStudentCategories] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [academicTerms, setAcademicTerms] = useState([]);

  useEffect(() => {
    let isMounted = true; // track whether the component is mounted or not

    async function fetchData(endpoint, setState) {
      const response = await axios.get(API_URL + endpoint);
      const data = JSON.parse(response.data.message);
      if (isMounted) { // check if component is still mounted before updating state
        setState(data);
      }
    }

    fetchData('get_programs', setPrograms);
    fetchData('get_student_categories', setStudentCategories);
    fetchData('get_academic_years', setAcademicYears);
    fetchData('get_academic_terms', setAcademicTerms);

    return () => {
      isMounted = false; // set isMounted to false when component unmounts
    };
  }, []);


  const useFormInput = (initialValue, key) => {
    const [value, setValue] = React.useState(initialValue);
    const handleChange = (event) => {
      setValue(event.target.value);
      user[key] = event.target.value;
    };
    return [value, handleChange];
  };

  const [program, handleProgramChange] = useFormInput('', 'program');
  const [student_category, handleStudentCategoryChange] = useFormInput('', 'student_category');
  const [academic_year, handleAcademicYearChange] = useFormInput('', 'academic_year');
  const [academic_term, handleAcademicTermChange] = useFormInput('', 'academic_term');


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={4} >
        <TextField
          placeholder='First Name'
          name='first_name'
          label='First Name'
          value={user.first_name}
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          required
          error={!!errors["first_name"]}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={4} >
        <TextField
          placeholder='Middle Name'
          name='middle_name'
          label='Middle Name'
          value={user.middle_name}
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["middle_name"]}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={4} >
        <TextField
          placeholder='Last Name'
          name='last_name'
          label='Surname'
          value={user.last_name}
          variant='outlined'
          required
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["last_name"]}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          placeholder='Email Address'
          name='student_email_id'
          label='Email'
          value={user.student_email_id}
          type='email'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["student_email_id"]}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          placeholder="Input mobile number 07..."
          name='student_mobile_number'
          value={user.student_mobile_number}
          label='Mobile Number'
          variant='outlined'
          margin='normal'
          inputProps={{
            minLength: 9,
            maxLength: 10,
            pattern: "^[+]?[0-9]*$",
            inputMode: "numeric",
            readOnly: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["student_mobile_number"]}
          required
          fullWidth
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          placeholder='KCSE or KCPE Grade'
          name='kcse_grade'
          label='KCSE/KCPE Grade'
          value={user.kcse_grade}
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["kcse_grade"]}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          placeholder='KCSE or KCPE Index No.'
          name='kcse_index_number'
          label='KCSE/KCPE Index Number'
          value={user.kcse_index_number}
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <FormControl variant="outlined" fullWidth margin='normal'>
          <InputLabel>Course</InputLabel>
          <Select
            value={program}
            name='program'
            onChange={handleProgramChange}
            label="Course"
            required
            error={!!errors["program"]}
          >
            {programs.map((program, index) => (
              <MenuItem key={index} value={program.program_name}>{program.program_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={6}>
        <FormControl variant="outlined" fullWidth margin='normal'>
          <InputLabel>Student Category</InputLabel>
          <Select
            value={student_category}
            name='student_category'
            onChange={handleStudentCategoryChange}
            label="Student Category"
            required
            error={!!errors["student_category"]}
          >
            {studentCategories.map((studentCategory, index) => (
              <MenuItem key={index} value={studentCategory.category}>{studentCategory.category}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={6}>
        <FormControl variant="outlined" fullWidth margin='normal'>
          <InputLabel>Academic Year</InputLabel>
          <Select
            value={academic_year}
            name='academic_year'
            onChange={handleAcademicYearChange}
            label="Academic Year"
            required
            error={!!errors["academic_year"]}
          >
            {academicYears.map((academicYear, index) => (
              <MenuItem key={index} value={academicYear.academic_year_name}>{academicYear.academic_year_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={6}>
        <FormControl variant="outlined" fullWidth margin='normal'>
          <InputLabel>Academic Term</InputLabel>
          <Select
            value={academic_term}
            name='academic_term'
            onChange={handleAcademicTermChange}
            label="Academic Term"
            required
            error={!!errors["academic_term"]}
          >
            {academicTerms.map((academicTerm, index) => (
              <MenuItem key={index} value={academicTerm.term_name}>{academicTerm.term_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};