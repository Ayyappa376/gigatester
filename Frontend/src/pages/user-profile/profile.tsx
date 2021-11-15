import React, { Fragment, useEffect, useState } from 'react';
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
import { IRootState } from '../../reducers';
import Loader from '../../components/loader';
import { Http } from '../../utils';
import { useSelector } from 'react-redux';
import { IUserParams, ITeamInfo, IUserAttributes } from '../../model';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import DevicesOutlinedIcon from '@material-ui/icons/DevicesOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
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

const useStyles = makeStyles((theme) => ({
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
    // const [value, setValue] = useState(0);
    const [createUserParams, setCreateUserParams] = useState<IUserParams | null>(null);
    const stateVariable = useSelector((state: IRootState) => {
        return state;
    });
    const [teams, setTeams] = useState<ITeamInfo[]>([]);
    const [userParamState, setUserParamState] = useState<any>({});
    const [teamDataFetched, setTeamDataFetched] = useState(false);

    useEffect(() => {
        fetchTeamList();
        fetchUserConfig();
    }, []);

    const fetchTeamList = () => {
        Http.get({
            url: `/api/v2/teamlist`,
            state: stateVariable,
        })
            .then((response: any) => {
                response.sort((a: any, b: any) => {
                    if (a.active === b.active) {
                        return a.teamName.toLowerCase() <= b.teamName.toLowerCase()
                            ? -1
                            : 1;
                    }
                    return a.active === 'true' ? -1 : 1;
                });
                setTeams(response);
                setTeamDataFetched(true);
            })
            .catch((error: any) => {
                const perror = JSON.stringify(error);
                const object = JSON.parse(perror);
                console.log(error)
                // if (object.code === 401) {
                //     props.history.push('/relogin');
                // } else {
                //     props.history.push('/error');
                // }
            })
    };

    const fetchUserConfig = () => {
        Http.get({
            url: '/api/v2/admin/users/createuser',
            state: stateVariable,
        })
            .then((response: any) => {
                const responseConfigSorted: any = {};
                const responseKeysSorted = Object.keys(response.config).sort(
                    (a: any, b: any) => {
                        return response.config[a].displayName >
                            response.config[b].displayName
                            ? 1
                            : -1;
                    }
                );
                responseKeysSorted.forEach((el: string) => {
                    responseConfigSorted[el] = response.config[el];
                });
                response.config = responseConfigSorted;
                setCreateUserParams(response);
            })
            .catch((error) => {
                const perror = JSON.stringify(error);
                const object = JSON.parse(perror);
                console.log(error)
                // if (object.code === 401) {
                //     props.history.push('/relogin');
                // } else {
                //     props.history.push('/error');
                // }
            });
    };

    // const handleChange = (event: any, newValue: number) => {
    //     setValue(newValue);
    // };

    function mandatoryFieldsCheck(): boolean {
        let countFilledElements = 0;
        let totalCount = 0;
        // tslint:disable-next-line: ter-arrow-parens
        Object.keys(createUserParams!.config).forEach((el) => {
            if (createUserParams!.config[el].Mandatory) {
                if (userParamState && userParamState[el]) {
                    countFilledElements = countFilledElements + 1;
                }
                totalCount = totalCount + 1;
            }
        });
        if (totalCount === countFilledElements) {
            return true;
        }
        return false;
    }

    const handleChangeValue = (event: any) => {
        if (userParamState) {
            const temp: any = { ...userParamState };
            temp[event.target.name] = event.target.value;
            setUserParamState(temp);
        }
    };

    const handleChangeMultiValue = (event: any) => {
        if (userParamState) {
            const temp: any = { ...userParamState };
            let valueArray = temp[event.target.name] || [];
            valueArray = [...event.target.value];
            temp[event.target.name] = valueArray;
            setUserParamState(temp);
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

    function getStyles(values: any, opt: string, el: string) {
        if (values && values[el] && values[el].includes(opt)) {
            return {
                color: 'white',
                backgroundColor: '#042E5B',
            };
        }
    }

    const renderElements = (el: string) => {
        const element: IUserAttributes = createUserParams!.config[el];
        const values = userParamState ? userParamState : null;
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
                        onChange={handleChangeValue}
                        fullWidth
                        autoComplete='off'
                        className='textFieldStyle'
                    />
                );
            case 'number':
                return (
                    <div className='numberInput'>
                        <TextField
                            required={element.Mandatory}
                            type='number'
                            id={el}
                            name={el}
                            value={values ? (values[el] ? values[el] : '') : ''}
                            label={element.displayName}
                            onChange={handleChangeValue}
                            fullWidth
                            autoComplete='off'
                            InputProps={{ disableUnderline: true }}
                            className='textFieldStyle'
                        />
                    </div>
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
                            value={
                                values
                                    ? values[el]
                                        ? element.options.includes(values[el])
                                            ? values[el]
                                            : 'Other'
                                        : ''
                                    : ''
                            }
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
                                <MenuItem
                                    key={opt}
                                    value={opt}
                                    style={getStyles(values, opt, el)}
                                >
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
            <Grid container spacing={2}>
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
                                {createUserParams && Object.keys(createUserParams!.config).map((el: any) => {
                                    if (el === 'emailId' || el === 'Firs_5918865382' || el === 'Last_1057488597' || el === 'Phon_8613207084') {
                                        return (
                                            renderElements(el)
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
                            {createUserParams && Object.keys(createUserParams!.config).map((el: any) => {
                                if (el === 'Devi_3825988043') {
                                    return (
                                        renderElements(el)
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
                                <PaymentOutlinedIcon style={{ backgroundColor: 'white', borderRadius: '50%' }} />
                            </Grid>
                            <Grid item xs={8} sm={8}>
                                <strong> Card Details </strong>
                            </Grid>
                            <Grid item xs={3} sm={3}>
                                <Button variant="outlined" color="primary" size='small' className='button' data-testid="skip" >
                                    Edit
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2} sm={2} />
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
                            {createUserParams && Object.keys(createUserParams!.config).map((el: any) => {
                                if (el === 'Addr_2806619917' || el === 'Addr_2074516661' || el === 'City_5531741361' || el === 'Stat_6123563858' || el === 'Coun_6736873986' || el === 'ZipC_9704366950') {
                                    return (
                                        renderElements(el)
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
        <Fragment>
            {(createUserParams !== null && teamDataFetched) ? (
                renderProfileForm()
            ) : (
                <Container className='loaderStyle'>
                    <Loader />
                </Container>
            )}
        </Fragment>
    );
}
