import { Container, Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody, MuiThemeProvider, Tooltip, makeStyles, Link, TextField, TextareaAutosize, Box, Backdrop, CircularProgress, TableSortLabel, Divider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getSignedUrl, IAppFeedback } from '.';
import { buttonStyle, tooltipTheme } from '../../../common/common';
import { getDate } from '../../../utils/data';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import AudioPlayer from './audioPlayer';
import SearchField from './SearchField';

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
              return (i < props.rating ? <FavoriteIcon key={i}/> : <FavoriteBorderIcon key={i}/>)
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
    const [rawTableData, setRawTableData] = useState(props.tableData);
    const [tableData, setTableData] = useState<IAppFeedback[]>([]);
    const [searchPhrase, setSearchPhrase] = useState("");

    /* Order related changes */
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');
    const [orderBy, setOrderBy] = useState('date');

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
              signedUrlMappingCopy[url] = signedUrl;
              return resolve({});
            } else {
              return reject({})
            }
          })
        })
      ).then(() => {setFecthAllUrls(true);
        setsignedUrlMapping(signedUrlMappingCopy)});
    }

    useEffect(() => {
      if(searchPhrase) {
        const filteredTableData = rawTableData.filter((el) => {
          if(el.feedbackComments){
            const feedbackCommentsString = el.feedbackComments.join();
            if(feedbackCommentsString.indexOf(searchPhrase) >= 0) {
              return true;
            }
            return false;
          }
        })
        setTableData(filteredTableData)
      }
    }, [searchPhrase])

    const clearSearch = () => {
      applySort(rawTableData);
    }

    const sortTableByDate = (tableData: IAppFeedback[], sortOrder: string) => {
      const data = [...tableData];
      data.sort((aData, bData) => {
        if (aData.createdOn > bData.createdOn) {
          return sortOrder === 'desc' ? -1 : 1;
        } else if (aData.createdOn < bData.createdOn) {
          return sortOrder === 'desc' ? 1 : -1;
        } else {
          return 0;
        }
      })
      return data;
    }

    const sortTableByRating = (tableData: IAppFeedback[], sortOrder: string) => {
      const data = [...tableData];
      data.sort((aData, bData) => {
        if (aData.productRating > bData.productRating) {
          return sortOrder === 'desc' ? -1 : 1;
        } else if (aData.productRating < bData.productRating) {
          return sortOrder === 'desc' ? 1 : -1;
        } else {
          return 0;
        }
      })
      return data;
    }

    const applySort = (data?: IAppFeedback[]) => {
      let sortData = data && data.length > 0 ? data : tableData;
      if (order === 'asc') {
        if(orderBy === 'date') {
          setTableData(sortTableByDate(sortData, 'asc'))
        } else if(orderBy === 'rating') {
          setTableData(sortTableByRating(sortData, 'asc'))
        }
      }
      if (order === 'desc') {
        if(orderBy === 'date') {
          setTableData(sortTableByDate(sortData, 'desc'))
        } else if(orderBy === 'rating') {
          setTableData(sortTableByRating(sortData, 'desc'))
        }
      }
    }

    useEffect(() => {
      applySort();
    }, [order, orderBy]);

    const handleRequestSort = (property: string) => {
      if (orderBy === property) {
        setOrder(order === 'asc' ? 'desc' : 'asc');
      } else {
        setOrder('asc');
        setOrderBy(property);
      }
    };

    useEffect(() => {
      if(!fetchAllUrls) {
        fetchSignedUrls(props.urls)
        setTableData(sortTableByDate(props.tableData, 'desc'));
      }
    }, [])


    return (
        <Container>
          <Divider></Divider>
          <div style={{minWidth: '100%'}}>
            <SearchField style={{marginTop: 10, marginLeft: 'auto'}} phrase={searchPhrase} onSearch={(phrase: string) => {setSearchPhrase(phrase)}}
              clearSearch={()=> {clearSearch()}}/>
          </div>
          {tableData.length > 0 ?
            <Paper className='tableArea'>
          <Table className='table'>
            <TableHead component='th' className='tableHead'>
                <TableCell className='tableHeadCell'>
                  <Typography className='tableHeadText'>
                    User
                  </Typography>
                </TableCell>
                <TableCell align='center' className='tableHeadCell'>
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={orderBy === 'date' ? order : 'asc'}
                    onClick={() => {
                      handleRequestSort('date');
                    }}
                  >
                    <Typography className='tableHeadText'>
                        Date
                    </Typography>
                  </TableSortLabel>
                </TableCell>
                {
                  isBugReport ? 
                  <TableCell align='center' className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                      Category
                    </Typography>
                  </TableCell> :
                  <TableCell align='center' className='tableHeadCell'>
                    <TableSortLabel
                      active={orderBy === 'rating'}
                      direction={orderBy === 'rating' ? order : 'asc'}
                      onClick={() => {
                        handleRequestSort('rating');
                      }}
                    >
                        <Typography className='tableHeadText'>
                          Rating
                        </Typography>
                    </TableSortLabel>
                  </TableCell>
                }
                <TableCell align='center' className='tableHeadCell'>
                  <Typography className='tableHeadText'>
                    Comments
                  </Typography>
                </TableCell>
            </TableHead>
            <TableBody>
              {tableData.length > 0 ? tableData.map(
                (row: IAppFeedback, index: number) => {
                  if(isBugReport && row.productRating > 0) {
                    return null
                  }
                  if(!isBugReport && row.productRating === 0) {
                    return null
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
                            : <div style={{maxWidth: 700}}>
                            <video width="30%" controls style={{display: 'block',
                                          marginTop: 20,
                                          marginLeft: 'auto',
                                          marginRight: 'auto',
                                          }}>
                              {/* <source src={signedUrlMapping[row.feedbackMedia.video]} type="video/mp4" /> */}
                            </video>
                            </div> : <div/> : <div/>
                          }
                        </div>
                        <div>
                          {
                            row.feedbackMedia? row.feedbackMedia.audio ? <AudioPlayer url={row.feedbackMedia.audio}/> : <div/> : <div/>
                          }
                        </div>
                      </TableCell>
                      
                    </TableRow>
                  );
                }
              ): <div/>}
            </TableBody>
          </Table>
        </Paper> : <div>No data to show.</div> }
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

