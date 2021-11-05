import React, { useEffect, useState } from 'react';
import { Http } from '../../utils';
import {
    Typography,
    makeStyles,
    Container,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    CircularProgress,
    Backdrop,
    Grid,
    TableSortLabel,
} from '@material-ui/core';
import { default as MaterialLink } from '@material-ui/core/Link';
import { useSelector } from 'react-redux';
import { IRootState } from '../../reducers';
import '../../css/assessments/style.css';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        paddingTop: '10%',
        padding: 0,
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
});

const ManageSoftwareFiles = (props: any) => {
    const classes = useStyles();
    const stateVariable = useSelector((state: IRootState) => {
        return state;
    });
    const [softwareList, setSoftwareList] = useState([]);
    const [downloadedSoftware, setDownloadedSoftware] = useState('')

    useEffect(() => {
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
    }, [])

    const uploadSoftware = (event: any) => {
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

    return (
        <Container
            maxWidth='md'
            component='div'
            classes={{
                root: classes.root,
            }}
        >
            <input type="file" onChange={uploadSoftware} />
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
        </Container>
    );
};

export default ManageSoftwareFiles;
