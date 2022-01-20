import { Container, Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody, MuiThemeProvider, Tooltip, makeStyles, Link, TextField, TextareaAutosize, Box, Backdrop, CircularProgress, TableSortLabel, Divider, TablePagination, TableContainer, Toolbar, lighten, Theme, createStyles, InputBase, IconButton, Grid } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { buttonStyle } from '../../../common/common';
import { getDate } from '../../../utils/data';

import { useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import AudioPlayer from './audioPlayer';
import SearchField from './SearchField';
import EnhancedTableHead from './EnhancedTableHead';
import RenderRatingFilter from './RenderFilters';
import RenderKeywordFilter from './RenderKeywordFilter';
import RenderSeverityFilter from './RenderSeverityFilter';
import RenderCategoryFilter from './RenderCategoryFilter';
import { updateSignedUrls, useActions } from '../../../actions';
import { IAppFeedback, ICommentObject } from './common';
import RenderStars from './RenderStarts';
import renderComments from './RenderComments';
import { getSignedUrl } from './methods';
import { useInView } from 'react-intersection-observer';

interface IProps {
    tableData: IAppFeedback[],
    viewAttachmentClicked: Function,
    urls: string[],
    isBugReport: boolean,
    fetchMore: Function,
    filterSeverity: Function,
    filterCategory: Function,
    filterRating: Function,
    order: Order,
    keyword: string,
    setKeyword: Function,
    clearSearch: Function,
    searchInitiated: boolean,
    setSearchInitiated: Function,
    handleRequestSort: Function,
}

export type Order = 'asc' | 'desc';

export type IAlign = "right" | "left" | "inherit" | "center" | "justify" | undefined;

export const BUG_REPORT = 'bug_report'

export const FEEDBACK = 'feedback'

export const ALROUND = 'alround'

const RenderTable = (props: IProps) => {
    const classes = useStyles();
    const {isBugReport, tableData} = props;
    const [fetchAllUrls, setFetchAllUrls] = useState(false);
    const { ref, inView, entry } = useInView();
    const stateVariable = useSelector((state: IRootState) => {
      return state;
    });

    useEffect(() => {
      console.log({inView})
      if(inView) {
        props.fetchMore()
      }
    }, [inView])

    useEffect(() => {
      if(!fetchAllUrls) {
        fetchSignedUrls(props.urls)
      }
    }, [])
    const updateSignedUrlData = useActions(updateSignedUrls);
    const signedUrlMapping = useSelector(
      (state: IRootState) => state.admin.signedUrls
    );
    //https://www.dusanstam.com/posts/material-ui-table-with-infinite-scroll
    /* const observer: any = useRef()

    const newIntersectionObserver = new IntersectionObserver(); */
    /* const lastBookElementRef = useCallback((node: any) => {
      console.log(observer)
      console.log(node)
      if (observer && observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        console.log(entries[0])
        props.fetchMore()
      }})
      if (node) observer.current.observe(node)
    }, [tableData]) */

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

    return (
        <Container style={{marginTop: '5rem'}}>
          <Paper style={{padding: '2rem'}}>
            {isBugReport ? 
              <Grid container>
                <Grid item md={5}>
                  {
                    <RenderKeywordFilter onSubmit={(val: string) => {props.setKeyword(val)}} onClear={()=> {props.clearSearch()}}/>
                  }
                </Grid>
                <Grid item lg={1}><Divider orientation="vertical" variant="middle"/></Grid>
                <Grid item md={6}>
                  {
                    <div>
                    <RenderSeverityFilter onSelect={(val: string) => {props.filterSeverity(val)}}/>
                    <Divider style={{marginTop: '1rem', marginBottom: '1rem', transform: 'translateX(-1rem) scaleX(1.1)'}}/>
                    <RenderCategoryFilter onSelect={(val: string) => {props.filterCategory(val)}}/>
                    </div>
                  }
                </Grid>
              </Grid> : <Grid container>
                  <Grid item md={6}>
                    {
                      <RenderKeywordFilter onSubmit={(val: string) => {props.setKeyword(val)}} onClear={()=> {props.clearSearch()}}/>
                    }
                  </Grid>
                  <Grid item lg={1}><Divider orientation="vertical" variant="middle"/></Grid>
                  <Grid item md={5}>
                    {
                        <RenderRatingFilter onSelect={(val: number) => {props.filterRating(val)}}/>
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
                    keyword={props.keyword} 
                    searchInitiated ={props.searchInitiated}
                    onSearch={(keyword: string) => {props.setKeyword(keyword); props.setSearchInitiated(true)}}
                    clearSearch={()=> {props.clearSearch()}}/>
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
              order={props.order}
              onRequestSort={(property: string) => props.handleRequestSort}
              rowCount={tableData.length}
              isBugReport={isBugReport}
            />
            <TableBody>
              {props.tableData.map(
                (row: IAppFeedback, index: number) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      innerRef={index === tableData.length - 1 ? ref : null}
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

