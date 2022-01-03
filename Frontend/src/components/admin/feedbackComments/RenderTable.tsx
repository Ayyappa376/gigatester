import { Container, Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody, MuiThemeProvider, Tooltip, makeStyles, Link, TextField, TextareaAutosize, Box, Backdrop, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getSignedUrl, IAppFeedback } from '.';
import { buttonStyle, tooltipTheme } from '../../../common/common';
import { getDate } from '../../../utils/data';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';

interface IProps {
    tableData: IAppFeedback[],
    viewAttachmentClicked: Function,
    urls: string[],
    isBugReport: Boolean
}

export const RenderStars = (props: any) => {
  const arr = [1,2,3,4,5];
  return (
      <div style={{alignItems: "center"}}>
      <div>
          {arr.map((el, i) => {
              return (i < props.rating ? <FavoriteIcon/> : <FavoriteBorderIcon/>)
          })}
      </div>
      </div>
  )
}

export const renderComments = (comments: string[] | undefined) => {
  if(comments && comments.length > 0) {
    let commentText = '';
    comments.forEach((comment: string) => {commentText = commentText + '\n' + comment});
    return(
      <div>
        {/* <TextField value={commentText} multiline fullWidth/> */}
        <Box
          aria-label="rating comments"
          style={{ width: "100%" }}
        >{commentText}</Box>
      </div>
    )
  } else {
    return <div>-</div>
  }
}

const RenderTable = (props: IProps) => {
    const classes = useStyles();
    const {isBugReport} = props;
    const [signedUrlMapping, setsignedUrlMapping] = useState<any>({})
    const [fetchAllUrls, setFecthAllUrls] = useState(false);
    const stateVariable = useSelector((state: IRootState) => {
      return state;
    });
    console.log("signedUrlMapping:", signedUrlMapping)

    const fetchSignedUrls = (urls: string[]) => {
      if(urls.length === 0) {
        return;
      }
      const signedUrlMappingCopy: any = {}
      return Promise.all(
        urls.map((url: string) => {
          return new Promise(async(resolve, reject) => {
            const signedUrl: any = await getSignedUrl(url, stateVariable);
            if (signedUrl) {
              console.log("signedUrlMappingCopy:", signedUrlMappingCopy)
              signedUrlMappingCopy[url] = signedUrl;
              return resolve({});
            } else {
              return reject({})
            }
          })
        })
      ).then(() => {setFecthAllUrls(true);
        console.log("all executed.");
        setsignedUrlMapping(signedUrlMappingCopy)});
        

    }

    useEffect(() => {
      console.log("calling fetchSignedUrls")
      fetchSignedUrls(props.urls)
    }, [])

    return (
        <Container>
          {true ?
            <Paper className='tableArea'>
          <Table className='table'>
            <TableHead component='th' className='tableHead'>
              <TableRow>
                <TableCell component='th' className='tableHeadCell'>
                  <Typography className='tableHeadText'>
                    User
                  </Typography>
                </TableCell>
                <TableCell component='th' align='center' className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                        Date
                    </Typography>
                </TableCell>
                {
                  isBugReport ? 
                  <TableCell component='th' align='center' className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                      Category
                    </Typography>
                  </TableCell> :
                  <TableCell component='th' align='center' className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                      Rating
                    </Typography>
                  </TableCell>
                }
                <TableCell component='th' align='center' className='tableHeadCell'>
                  <Typography className='tableHeadText'>
                    Comments
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.tableData.length > 0 ? props.tableData.map(
                (row: IAppFeedback, index: number) => {
                  if(isBugReport && row.productRating > 0) {
                    return <div/>
                  }
                  if(!isBugReport && row.productRating === 0) {
                    return <div/>
                  }
                  return (
                    <TableRow key={index}>
                      <TableCell
                        scope='row'
                        className={classes.firstColumn}
                      >
                        <MuiThemeProvider theme={tooltipTheme}>
                          <Tooltip
                            title={<Typography>{row.userId}</Typography>}
                          >
                            <Typography style={{fontWeight: 700}} className='tableBodyText'>
                              {row.userId}
                            </Typography>
                          </Tooltip>
                        </MuiThemeProvider>
                      </TableCell>
                      <TableCell scope='row' align='center'>
                        <Typography className='tableBodyText'>
                          {row.createdOn ? getDate(row.createdOn) : '-'}
                        </Typography>
                      </TableCell>
                      {
                        isBugReport ? 
                        <TableCell scope='row' align='center'>
                          <Typography className='tableBodyText'>
                            Moderate
                          </Typography>
                        </TableCell> :
                        <TableCell scope='row' align='center'>
                          <RenderStars rating={row.productRating}/>
                        </TableCell>
                      }
                      <TableCell scope='row' align='center'>
                        <div style={{overflow: 'auto', maxHeight: 150, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto'}}>
                            {renderComments(row.feedbackComments)}
                        </div>
                        <div>
                          {
                            row.feedbackMedia? row.feedbackMedia.image ? <Link
                            component="button"
                            variant="body2"
                            style={{fontSize: 11}}
                            onClick={() => {
                              props.viewAttachmentClicked(row.feedbackMedia.image, row.id, 'image');
                            }}
                          >
                            View attachment
                          </Link> : <div/> : <div/>
                          }
                        </div>
                        <div>
                          {
                            row.feedbackMedia? row.feedbackMedia.video ? fetchAllUrls ?
                            <div style={{maxWidth: 700}}>
                            <video width="30%" controls style={{display: 'block',
                                          marginTop: 20,
                                          marginLeft: 'auto',
                                          marginRight: 'auto',
                                          }}>
                              <source src={signedUrlMapping[row.feedbackMedia.video]} type="video/mp4" />
                            </video>
                            </div>
                            : <div/> : <div/> : <div/>
                          }
                        </div>
                      </TableCell>
                      
                    </TableRow>
                  );
                }
              ): <div/>}
            </TableBody>
          </Table>
        </Paper> : <Backdrop className={classes.backdrop} open={fetchAllUrls}>
                  <CircularProgress color='inherit' />
              </Backdrop> }
        </Container>
    )
}

const useStyles = makeStyles((theme) => ({
    button: {
      marginTop: '36px',
      position: 'relative',
      left: '45%',
      minWidth: '10%',
      ...buttonStyle,
    },
    grid: {
      marginTop: theme.spacing(2),
    },
    backButton: {
      marginTop: '36px',
      position: 'relative',
      minWidth: '10%',
      marginRight: '20px',
      ...buttonStyle,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    firstColumn: {
      maxWidth: '150px',
      overflow: 'hidden',
    },
    commentsColumn: {
      maxWidth: '250px',
    },
  }));

export default RenderTable;

