import React, { Fragment } from 'react';
import {
    Grid,
    makeStyles,
    TextField,
    Button,
    FormControl,
    Container,
    MenuItem,
    Select,
    InputLabel,
    Input,
    Chip,
} from '@material-ui/core';
import Loader from '../../components/loader';
import { IUserParams, ITeamInfo, IUserAttributes } from '../../model';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import DevicesOutlinedIcon from '@material-ui/icons/DevicesOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const useStyles = makeStyles(() => ({
    topBar: {
        width: '100%',
        height: '40px',
        boxShadow: '0px 2px 8px #00000033',
        // opacity: 1,
        fontSize: '15px',
        marginTop: '1em',
        background: '#F0F0F0',
        color: '#000000',
        // padding: '8px'
    },
    formControl: {
        minWidth: '100%',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));

export default function Profile(props: any) {
    const classes = useStyles();
    const { userState, userDataFetched, teams, teamDataFetched, getUserParamState } = props;

    const handleChangeValue = (event: any) => {
        if (userState) {
            const temp: IUserParams | null | undefined = { ...userState };
            if (temp) {
                temp.values[event.target.name] = event.target.value;
            }
            getUserParamState(temp);
        }
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

    const renderChips = (selected: any, el: string) => {
        return (
            <div className={classes.chips}>
                {(selected as string[]).map((value) => (
                    <Chip
                        key={value}
                        label={el === 'teams' ? teams.find((t: ITeamInfo) => t.teamId === value)!.teamName : value}
                        className={classes.chip}
                    />
                ))}
            </div>
        );
    };

    const renderElements = (el: string) => {
        const element: IUserAttributes = userState!.config[el];
        const values = userState ? userState.values : null;
        switch (element.type) {
            case 'string':
                return (
                    <TextField
                        required={element.Mandatory}
                        type='string'
                        id={el}
                        name={el}
                        value={values ? (values[el] ? values[el] : '') : ''}
                        label={element.displayName}
                        disabled={el === 'emailId'}
                        onChange={handleChangeValue}
                        fullWidth
                        autoComplete='off'
                        className='textFieldStyle'
                    />
                );
            case 'number':
                return (
                    // <div className='numberInput'>
                    <TextField
                        required={element.Mandatory}
                        type='number'
                        id={el}
                        name={el}
                        value={values ? (values[el] ? values[el] : 0) : 0}
                        label={element.displayName}
                        onChange={handleChangeValue}
                        fullWidth
                        autoComplete='off'
                        InputProps={{ disableUnderline: true }}
                        className='textFieldStyle'
                    />
                    // </div>
                );

            case 'list':
                return (
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            id='demo-simple-select-label'
                            required={element.Mandatory}
                        >
                            {element.displayName}
                        </InputLabel>
                        <Select
                            name={el}
                            value={values ? (values[el] ? values[el] : '') : ''}
                            onChange={handleChangeValue}
                        >
                            {element.options.map((opt: string) => {
                                return (
                                    <MenuItem key={opt} value={opt}>
                                        {
                                            el === 'teams'
                                                ? teams.find((t: ITeamInfo) => t.teamId === opt)!.teamName
                                                : opt
                                        }
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                );
            case 'multi-list':
                return (
                    <FormControl className={classes.formControl}>
                        <InputLabel
                            id='demo-mutiple-chip-label'
                            required={element.Mandatory}
                        >
                            {element.displayName}
                        </InputLabel>
                        <Select
                            id='demo-mutiple-chip'
                            name={el}
                            multiple
                            value={
                                values
                                    ? values[el]
                                        ? values[el] !== ''
                                            ? values[el]
                                            : []
                                        : []
                                    : []
                            }
                            onChange={handleChangeMultiValue}
                            input={<Input id='select-multiple-chip' />}
                            renderValue={(value: any) => renderChips(value, el)}
                            MenuProps={MenuProps}
                        >
                            {element.options.map((opt: any) => (
                                <MenuItem key={opt} value={opt}>
                                    {
                                        el === 'teams'
                                            ? teams.find((t: ITeamInfo) => t.teamId === opt)!.teamName
                                            : opt
                                    }
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
        }
    };

    const renderProfileForm = () => {
        return (
            <Grid container spacing={2} data-testid="profileForm">
                <Grid container style={{ height: '300px' }}>
                    <Grid item xs={5} sm={5} className={classes.topBar}>
                        <Grid container style={{ padding: '8px' }}>
                            <Grid item xs={1} sm={1}>
                                <PersonOutlineOutlinedIcon style={{ backgroundColor: 'white', borderRadius: '50%' }} />
                            </Grid>
                            <Grid item xs={8} sm={8}>
                                <strong> About Me </strong>
                            </Grid>
                            <Grid item xs={3} sm={3}>
                                <Button variant="outlined" color="primary" size='small' className='button' data-testid="skip" >
                                    Edit
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12} style={{ height: '200px', overflow: 'auto', marginTop: '20px' }}>
                                {Object.keys(userState!.config).map((el) => {
                                    if (el === 'emailId' || el === 'Firs_5918865382' || el === 'Last_1057488597' || el === 'Phon_8613207084') {
                                        return (
                                            <div key={el}>
                                                {renderElements(el)}
                                            </div>
                                        );
                                    }
                                })}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2} sm={2} />
                    <Grid item xs={5} sm={5} className={classes.topBar}>
                        <Grid container style={{ padding: '8px' }}>
                            <Grid item xs={1} sm={1}>
                                <DevicesOutlinedIcon style={{ backgroundColor: 'white', borderRadius: '50%' }} />
                            </Grid>
                            <Grid item xs={8} sm={8}>
                                <strong> Device & Skill Set </strong>
                            </Grid>
                            <Grid item xs={3} sm={3}>
                                <Button variant="outlined" color="primary" size='small' className='button' data-testid="skip" >
                                    Edit
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} style={{ height: '200px', overflow: 'auto', marginTop: '20px' }}>
                            {Object.keys(userState!.config).map((el) => {
                                if (el === 'Devi_3825988043') {
                                    return (
                                        <div key={el}>
                                            {renderElements(el)}
                                        </div>
                                    );
                                }
                            })}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container style={{ height: '400px' }}>
                    <Grid item xs={5} sm={5} className={classes.topBar}>
                        <Grid container style={{ padding: '8px' }}>
                            <Grid item xs={1} sm={1}>
                                <HomeOutlinedIcon style={{ backgroundColor: 'white', borderRadius: '50%' }} />
                            </Grid>
                            <Grid item xs={8} sm={8}>
                                <strong> Address </strong>
                            </Grid>
                            <Grid item xs={3} sm={3}>
                                <Button variant="outlined" color="primary" size='small' className='button' data-testid="skip" >
                                    Edit
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} style={{ height: '300px', overflow: 'auto', marginTop: '20px' }}>
                            {Object.keys(userState!.config).map((el) => {
                                if (el === 'Addr_2806619917' || el === 'Addr_2074516661' || el === 'City_5531741361' || el === 'Stat_6123563858' || el === 'Coun_6736873986' || el === 'ZipC_9704366950') {
                                    return (
                                        <div key={el}>
                                            {renderElements(el)}
                                        </div>
                                    );
                                }
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        <div data-testid="profileForm">
            {userDataFetched && teamDataFetched ? (
                renderProfileForm()
            ) : (
                <Container className='loaderStyle'>
                    <Loader />
                </Container>
            )}
        </div>
    );
}
