import * as React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import '../../../css/assessments/style.css';

export default function BasicDetailsForm(props: any) {
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={5}>
          <TextField
            required
            id="standard-basic"
            label="First name"
            fullWidth
            {...props.bindFirstName}
          />
        </Grid>
        <Grid item xs={12} sm={2} />
        <Grid item xs={12} sm={5}>
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
        <Grid item xs={12} sm={5}>
          <TextField
            required
            id="city"
            label="City"
            fullWidth
            {...props.bindCity}
          />
        </Grid>
        <Grid item xs={12} sm={2} />
        <Grid item xs={12} sm={5}>
          <FormControl required style={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-required-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              {...props.bindState}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'alabama'}>Alabama</MenuItem>
              <MenuItem value={'alaska'}>Alaska</MenuItem>
              <MenuItem value={'arizona'}>Arizona</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            required
            id="zip"
            label="Zip / Postal Code"
            fullWidth
            {...props.bindZip}
          />
        </Grid>
        <Grid item xs={12} sm={2} />
        <Grid item xs={12} sm={5}>
          <FormControl required style={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-required-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              {...props.bindCountry}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'unitedStates'}>United States</MenuItem>
              {/* <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            required
            id="email"
            type="email"
            label="Email"
            fullWidth
            {...props.bindEmail}
          />
        </Grid>
        <Grid item xs={12} sm={2} />
        <Grid item xs={12} sm={5}>
          <TextField
            id="phone"
            label="Phone Number"
            type="tele"
            fullWidth
            {...props.bindPhone}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            required
            id="password"
            type="password"
            label="Password"
            fullWidth
            {...props.bindPassword}
          />
        </Grid>
        <Grid item xs={12} sm={2} />
        <Grid item xs={12} sm={5}>
          <TextField
            required
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            fullWidth
            {...props.bindConfirmPassword}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}