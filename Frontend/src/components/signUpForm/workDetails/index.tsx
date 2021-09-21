import * as React from 'react';
import { FormControl, Grid, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const teams = [
  'Abc',
  'Alpha',
  'Others',
];

const devices = [
  'DVR',
  'Receiver',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

function getStyles(name: any, personName: any, theme: any) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function WorkDetailsForm(props: any) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (e: any) => {
    setPersonName(e.target.value);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl required style={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-required-label">Team</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              multiple
              {...props.bindTeams}
              MenuProps={MenuProps}
            >
              {teams.map((name) => (
                <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required style={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-required-label">Device Details</InputLabel>
            <Select
              labelId="demo-mutiple-name-label"
              id="demo-mutiple-name"
              multiple
              {...props.bindDevices}
            >
              {devices.map((name) => (
                <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required style={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-required-label">Testing Experience</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              {...props.bindTestingExperience}
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
          <FormControl required style={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-required-label">Product Testing Experience</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              {...props.bindProdTestExperience}
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
      </Grid>
    </React.Fragment>
  );
}