import { Container, Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody, MuiThemeProvider, Tooltip, makeStyles, Link, TextField, TextareaAutosize, Box, Backdrop, CircularProgress, TableSortLabel, Divider, TablePagination, TableContainer, Toolbar, lighten, Theme, createStyles, InputBase, IconButton, Grid } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { buttonStyle } from '../../../common/common';
import { getDate } from '../../../utils/data';

import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import AudioPlayer from './audioPlayer';
import SearchField from './SearchField';
import EnhancedTableHead from './TableMethods';
import RenderRatingFilter from './RenderFilters';
import RenderKeywordFilter from './RenderKeywordFilter';
import RenderSeverityFilter from './RenderSeverityFilter';
import RenderCategoryFilter from './RenderCategoryFilter';
import { updateSignedUrls, useActions } from '../../../actions';
import { IAppFeedback, ICommentObject } from './common';
import RenderStars from './RenderStarts';
import renderComments from './RenderComments';
import { getSignedUrl } from './methods';

interface IProps {
    tableData: IAppFeedback[],
    viewAttachmentClicked: Function,
    urls: string[],
    isBugReport: boolean,
    fetchMore: Function,
}

export type Order = 'asc' | 'desc';

export type IAlign = "right" | "left" | "inherit" | "center" | "justify" | undefined;

export const BUG_REPORT = 'bug_report'

export const FEEDBACK = 'feedback'

export const ALROUND = 'alround'

