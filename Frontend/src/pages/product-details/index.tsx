import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
// import TopPane from '../../components/product/topPane'
import ProductView from '../../components/product/productsView';
import UserProfileStatus from "../../components/userProfileStatus";

const useStyles = makeStyles({
    root: {
        // marginTop: '3.2em',
        padding: '3.2em 0',
        // padding: 0,
        overflow: 'hidden',
    },
    marginTopTwenty: {
        marginTop: '20px'
    }
});

const productList = [
    {
        id: 1,
        label: 'San',
        imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        id: 2,
        label: 'Bird',
        imgPath:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        id: 3,
        label: 'Bali',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        id: 4,
        label: 'Las',
        imgPath:
            'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        id: 5,
        label: 'Serbia',
        imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
];

function ProductDetails(props: any) {
    const classes = useStyles();

    return (
        <Container
            maxWidth='xl'
            classes={{
                root: classes.root,
            }}
        >
            <Grid container spacing={2}>
                {/* <TopPane /> */}
                <Grid container className={classes.marginTopTwenty}>
                    <Grid item xs={12} sm={1} />
                    <Grid item xs={12} sm={6}>
                        <ProductView productList={productList} />
                    </Grid>
                    <Grid item xs={12} sm={1} />
                    <Grid item xs={12} sm={3} >
                        <UserProfileStatus updateProfile={true} />
                    </Grid>
                    <Grid item xs={12} sm={1} />
                </Grid>
            </Grid>
        </Container >
    );
};

export default ProductDetails;
