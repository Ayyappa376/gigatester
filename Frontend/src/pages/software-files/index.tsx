import React, { Fragment, useEffect, useState } from 'react';
import { Http } from '../../utils';
import {
    Button,
    Typography,
    makeStyles,
    Container,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';
import { Loader } from '../../components';
import Notification from '../../common/notification';
import { buttonStyle } from '../../common/common';
import { default as MaterialLink } from '@material-ui/core/Link';
import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
import '../../css/assessments/style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        paddingTop: '10%',
        padding: 0,
    },
    containerRoot: {
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        top: '120px',
        paddingBottom: theme.spacing(4),
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
    button: {
        ...buttonStyle,
    },
}));

const ManageSoftwareFiles = (props: any) => {
    const classes = useStyles();
    const stateVariable = useSelector((state: IRootState) => {
        return state;
    });
    const userStatus = useSelector((state: IRootState) => {
        return state.user;
    });
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    });
    const [softwareList, setSoftwareList] = useState([]);
    const [downloadedSoftware, setDownloadedSoftware] = useState('')

    const getUploadedSoftwares = () => {
        Http.get({
            url: `/api/v2/software`,
            state: stateVariable,
        })
            .then((response: any) => {
                setSoftwareList(response.Contents)
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getUploadedSoftwares()
    }, [])

    const uploadSoftware = (event: any) => {
        let uploadedFile = event.target.files[0];
        setNotify({
            isOpen: true,
            message: "Uploading...",
            type: 'info',
        });
        uploadedFile &&
            Http.post({
                url: `/api/v2/software`,
                body: {
                    file: uploadedFile.name,
                },
                state: stateVariable,
            })
                .then((response: any) => {
                    getUploadedSoftwares();
                    setNotify({
                        isOpen: true,
                        message: `The ${uploadedFile.name} file has been uploaded successfully.`,
                        type: 'info',
                    });
                })
                .catch((error) => {
                    console.log(error)
                });
    }

    const getDownloadFile = (url: any) => {
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', downloadedSoftware);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const downloadSoftware = (software: string) => {
        setDownloadedSoftware(software)
        setNotify({
            isOpen: true,
            message: "Downloading...",
            type: 'info',
        });
        Http.get({
            url: `/api/v2/software/${software}`,
            state: stateVariable,
        })
            .then((response: any) => {
                getDownloadFile(response.filePath)
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    if (softwareList.length) {
        return (
            <Container
                maxWidth='md'
                component='div'
                classes={{
                    root: classes.root,
                }}
            >
                {
                    (userStatus &&
                        userStatus.roles &&
                        (userStatus.roles.includes('Manager') ||
                            userStatus.roles.includes('Admin'))) &&
                    <Fragment>
                        <input
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={(e) => uploadSoftware(e)}
                        />
                        <label htmlFor="contained-button-file">
                            <Button component="span" variant="outlined" className={classes.button}>
                                Upload Software
                            </Button>
                        </label>
                    </Fragment>
                }
                <Paper className='tableArea'>
                    <Table className='table'>
                        <TableHead className='tableHead'>
                            <TableRow>
                                <TableCell align='center' className='tableHeadCell'>
                                    <Typography className='tableHeadText'>
                                        Software
                                    </Typography>
                                </TableCell>
                                <TableCell align='center' className='tableHeadCell'>
                                    <Typography className='tableHeadText'>
                                        Action
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {softwareList.map((row: any, index: number) => {
                                return (
                                    <TableRow
                                        key={index}
                                        style={
                                            index % 2
                                                ? { background: '#EFEFEF' }
                                                : { background: 'white' }
                                        }
                                    >
                                        <TableCell
                                            component='th'
                                            scope='row'
                                            className='tableCell'
                                        >
                                            <Typography className='tableBodyText'>
                                                {row.Key}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center' className='tableCell'>
                                            <MaterialLink
                                                href='#'
                                                onClick={() => {
                                                    downloadSoftware(row.Key);
                                                }}
                                            >
                                                <Typography>
                                                    Download
                                                </Typography>
                                            </MaterialLink>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                <Notification notify={notify} setNotify={setNotify} />
            </Container >
        )
    } else {
        return (
            <Container
                maxWidth='md'
                component='div'
                classes={{
                    root: classes.containerRoot,
                }}
            >
                <Loader />
            </Container>
        );
    };
}

export default ManageSoftwareFiles;