const RenderTable = (props: IProps) => {
    const classes = useStyles();
    const {isBugReport} = props;
    const [fetchAllUrls, setFetchAllUrls] = useState(false);
    const stateVariable = useSelector((state: IRootState) => {
      return state;
    });
    const [rawTableData, setRawTableData] = useState(props.tableData);
    const [tableData, setTableData] = useState<IAppFeedback[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [keyword, setKeyword] = useState("");
    const [searchInitiated, setSearchInitiated] = useState(false)

    /* Order related changes */
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState('date');

    const [feedbackKeywords, setFeedbackKeywords] = useState<string[]>([])
    const [bugReportKeywords, setBugReportKeywords] = useState<string[]>([])

    const updateSignedUrlData = useActions(updateSignedUrls);
    const signedUrlMapping = useSelector(
      (state: IRootState) => state.admin.signedUrls
    );
    //https://www.dusanstam.com/posts/material-ui-table-with-infinite-scroll
    const observer: any = useRef()
    const lastBookElementRef = useCallback((node: any) => {
      console.log(observer)
      console.log(node)
      if (observer && observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        console.log(entries[0])
        props.fetchMore()
      }})
      if (node) observer.current.observe(node)
    }, [tableData])

    const fetchSignedUrls = (urls: string[]) => {
      if(urls.length === 0) {
        return;
      }
      const signedUrlMappingCopy: any = {}
      return Promise.all(
        urls.map((url: string) => {
          return new Promise(async(resolve, reject) => {
            let signedUrl: any;
            if(signedUrlMapping && signedUrlMapping[url]) {
              signedUrl = signedUrlMapping[url]
            } else {
              signedUrl = await getSignedUrl(url, stateVariable);
            }
            if (signedUrl) {
              signedUrlMappingCopy[url] = signedUrl;
              return resolve({});
            } else {
              return reject({})
            }
          })
        })
      ).then(() => {setFetchAllUrls(true);
        updateSignedUrlData(signedUrlMappingCopy)}).catch((error) => {console.log(error)});
    }

    useEffect(() => {
      if(keyword) {
        const filteredTableData = rawTableData.filter((el) => {
          if(isBugReport && el.productRating > 0) {
            return false;
          }
          if(!isBugReport && el.productRating === 0) {
            return false;
          }
          if(el.feedbackComments ){
            const commentObjectArray = Object.values(JSON.parse(el.feedbackComments));
            let feedbackCommentsString = '';
            if(commentObjectArray.length > 0) {
              commentObjectArray.forEach((el: any) => {if(el.message) feedbackCommentsString += el.message})
            } 
            
            if(feedbackCommentsString.indexOf(keyword.toLowerCase()) >= 0) {
              return true;
            }
            return false;
          }
          return false;
        })
        setTableData(filteredTableData)
      }
    }, [keyword])

    const clearSearch = () => {
      const tableDataFiltered = rawTableData.filter((data) => {
        if(!isBugReport && data.productRating > 0) {
          return true
        }
        if(isBugReport && data.productRating === 0) {
          return true
        }
        return false;
      })
      applySort(tableDataFiltered);
      setSearchInitiated(false)
      setKeyword("")
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

    const sortTableBySeverity = (tableData: IAppFeedback[], sortOrder: string) => {
      const data = [...tableData];
      const severityMapping = {
        'Critical' : 5,
        'High': 4,
        'Medium': 3,
        'Low': 2,
        'Other': 1
      }
      data.sort((aData, bData) => {
        if (severityMapping[aData.bugPriority ? aData.bugPriority : 'Other'] > severityMapping[bData.bugPriority ? bData.bugPriority : 'Other']) {
          return sortOrder === 'desc' ? -1 : 1;
        } else if (severityMapping[aData.bugPriority ? aData.bugPriority : 'Other'] < severityMapping[bData.bugPriority ? bData.bugPriority : 'Other']) {
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
        } else if(orderBy === 'severity') {
          setTableData(sortTableBySeverity(sortData, 'asc'))
        }
      }
      if (order === 'desc') {
        if(orderBy === 'date') {
          setTableData(sortTableByDate(sortData, 'desc'))
        } else if(orderBy === 'rating') {
          setTableData(sortTableByRating(sortData, 'desc'))
        } else if(orderBy === 'severity') {
          setTableData(sortTableBySeverity(sortData, 'desc'))
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
        setOrder('desc');
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

    const filterRating = (val: number) => {
      let filteredTableData;
      if(val === -1) {
        filteredTableData = rawTableData.filter((data) => {
          if(!isBugReport && data.productRating > 0) {
            return true
          }
          if(isBugReport && data.productRating === 0) {
            return true
          }
          return false;
        })
      } else {
        filteredTableData = rawTableData.filter((el) => el.productRating === val ? true : false)
      }
      applySort(filteredTableData);
    }

    const filterSeverity = (val: string) => {
      let filteredTableData;
      if(val === "") {
        filteredTableData = rawTableData.filter((data) => {
          if(!isBugReport && data.productRating > 0) {
            return true
          }
          if(isBugReport && data.productRating === 0) {
            return true
          }
          return false;
        })
      } else {
        filteredTableData = rawTableData.filter((el) => el.bugPriority ? el.bugPriority.toLowerCase() === val.toLowerCase() ? true : false : false)
      }
      applySort(filteredTableData);
    }

    const filterCategory = (val: string) => {
      let filteredTableData;
      if(val === "") {
        filteredTableData = rawTableData.filter((data) => {
          if(!isBugReport && data.productRating > 0) {
            return true
          }
          if(isBugReport && data.productRating === 0) {
            return true
          }
          return false;
        })
      } else if(val === 'Other') {
        filteredTableData = rawTableData.filter((el) => (!el.feedbackCategory || (el.feedbackCategory.toLowerCase() === 'other')) && el.feedbackType === "BUG_REPORT" ? true : false )
      } else {
        filteredTableData = rawTableData.filter((el) => el.feedbackCategory ? el.feedbackCategory.toLowerCase() === val.toLowerCase() ? true : false : false)
      }
      applySort(filteredTableData);
    }

    return (
        <Container style={{marginTop: '5rem'}}>
          <Paper style={{padding: '2rem'}}>
            {isBugReport ? 
              <Grid container>
                <Grid item md={5}>
                  {
                    <RenderKeywordFilter keywords={bugReportKeywords} onSubmit={(val: string) => {setKeyword(val)}} onClear={()=> {clearSearch()}}/>
                  }
                </Grid>
                <Grid item lg={1}><Divider orientation="vertical" variant="middle"/></Grid>
                <Grid item md={6}>
                  {
                    <div>
                    <RenderSeverityFilter onSelect={(val: string) => {filterSeverity(val)}}/>
                    <Divider style={{marginTop: '1rem', marginBottom: '1rem', transform: 'translateX(-1rem) scaleX(1.1)'}}/>
                    <RenderCategoryFilter onSelect={(val: string) => {filterCategory(val)}}/>
                    </div>
                  }
                </Grid>
              </Grid> : <Grid container>
                  <Grid item md={6}>
                    {
                      <RenderKeywordFilter keywords={feedbackKeywords} onSubmit={(val: string) => {setKeyword(val)}} onClear={()=> {clearSearch()}}/>
                    }
                  </Grid>
                  <Grid item lg={1}><Divider orientation="vertical" variant="middle"/></Grid>
                  <Grid item md={5}>
                    {
                        <RenderRatingFilter onSelect={(val: number) => {filterRating(val)}}/>
                    }
                  </Grid>
              </Grid>
            }
          </Paper>
          <Paper className={classes.paper}>
          <Toolbar
            className={classes.root}
          >
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              {isBugReport ? 'Bugs Reported' : 'Feedback'}
            </Typography>
              <SearchField style={{marginTop: 10, marginLeft: 'auto'}}
                    keyword={keyword} 
                    searchInitiated ={searchInitiated}
                    onSearch={(keyword: string) => {setKeyword(keyword); setSearchInitiated(true)}}
                    clearSearch={()=> {clearSearch()}}/>
          </Toolbar>
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
              {tableData.map(
                (row: IAppFeedback, index: number) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      innerRef={index === tableData.length - 1 ? lastBookElementRef : null}
                      hover role="checkbox" tabIndex={-1} 
                      key={row.id}
                    >
                      <TableCell style={{fontSize: '1rem'}}>
                            {row.sourceIP ? (row.userId ? row.userId + '-' : "")  + row.sourceIP : row.userId ? row.userId : "-"}
                      </TableCell>
                      <TableCell align='center' style={{fontSize: '1rem', minWidth: '12rem'}}>
                            {row.createdOn ? getDate(row.createdOn) : '-'}
                      </TableCell>
                      {
                        isBugReport ? 
                        <TableCell  align='center' style={{fontSize: '1rem'}}>
                            {row.bugPriority}
                        </TableCell> :
                        <TableCell  align='center' style={{minWidth: '150px', fontSize: '1rem'}}>
                          <RenderStars rating={row.productRating}/>
                        </TableCell>
                      }
                      {
                        isBugReport ? 
                        <TableCell  align='center' style={{fontSize: '1rem'}}>
                            {row.feedbackCategory}
                        </TableCell> :
                        null
                      }
                      <TableCell align='center' style={{minWidth: '30vw', maxWidth: '30vw', fontSize: '1rem'}}>
                        <div style={{overflow: 'auto', maxHeight: '20vh'}}>
                            {renderComments(row.feedbackComments ? JSON.parse(row.feedbackComments) : undefined)}
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

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
                            {
                              signedUrlMapping && signedUrlMapping[row.feedbackMedia.image] ?
                                <img src={signedUrlMapping[row.feedbackMedia.image]} style={{width: 150, marginTop: 20}}></img> : <div/>
                            }
                          </Link> : <div/> : <div/>
                          }
                        </div>
                        <div>
                          {
                            row.feedbackMedia? row.feedbackMedia.video ? fetchAllUrls ?
                            <div style={{maxWidth: 700}}>
                            <video width="50%" controls style={row.feedbackMedia.image ?
                                          {
                                            display: 'flex',
                                            marginTop: 20,
                                            marginLeft: 20
                                          } : {
                                            display: 'block',
                                            marginTop: 20,
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                          }}>
                              <source src={signedUrlMapping[row.feedbackMedia.video]} type="video/mp4" />
                            </video>
                            </div>
                            : <div style={{maxWidth: 700}}>
                            <video width="50%" controls style={row.feedbackMedia.image ?
                                          {
                                            display: 'flex',
                                            marginTop: 20,
                                            marginLeft: 20
                                          } : {
                                            display: 'block',
                                            marginTop: 20,
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                          }}>
                            </video>
                            </div> : <div/> : <div/>
                          }
                        </div>
                        </div>
                        <div>
                          {
                            row.feedbackMedia? row.feedbackMedia.audio ? <AudioPlayer url={row.feedbackMedia.audio}/> : <div/> : <div/>
                          }
                        </div>
                        <div>
                          {
                            row.feedbackMedia? row.feedbackMedia.file ? fetchAllUrls ?
                              <a href={signedUrlMapping[row.feedbackMedia.file]} download>
                                <Link
                                  component="button"
                                  variant="body2"
                                  style={{fontSize: 11}}
                                  >Download attachment</Link>
                              </a>
                             : <div/> : <div/> : <div/>
                          }
                        </div>
                      </TableCell>
                      
                    </TableRow>
                  );
                }
              )}
            </TableBody>
            
            </Table>
          </TableContainer>
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
    table: {
      minWidth: 750,
    },
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
  }));

export default RenderTable;

