import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
import { Http } from '../../utils';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, InputLabel, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
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
    }
}));

const ProductsView = (props: any) => {
    const classes = useStyles();
    const stateVariable = useSelector((state: IRootState) => {
        return state;
    });
    const history = useHistory();

    useEffect(() => {
        Http.get({
            url: `/api/v2/campaigns`,
            state: stateVariable,
        })
            .then((response: any) => {
                // console.log(response);
            })
            .catch((error) => {
                const perror = JSON.stringify(error);
                const object = JSON.parse(perror);
                if (object.code === 401) {
                    history.push('/relogin');
                } else {
                    history.push('/error');
                }
            });
    }, []);

    return (
        <div data-testid="product">
            <Grid container spacing={1} >
                <Grid item xs={12} sm={6}>
                    <Typography data-testid="header" >Showing 5 campaigns</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
            </Grid>
            <Grid container spacing={2} >
                {props.productList && props.productList.map((item: any, index: number) => {
                    return (
                        <Grid item xs={12} sm={6} key={index} >
                            <Paper className={classes.block} data-testid={`platform-${item.id}`} >
                                <Grid container spacing={2} >
                                    <Grid item xs={3} sm={3} md={3} >
                                        <img className={classes.img} src={item.imgPath} alt={item.label} />
                                    </Grid>
                                    <Grid item xs={9} sm={9} md={9}>
                                        <Typography>{item.label}</Typography>
                                        <InputLabel className={classes.subTitle}>{item.label}</InputLabel>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </div >
    );
};

export default ProductsView;
