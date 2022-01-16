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
import { filenameToContentType } from '@aws-amplify/core';

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
    fontSize: '18px',
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
  const [downloadedSoftware, setDownloadedSoftware] = useState('');
  const [fileContentType, setFileContentType] = useState('');
  const [fileSelected, setFileSelected] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [multiUploadArray, setMultiUploadArray] = useState([]);
  const [uploadArrayId, setUploadArrayId] = useState('');

  const getUploadedSoftwares = () => {
    Http.get({
      url: `/api/v2/softwares`,
      state: stateVariable,
    })
      .then((response: any) => {
        setSoftwareList(response.Contents);
      })
      .catch((error: any) => {
        const perror = JSON.stringify(error);
        const object = JSON.parse(perror);
        if (object.code === 401) {
          props.history.push('/relogin');
        } else {
          props.history.push('/error');
        }
//        console.log(error);
      });
  };

  const getUploadPreSignedUrl = (event: any) => {
    event.preventDefault();
    setFileSelected(event.target.files[0]);
    setFileName(event.target.files[0].name);
    setFileContentType(event.target.files[0].type);
    setFileSize(event.target.files[0].size);
  };

  const multiArrayUploadCompleted = () => {
    if (multiUploadArray.length) {
      Http.post({
        url: `/api/v2/softwares/large`,
        body: {
          fileName: fileName,
          parts: multiUploadArray,
          uploadId: uploadArrayId,
        },
        state: stateVariable,
      })
        .then((response: any) => {
          console.log(response.data, 'complete upload response');
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      console.log('not completed');
    }
  };

  const uploadPreSignedUrlSoftware = () => {
    const chunkSize: number = 10 * 1024 * 1024; // 10MiB
    const chunkCount: number = Math.floor(fileSize / chunkSize) + 1;
    // console.log(`chunkCount: ${chunkCount}`);

    Http.post({
      url: `/api/v2/softwares/large`,
      state: stateVariable,
      body: {
        fileName: fileName,
        fileType: fileContentType,
      },
    })
      .then((response: any) => {
        // console.log(response.data.UploadId, 'uploadId');
        let uploadId = response.data.UploadId;
        let uploadArray: any = [];
        setUploadArrayId(uploadId);
        for (let uploadCount = 1; uploadCount < chunkCount + 1; uploadCount++) {
          let start = (uploadCount - 1) * chunkSize;
          let end = uploadCount * chunkSize;
          let fileBlob =
            uploadCount < chunkCount
              ? fileSelected.slice(start, end)
              : fileSelected.slice(start);
          Http.post({
            url: `/api/v2/softwares/large`,
            state: stateVariable,
            body: {
              fileName: fileName,
              partNumber: uploadCount,
              uploadId: uploadId,
            },
          })
            .then((response: any) => {
              let preSignedUrl = response.data;
              // console.log(`preSignedUrl ${uploadCount} : ${preSignedUrl}`);
              fetch(preSignedUrl, {
                method: 'PUT',
                body: fileBlob,
              })
                .then((response: any) => {
                  let EtagHeader = response.headers.get('ETag');
                  let uploadPartDetails = {
                    ETag: EtagHeader,
                    PartNumber: uploadCount,
                  };

                  uploadArray.push(uploadPartDetails);
                  setMultiUploadArray(uploadArray);
                  if (uploadArray.length == chunkCount) {
                    const uploadedArray = uploadArray.sort(
                      (uploadArrayA: any, uploadArrayB: any) =>
                        uploadArrayA.PartNumber - uploadArrayB.PartNumber
                    );
                    Http.post({
                      url: `/api/v2/softwares/large`,
                      body: {
                        fileName: fileName,
                        parts: uploadedArray,
                        uploadId: uploadId,
                      },
                      state: stateVariable,
                    })
                      .then((response: any) => {
                        console.log(response.data, 'complete upload response');
                      })
                      .catch((error: any) => {
                        console.log(error);
                      });
                  }
                })
                .then((data) => {
                  // console.log(data);
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error: any) => {
              console.log(error);
            });
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  // console.log(response.filePath, "preSigned Url");
  // console.log(fileSelected, "file");
  // fetch(response.filePath, {
  //   method: "PUT",
  //   body: fileSelected,
  // })
  //   .then((response) => {
  //     console.log(response);
  //     getUploadedSoftwares();
  //     // response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // })

  useEffect(() => {
    getUploadedSoftwares();
  }, []);

  const uploadSoftware = (event: any) => {
    event.preventDefault();
    let uploadedFile = event.target.files[0];
    setFileSelected(uploadedFile);
    let formUpload = new FormData();
    formUpload.append('file', uploadedFile);
    formUpload.append('fileName', uploadedFile.name);
    setNotify({
      isOpen: true,
      message: 'Uploading...',
      type: 'info',
    });
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = String(reader.result).split('base64,')[1];
      const dataInfo = {
        file: base64String,
        fileName: uploadedFile.name,
      };
      uploadedFile &&
        Http.post({
          url: `/api/v2/softwares/small`,
          body: dataInfo,
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
            console.log(error);
          });
    };
    reader.readAsDataURL(uploadedFile);
  };

  const getDownloadFile = (url: any) => {
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', downloadedSoftware);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadSoftware = (software: string) => {
    setDownloadedSoftware(software);
    setNotify({
      isOpen: true,
      message: 'Downloading...',
      type: 'info',
    });
    Http.get({
      url: `/api/v2/software/${software}`,
      state: stateVariable,
    })
      .then((response: any) => {
        getDownloadFile(response.filePath);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  if (softwareList.length) {
    return (
      <Container
        maxWidth='md'
        component='div'
        classes={{
          root: classes.root,
        }}
      >
        {userStatus &&
          userStatus.roles &&
          (userStatus.roles.includes('Manager') ||
            userStatus.roles.includes('Admin')) && (
            <Fragment>
              <input
                style={{ display: 'none' }}
                id='upload-software-file'
                multiple
                type='file'
                onChange={(e) => getUploadPreSignedUrl(e)}
              />
              <label htmlFor='upload-software-file'>
                <Button
                  component='span'
                  variant='outlined'
                  className={classes.button}
                >
                  Select Software
                </Button>
              </label>
              <Button
                style={{ marginLeft: '15px' }}
                component='span'
                variant='outlined'
                className={classes.button}
                onClick={uploadPreSignedUrlSoftware}
              >
                Upload Software
              </Button>
              <br />
              {/* <input
                style={{ display: "none" }}
                id="upload-software-file"
                multiple
                type="file"
                onChange={(e) => uploadSoftware(e)}
              />
              <label htmlFor="upload-software-file">
                <Button
                  component="span"
                  variant="outlined"
                  className={classes.button}
                >
                  Select Small Software
                </Button>
              </label> */}
              {/* <Button
                component="span"
                variant="outlined"
                className={classes.button}
                onClick={uploadPreSignedUrlSoftware}
              >
                Upload Small Software
              </Button> */}
            </Fragment>
          )}
        <Paper className='tableArea'>
          <Table className='table'>
            <TableHead className='tableHead'>
              <TableRow>
                <TableCell align='center' className='tableHeadCell'>
                  <Typography className='tableHeadText'>Software</Typography>
                </TableCell>
                <TableCell align='center' className='tableHeadCell'>
                  <Typography className='tableHeadText'>Action</Typography>
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
                    <TableCell component='th' scope='row' className='tableCell'>
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
                        <Typography>Download</Typography>
                      </MaterialLink>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <Notification notify={notify} setNotify={setNotify} />
      </Container>
    );
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
  }
};

export default ManageSoftwareFiles;
