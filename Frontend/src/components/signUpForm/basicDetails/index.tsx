import * as React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import '../../../css/assessments/style.css';

export default function BasicDetailsForm(props: any) {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="standard-basic"
            label="First name"
            fullWidth
            {...props.bindFirstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            label="Last name"
            fullWidth
            {...props.bindLastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            label="Address line 1"
            fullWidth
            {...props.bindAddress1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            label="Address line 2"
            fullWidth
            {...props.bindAddress2}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            label="City"
            fullWidth
            {...props.bindCity}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required style={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-required-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              {...props.bindState}
              // disabled
              readOnly
            // value={age}
            // onChange={handleChange}
            // className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            label="Zip / Postal code"
            fullWidth
            {...props.bindZip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required style={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-required-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              {...props.bindCountry}
              readOnly
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            type="email"
            label="Email"
            fullWidth
            {...props.bindEmail}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phone"
            label="Phone Number"
            type="tele"
            fullWidth
            {...props.bindPhone}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="password"
            type="password"
            label="Password"
            fullWidth
            {...props.bindPassword}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            fullWidth
            autoComplete="confirmPassword"
            variant="standard"
            {...props.bindConfirmPassword}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}