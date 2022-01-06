import { Container, Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody, MuiThemeProvider, Tooltip, makeStyles, Link, TextField, TextareaAutosize, Box, Backdrop, CircularProgress, TableSortLabel, Divider, TablePagination, TableContainer, Toolbar, lighten, Theme, createStyles } from '@material-ui/core';
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
import EnhancedTableHead from './TableMethods';

interface IProps {
    tableData: IAppFeedback[],
    viewAttachmentClicked: Function,
    urls: string[],
    isBugReport: boolean
}

export type Order = 'asc' | 'desc';

export type IAlign = "right" | "left" | "inherit" | "center" | "justify" | undefined;

const BUG_REPORT = 'bug_report'

const FEEDBACK = 'feedback'

const ALROUND = 'alround'



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

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }),
);



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
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    /* Order related changes */
    const [order, setOrder] = useState<Order>('desc');
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
        setsignedUrlMapping(signedUrlMappingCopy)}).catch((error) => {console.log(error)});
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
        const tableDataFiltered = props.tableData.filter((data) => {
          if(!isBugReport && data.productRating > 0) {
            return true
          }
          if(isBugReport && data.productRating === 0) {
            return true
          }
          return false;
        })
        setTableData(sortTableByDate(tableDataFiltered, 'desc'));
      }
    }, [])

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

    const EnhancedTableToolbar = () => {
      const classes = useToolbarStyles();
    
      return (
        <Toolbar
          className={classes.root}
        >
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {isBugReport ? 'Bugs Reported' : 'Feedback'}
          </Typography>
            <Tooltip title="Filter list">
            <SearchField style={{marginTop: 10, marginLeft: 'auto'}} phrase={searchPhrase} onSearch={(phrase: string) => {setSearchPhrase(phrase)}}
                  clearSearch={()=> {clearSearch()}}/>
            </Tooltip>
        </Toolbar>
      );
    };

    return (
        <Container>
          <Paper className={classes.paper}>
          <EnhancedTableToolbar/>
          <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={tableData.length}
              isBugReport={isBugReport}
            />
            <TableBody>
              {tableData.length > 0 ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                (row: IAppFeedback, index: number) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover role="checkbox" tabIndex={-1} 
                      key={index}
                    >
                      <TableCell >
                            {row.userId}
                      </TableCell>
                      <TableCell align='center'>
                            {row.createdOn ? getDate(row.createdOn) : '-'}
                      </TableCell>
                      {
                        isBugReport ? 
                        <TableCell  align='center'>
                            NA
                        </TableCell> :
                        <TableCell  align='center' style={{minWidth: '150px'}}>
                          <RenderStars rating={row.productRating}/>
                        </TableCell>
                      }
                      <TableCell align='center' style={{minWidth: '30vw', maxWidth: '30vw'}}>
                        <div style={{overflow: 'auto', maxHeight: '20vh'}}>
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
                            <video width="50%" controls style={{display: 'block',
                                          marginTop: 20,
                                          marginLeft: 'auto',
                                          marginRight: 'auto',
                                          }}>
                              <source src={signedUrlMapping[row.feedbackMedia.video]} type="video/mp4" />
                            </video>
                            </div>
                            : <div style={{maxWidth: 700}}>
                            <video width="50%" controls style={{display: 'block',
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
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            
            </Table>
          </TableContainer>
          <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              style={{minWidth: '50%', marginLeft: 'auto'}}
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        </Container>
    )
}

export const useStyles = makeStyles((theme) => ({
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
    paper: {
      width: '100%',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    table: {
      minWidth: 750,
    },
  }));

export default RenderTable;

