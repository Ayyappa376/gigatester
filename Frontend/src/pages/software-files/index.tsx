import React, { useEffect, useState } from 'react';
import { Http } from '../../utils';
import { Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        paddingTop: '10%',
        padding: 0,
        float: 'right',
    },
    img: {
        width: '100%',
        // objectFit: 'contain',
        height: '84vh',
    },
    textAlign: {
        position: 'absolute',
        top: '30%',
        left: '5%',
        color: '#042E5B',
        fontSize: '18px'
        // transform: 'translate(-50%, -100%)'
    },
    // buttons: {
    //     ...buttonStyle,
    // },
});

const ManageSoftwareFiles = (props: any) => {
    const classes = useStyles();
    // const [file, setFile] = useState();
    const stateVariable = useSelector((state: IRootState) => {
        return state;
    });

    console.log(stateVariable)
    // Handles file upload event and updates state
    const handleUpload = (event: any) => {
        console.log(event.target.files[0]);
        // setFile(event.target.files[0]);
        let uploadedFile = event.target.files[0];
        uploadedFile &&
            Http.post({
                url: `/api/v2/software`,
                body: {
                    file: uploadedFile.name,
                },
                state: stateVariable,
            })
                .then((response: any) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                });
        // Add code here to upload file to server
        // ...
    }




    return (
        // tslint:disable-next-line: jsx-wrap-multiline
        <Container
            maxWidth='xl'
            classes={{
                root: classes.root,
            }}
        >
            <input type="file" onChange={handleUpload} />
        </Container>
    );
};

export default ManageSoftwareFiles;
