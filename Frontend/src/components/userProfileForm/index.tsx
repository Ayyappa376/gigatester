import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
import { Http } from '../../utils';
import { useHistory } from "react-router-dom";
import {
  Grid,
  makeStyles,
  TextField,
  Button,
  // FormControl,
  // MenuItem,
  // Select,
  // InputLabel,
  // Input,
  // Chip,
} from "@material-ui/core";
import MultipleSelect from '../../common/multiSelect';
import { IDeviceInfo, IPlatformInfo, IUserParams, IUserAttributes } from "../../model";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import DevicesOutlinedIcon from "@material-ui/icons/DevicesOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const useStyles = makeStyles(() => ({
  topBar: {
    width: "100%",
    height: "40px",
    boxShadow: "0px 2px 8px #00000033",
    // opacity: 1,
    fontSize: "15px",
    marginTop: "1em",
    background: "#F0F0F0",
    color: "#000000",
    // padding: '8px'
  },
  formControl: {
    minWidth: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

export default function ProfileForm(props: any) {
  const classes = useStyles();
  const { userState, userDataFetched, getUserParamState } = props;
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [allPlatforms, setAllPlatforms] = useState<IPlatformInfo[]>([]);
  const [allDevices, setAllDevices] = useState<IDeviceInfo[]>([]);
  const history = useHistory();

  useEffect(() => {
    fetchAllPlatforms();
    fetchAllDevices();
  }, []);

  const handleChangeValue = (event: any) => {
    if (userState) {
      const temp: IUserParams | null | undefined = { ...userState };
      if (temp) {
        temp.values[event.target.name] = event.target.value;
      }
      getUserParamState(temp);
    }
  };

  const fetchAllPlatforms = () => {
    Http.get({
      url: `/api/v2/platforms`,
      state: stateVariable,
    })
      .then((response: any) => {
        response.platforms.sort((a: IPlatformInfo, b: IPlatformInfo) => {
          return a.name.localeCompare(b.name);
        });
        setAllPlatforms(response.platforms);
      })
      .catch((error: any) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 401) {
          history.push('/relogin');
        } else {
          history.push('/error');
        }
      })
  };

  const fetchAllDevices = () => {
    Http.get({
      url: `/api/v2/devices`,
      state: stateVariable,
    })
      .then((response: any) => {
        response.devices.sort((a: IDeviceInfo, b: IDeviceInfo) => {
          return a.name.localeCompare(b.name);
        });
        setAllDevices(response.devices);
      })
      .catch((error: any) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 401) {
          history.push('/relogin');
        } else {
          history.push('/error');
        }
      })
  };

  const handleChangeMultiValue = (event: any) => {
    if (userState) {
      const temp: IUserParams | null | undefined = { ...userState };
      let valueArray = temp && temp.values[event.target.name] || [];
      valueArray = [...event.target.value];
      temp!.values[event.target.name] = valueArray;
      getUserParamState(temp);
    }
  };

  // const renderChips = (selected: any, el: string) => {
  //   return (
  //     <div className={classes.chips}>
  //       {(selected as string[]).map((value) => (
  //         <Chip
  //           key={value}
  //           label={el === 'teams' ? teams.find((t: ITeamInfo) => t.teamId === value)!.teamName : value}
  //           className={classes.chip}
  //         />
  //       ))}
  //     </div>
  //   );
  // };

  const renderElements = (el: string) => {
    const element: IUserAttributes = userState!.config[el];
    const values = userState ? userState.values : null;
    switch (element.type) {
      case "string":
        return (
          <TextField
            required={element.Mandatory}
            type="string"
            id={el}
            name={el}
            value={values ? (values[el] ? values[el] : "") : ""}
            label={element.displayName}
            disabled={el === "emailId"}
            onChange={handleChangeValue}
            fullWidth
            autoComplete="off"
            className="textFieldStyle"
          />
        );
      case "number":
        return (
          // <div className='numberInput'>
          <TextField
            required={element.Mandatory}
            type="number"
            id={el}
            name={el}
            value={values ? (values[el] ? values[el] : 0) : 0}
            label={element.displayName}
            onChange={handleChangeValue}
            fullWidth
            autoComplete="off"
            InputProps={{ disableUnderline: true }}
            className="textFieldStyle"
          />
          // </div>
        );

      // case 'list':
      //   return (
      //     <FormControl className={classes.formControl}>
      //       <InputLabel
      //         id='demo-simple-select-label'
      //         required={element.Mandatory}
      //       >
      //         {element.displayName}
      //       </InputLabel>
      //       <Select
      //         name={el}
      //         value={values ? (values[el] ? values[el] : '') : ''}
      //         onChange={handleChangeValue}
      //       >
      //         {element.options.map((opt: string) => {
      //           return (
      //             <MenuItem key={opt} value={opt}>
      //               {
      //                 el === 'teams'
      //                   ? teams.find((t: ITeamInfo) => t.teamId === opt)!.teamName
      //                   : opt
      //               }
      //             </MenuItem>
      //           );
      //         })}
      //       </Select>
      //     </FormControl>
      //   );
      //   case 'multi-list':
      //     return (
      //       <FormControl className={classes.formControl}>
      //         <InputLabel
      //           id='demo-mutiple-chip-label'
      //           required={element.Mandatory}
      //         >
      //           {element.displayName}
      //         </InputLabel>
      //         <Select
      //           id='demo-mutiple-chip'
      //           name={el}
      //           multiple
      //           value={
      //             values
      //               ? values[el]
      //                 ? values[el] !== ''
      //                   ? values[el]
      //                   : []
      //                 : []
      //               : []
      //           }
      //           // onChange={handleChangeMultiValue}
      //           input={<Input id='select-multiple-chip' />}
      //           // renderValue={(value: any) => renderChips(value, el)}
      //           MenuProps={MenuProps}
      //         >
      //           {element.options.map((opt: any) => (
      //             <MenuItem key={opt} value={opt}>

      //               {
      //                 el === 'teams'
      //                   ? teams.find((t: ITeamInfo) => t.teamId === opt)!.teamName
      //                   : opt
      //               }
      //             </MenuItem>
      //           ))}
      //         </Select>
      //       </FormControl >
      //     );
    }
  };

  return (
    <Grid container spacing={2} data-testid="profileForm">
      <Grid container style={{ height: "300px" }}>
        <Grid item xs={5} sm={5} className={classes.topBar}>
          <Grid container style={{ padding: "8px" }}>
            <Grid item xs={1} sm={1} style={{ marginRight: "10px" }}>
              <PersonOutlineOutlinedIcon
                style={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  marginRight: "5px",
                }}
              />
            </Grid>
            <Grid item xs={8} sm={8}>
              <strong> About Me </strong>
            </Grid>
            <Grid item xs={2} sm={2}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                className="button"
                data-testid="skip"
              >
                Edit
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              style={{ height: "200px", overflow: "auto", marginTop: "10px" }}
            >
              {Object.keys(userState!.config).map((el) => {
                if (
                  el === "emailId" ||
                  el === "Firs_5918865382" ||
                  el === "Last_1057488597" ||
                  el === "Phon_8613207084"
                ) {
                  return <div key={el}>{renderElements(el)}</div>;
                }
              })}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2} sm={2} />
        <Grid item xs={5} sm={5} className={classes.topBar}>
          <Grid container style={{ padding: "8px" }}>
            <Grid item xs={1} sm={1} style={{ marginRight: "8px" }}>
              <DevicesOutlinedIcon
                style={{ backgroundColor: "white", borderRadius: "50%" }}
              />
            </Grid>
            <Grid item xs={8} sm={8}>
              <strong> Device & Platform </strong>
            </Grid>
            <Grid item xs={2} sm={2}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                className="button"
                data-testid="skip"
              >
                Edit
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            style={{ height: "200px", marginTop: "10px" }}
          >
            <MultipleSelect list={allPlatforms} label={'Platform'} values={userState.values} handleChangeMultiValue={handleChangeMultiValue} />
            <MultipleSelect list={allDevices} label={'Devices'} values={userState.values} handleChangeMultiValue={handleChangeMultiValue} />
          </Grid>
        </Grid>
      </Grid>

      <Grid container style={{ height: "200px" }}>
        <Grid item xs={5} sm={5} className={classes.topBar}>
          <Grid container style={{ padding: "8px" }}>
            <Grid item xs={1} sm={1}>
              <HomeOutlinedIcon
                style={{ backgroundColor: "white", borderRadius: "50%" }}
              />
            </Grid>
            <Grid item xs={8} sm={8}>
              <strong> Address </strong>
            </Grid>
            <Grid item xs={3} sm={3}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                className="button"
                data-testid="skip"
              >
                Edit
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            style={{ height: "300px", overflow: "auto", marginTop: "10px" }}
          >
            {Object.keys(userState!.config).map((el) => {
              if (
                el === "Addr_2806619917" ||
                el === "Addr_2074516661" ||
                el === "City_5531741361" ||
                el === "Stat_6123563858" ||
                el === "Coun_6736873986" ||
                el === "ZipC_9704366950"
              ) {
                return <div key={el}>{renderElements(el)}</div>;
              }
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
