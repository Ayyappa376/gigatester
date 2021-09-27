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
            id="firstName"
            name="firstName"
            label="First name"
            value={props.userParamState.firstName || ''}
            fullWidth
            onChange={props.handleChangeValue}
          />
        </Grid>
        <Grid item xs={12} sm={2} />
        <Grid item xs={12} sm={5}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last name"
            value={props.userParamState.lastName || ''}
            fullWidth
            onChange={props.handleChangeValue}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            value={props.userParamState.address1 || ''}
            fullWidth
            onChange={props.handleChangeValue}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            value={props.userParamState.address2 || ''}
            fullWidth
            onChange={props.handleChangeValue}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={props.userParamState.city || ''}
            fullWidth
            onChange={props.handleChangeValue}
          />
        </Grid>
        <Grid item xs={12} sm={2} />
        <Grid item xs={12} sm={5}>
          <FormControl required style={{ width: '100%' }}>
            <InputLabel id="state">State</InputLabel>
            <Select
              id="state"
              name="state"
              value={props.userParamState.state || ''}
              onChange={props.handleChangeValue}
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
            id="zipCode"
            name="zipCode"
            label="Zip / Postal Code"
            value={props.userParamState.zipCode || ''}
            fullWidth
            onChange={props.handleChangeValue}
          />
        </Grid>
        <Grid item xs={12} sm={2} />
        <Grid item xs={12} sm={5}>
          <FormControl required style={{ width: '100%' }}>
            <InputLabel id="country">Country</InputLabel>
            <Select
              id="country"
              name="country"
              value={props.userParamState.country || ''}
              onChange={props.handleChangeValue}
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
            id="emailId"
            name="emailId"
            label="Email Id"
            value={props.userParamState.emailId || ''}
            fullWidth
            onChange={props.handleChangeValue}
          />
        </Grid>
        <Grid item xs={12} sm={2} />
        <Grid item xs={12} sm={5}>
          <TextField
            id="phone"
            name="phone"
            label="Phone Number"
            type="tele"
            value={props.userParamState.phone || ''}
            fullWidth
            onChange={props.handleChangeValue}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}