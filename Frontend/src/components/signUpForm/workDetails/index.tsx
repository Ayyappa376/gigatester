import * as React from 'react';
import { FormControl, Grid, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const teams = [{ id: 'Abc', name: 'Abc' }, { id: 'Alpha', name: 'Alpha' }, { id: 'Others', name: 'Others' }];

const devices = [{ id: 'dvr', name: 'DVR' }, { id: 'receiver', name: 'Receiver' }];

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


  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl required style={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-required-label">Team</InputLabel>
            <Select
              id="teams"
              name="teams"
              multiple
              value={props.userParamState.teams || []}
              onChange={props.handleChangeMultiValue}
              input={<Input />}
              renderValue={(selected) => (selected as string[]).join(', ')}
              MenuProps={MenuProps}
            >
              {teams.map((opt: any, i: number) => (
                <MenuItem key={i} value={opt.id} >
                  {opt.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required style={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-required-label">Device</InputLabel>
            <Select
              id="devices"
              name="devices"
              multiple
              value={props.userParamState.devices || []}
              input={<Input />}
              renderValue={(selected) => (selected as string[]).join(', ')}
              onChange={props.handleChangeMultiValue}
              MenuProps={MenuProps}
            >
              {devices.map((opt: any, i: number) => (
                <MenuItem key={i} value={opt.id} >
                  {opt.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required style={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-required-label">Testing Experience (Years)</InputLabel>
            <Select
              id="testingExperience"
              name="testingExperience"
              value={props.userParamState.testingExperience || ''}
              onChange={props.handleChangeValue}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required style={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-required-label">Product Testing Experience</InputLabel>
            <Select
              id="productTestingExperience"
              name="productTestingExperience"
              value={props.userParamState.productTestingExperience || ''}
              onChange={props.handleChangeValue}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}