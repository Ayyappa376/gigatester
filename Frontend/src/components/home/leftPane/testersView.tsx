import React, { Fragment } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const testersList = [
    {
        label: 'San',
        imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bird',
        imgPath:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bali',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
        label: 'Las',
        imgPath:
            'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Serbia',
        imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%'
    },
    img: {
        height: 60,
        width: 60,
        borderRadius: '50%',
        margin: '10px 20px'
    },
}));

function TestersView() {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Paper style={{ background: '#F0F0F0', borderTop: '2px solid #000000' }}>
            {testersList.map((item, index) => {
                return (
                    <img className={classes.img} src={item.imgPath} alt={item.label} key={index} />
                )
            })
            }
        </Paper >
    );
};

export default TestersView;
