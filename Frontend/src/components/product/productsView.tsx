import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
import { Http } from '../../utils';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, FormControl, Grid, InputLabel, Paper, Select, Typography } from '@material-ui/core';
import { IPlatformInfo, IProductInfo, IDeviceInfo, STATUS_CAMPAIGN_ACTIVE } from '../../model';
import Loader from '../loader';
import SearchControl from '../common/searchControl';

const useStyles = makeStyles((theme) => ({
    img: {
        height: 40,
        width: 40,
        borderRadius: '20%',
    },
    block: {
        padding: '10px 20px',
        marginTop: '10px',
        borderLeft: '2px solid #000000'
    },
    subTitle: {
        fontSize: '12px',
        paddingTop: '2px',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const ProductsView = (props: any) => {
    const classes = useStyles();
    const stateVariable = useSelector((state: IRootState) => {
        return state;
    });
    const [searchString, setSearchString] = useState('');
    const [allProducts, setAllProducts] = useState<IProductInfo[]>([]);
    const [allPlatforms, setAllPlatforms] = useState<IPlatformInfo[]>([]);
    const [allDevices, setAllDevices] = useState<IDeviceInfo[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<any>('');
    const [selectedPlatform, setSelectedPlatform] = useState<any>('');

    const history = useHistory();

    useEffect(() => {
        fetchAllPlatforms();
        fetchAllDevices();
        //    fetchAllTestSuites();
        fetchCampaignDetails();
    }, []);

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

    const fetchCampaignDetails = () => {
        let products: any[] = [];
        Http.get({
            url: `/api/v2/campaigns?status${STATUS_CAMPAIGN_ACTIVE}`,
            state: stateVariable,
        })
            .then((response: any) => {
                response.campaigns.forEach((item: any, index: number) => {
                    item.products.forEach((item: any, index: number) => {
                        products.push(item)
                    })
                })
                setAllProducts(products)
            })
            .catch((error: any) => {
                const perror = JSON.stringify(error);
                const object = JSON.parse(perror);
                if (object.code === 401) {
                    history.push('/relogin');
                } else {
                    history.push('/error');
                }
                // setFailure(true);
            });
    };


    const handleSearch = (str: string) => {
        if (typeof str !== 'undefined') {
            setSearchString(str);
        }
    };

    const requestInterest = () => {
        console.log('requestInterest')
    }

    return (
        <div data-testid="product">
            <Grid container spacing={2} >
                <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="platform-native-simple">By Platform</InputLabel>
                        <Select
                            native
                            value={selectedPlatform}
                            inputProps={{
                                name: 'platform',
                                id: 'platform-native-simple',
                            }}
                            onChange={(e) => setSelectedPlatform(e.target.value)}
                        >
                            <option aria-label="None" value="all" >All</option>
                            {allPlatforms.length && allPlatforms.map((item, index) => {
                                return (
                                    <option value={item.id} key={index}>{item.name}</option>
                                )
                            }
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="device-native-simple">By Device</InputLabel>
                        <Select
                            native
                            value={selectedDevice}
                            inputProps={{
                                name: 'device',
                                id: 'device-native-simple',
                            }}
                            onChange={(e) => setSelectedDevice(e.target.value)}
                        >
                            <option aria-label="None" value="all" >All</option>
                            {allDevices.length && allDevices.map((item, index) => {
                                return (
                                    <option value={item.id} key={index}>{item.name}</option>
                                )
                            }
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} style={{ marginTop: '8px' }}>
                    <SearchControl
                        searchString={searchString}
                        handleSearch={handleSearch}
                    />
                </Grid>
            </Grid>
            {allProducts.length ?
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={6}>
                        <Typography data-testid="header" >Showing {allProducts.length} products</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    </Grid>
                    {/* {allProducts.length && allProducts.map((item: any, index: number) => {
                        return (
                            <Grid item xs={12} sm={6} key={index} >
                                <Paper className={classes.block} data-testid={`platform-${item.id}`} >
                                    <Grid container spacing={2} >
                                        <Grid item xs={3} sm={3} md={3} >
                                            <img className={classes.img} src={'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60'} alt={item.label} />
                                        </Grid>
                                        <Grid item xs={9} sm={9} md={9}>
                                            <Typography>{item.name}</Typography>
                                            <InputLabel className={classes.subTitle}>{item.name}</InputLabel>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        )
                    })} */}
                    {allProducts.length && allProducts.map((item: any, index: number) => {
                        let platforms = allPlatforms.filter(p1 => item.platforms.some((p2: any) => p1.id === p2));
                        let devices = allDevices.filter(d1 => item.devices.some((d2: any) => d1.id === d2));

                        return (
                            <Grid item xs={12} sm={6} key={index} >
                                <Paper className={classes.block} data-testid={`platform-${item.id}`} >
                                    <Grid container spacing={2} >
                                        <Grid item xs={3} sm={3} md={3} >
                                            <img className={classes.img} src={'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60'} alt={item.label} />
                                        </Grid>
                                        <Grid item xs={9} sm={9} md={9}>
                                            <Typography>{item.name}</Typography>
                                            <InputLabel className={classes.subTitle}>{item.name}</InputLabel>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} >
                                            <Typography variant="subtitle2" style={{ color: '#D35400' }}> PLATFORM </Typography>
                                            {platforms.length && platforms.map((item) => item.name)}
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} >
                                            <Typography variant="subtitle2" style={{ color: '#D35400' }}> DEVICES </Typography>
                                            {devices.length && devices.map((item) => item.name)}
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} style={{ textAlign: 'center', margin: '5px 0px' }}>
                                            <Button variant="outlined" color="primary" size='small' className='button' data-testid="save" onClick={requestInterest}>
                                                Request Interest
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
                : (
                    <Container className='loaderStyle'>
                        <Loader />
                    </Container>
                )}
        </div >
    );
};

export default ProductsView;
