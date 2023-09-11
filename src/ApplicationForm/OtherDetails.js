import React, { useContext, useEffect, useState  } from "react";
import axios from 'axios';
//GENERAL
import { TextField, Grid, Select, MenuItem, FormControl, InputLabel} from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";
//CONTEXT
import { ApplicantContext } from "./ApplicantContext";
import { API_URL } from "../constants";

export default props => {
  const [state] = useContext(ApplicantContext);
  const { user, errors } = state;
  const dateLimit = new Date();
  dateLimit.setFullYear(dateLimit.getFullYear() - 16);


  const [genders, setGenders] = useState([]);
  const [counties, setCounties] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchData(endpoint, setState) {
      const response = await axios.get(API_URL + endpoint);
      const data = JSON.parse(response.data.message);
      if (isMounted) {
      setState(data); }
    }
    fetchData('get_genders', setGenders);
    fetchData('get_counties', setCounties);
    fetchData('get_countries', setCountries)

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
  const [gender, handleGenderChange] = useFormInput('', 'gender');
  const [county, handleCountyChange] = useFormInput('', 'county');
  const [country, handleCountryChange] = useFormInput('', 'country');


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6} >
        <TextField
          placeholder='Select your date of birth'
          name='date_of_birth'
          type='date'
          label='Date of Birth'
          value={user.date_of_birth}
          helperText='You need to be at least 16 years old'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            min: "1920-01-01",
            max: dateLimit.toISOString().slice(0, 10)
          }}
          error={!!errors["date_of_birth"]}
          fullWidth={isWidthDown("sm")}
          required
        />
      </Grid>
      <Grid item xs={12} lg={6} >
        <FormControl variant="outlined" fullWidth margin='normal'>
          <InputLabel>Gender</InputLabel>
          <Select
            value={gender}
            name= 'gender'
            onChange={handleGenderChange}
            label="Gender"
            error={!!errors["gender"]}
            required
          >
            {genders.map((gender, index) => (
              <MenuItem key={index} value={gender.gender}>{gender.gender}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={6} >
        <TextField
          placeholder='Type your Postal Address'
          name='address_line_1'
          label='Postal Address'
          margin='normal'
          value={user.address_line_1}
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["address_line_1"]}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          placeholder='Type town of residence'
          name='town'
          label='Town'
          value={user.town}
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["town"]}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <FormControl variant="outlined" fullWidth margin='normal'>
          <InputLabel>Country</InputLabel>
          <Select
            value={country}
            name= 'country'
            onChange={handleCountryChange}
            label="Country"
            error={!!errors["country"]}
          >
            {countries.map((country, index) => (
              <MenuItem key={index} value={country.country_name}>{country.country_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {country === 'Kenya' && (
      <Grid item xs={12} lg={6}>
        <FormControl variant="outlined" fullWidth margin='normal'>
          <InputLabel>County</InputLabel>
          <Select
            value={county}
            name= 'county'
            onChange={handleCountyChange}
            label="County"
            error={!!errors["county"]}
          >
            {counties.map((county, index) => (
              <MenuItem key={index} value={county.county}>{county.county}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      )}
    </Grid>
  );
};
