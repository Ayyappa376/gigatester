import { Container, Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody, MuiThemeProvider, Tooltip, makeStyles, Link, Divider, TablePagination, TableContainer, Toolbar, lighten, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { buttonStyle } from '../../../common/common';
import { getDate, getDateTime } from '../../../utils/data';
import FolderList from './FolderList';
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
import { TailSpin } from 'react-loader-spinner'
import RenderComments from './RenderComments';
import Failure from '../../failure-page';
import { table } from 'console';

interface IProps {
  tableData: IAppFeedback[],
  viewAttachmentClicked: Function,
  urls: string[],
  fetchMore: Function,
  focusRating: number[],
  setFocusRating: Function,
  focusSeverity: string[],
  setFocusSeverity: Function;
  focusCategory: string[],
  setFocusCategory: Function;
  categoryList: string[],
  order: Order,
  keyword: string,
  setKeyword: Function,
  clearSearch: Function,
  searchInitiated: boolean,
  setSearchInitiated: Function,
  handleRequestSort: Function,
  resultsFetched: boolean,
  currentType: string,
  disable: string,
  setDisable: Function,
  keys: boolean,
  category: boolean,
  severity: boolean,
  rating: boolean,
}

export type Order = 'asc' | 'desc';

export type IAlign = "right" | "left" | "inherit" | "center" | "justify" | undefined;

export const BUG_REPORT = 'bug_report'

export const FEEDBACK = 'feedback'

export const ALROUND = 'alround'

const RenderTable = (props: IProps) => {
  const classes = useStyles();
  const { tableData, resultsFetched, category, severity, keys, rating, setDisable, disable, urls } = props;
  const [fetchAllUrls, setFetchAllUrls] = useState(false);
  const [isBugReport, setBugReport] = useState<boolean>(false);
  const { ref, inView, entry } = useInView();
  const stateVariable = useSelector((state: IRootState) => {
    return state;
  });
  const [type, setType] = useState(() => {
    if (props.currentType) {
      return props.currentType;
    }
    return ''
  })
  const currentLength = tableData.length;

  useEffect(() => {
    if (inView && tableData.length > 5) {
      props.fetchMore()
    }
    return () => {
      // can't do anything to cancel fetch more.
    }
  }, [inView])

  useEffect(() => {
    if (type) {
      if (type === 'Feedback') {
        setBugReport(false);
      } else if (type === 'Bug') {
        setBugReport(true);
      }
    }
  }, [type])

  useEffect(() => {
    if (!fetchAllUrls && tableData.length > 0) {
      fetchSignedUrls(props.urls)
    }
  }, [urls])

  const updateSignedUrlData = useActions(updateSignedUrls);
  const signedUrlMapping = useSelector(
    (state: IRootState) => state.admin.signedUrls
  );

  const fetchSignedUrls = (urls: string[]) => {
    // console.log(urls, 'inital url load')
    if (urls.length === 0) {
      return;
    }
    const signedUrlMappingCopy: any = {}
    let isUrlMissing = false;
    return Promise.all(
      urls.map((url: string) => {
        return new Promise(async (resolve, reject) => {
          let signedUrl: any;
          const time24HrsMilli = 24 * 60 * 60 * 1000;
          const timeNowMilli = new Date().getTime();
          if (signedUrlMapping && signedUrlMapping[url] && signedUrlMapping[url].signedUrl && ((timeNowMilli - signedUrlMapping[url].date) < time24HrsMilli)) {
            signedUrl = signedUrlMapping[url].signedUrl;
            signedUrlMappingCopy[url] = { signedUrl, date: signedUrlMapping[url].date };
            return resolve({})
          } else {
            isUrlMissing = true;
            signedUrl = await getSignedUrl(url, stateVariable).catch((e) => {
              return resolve({}) // we need to use resolve even in catch scenearios because the promise chain will get resolved only when every promise will resolve.
            });
            if (signedUrl) {
              const now = new Date();
              signedUrlMappingCopy[url] = { signedUrl, date: now.getTime()};
              return resolve({});
            } else {
              return resolve({})
            }
          }
        })
      })
    ).then(() => {
      setFetchAllUrls(true);
      if (isUrlMissing) {
        updateSignedUrlData(signedUrlMappingCopy)
      }
    }
    ).catch((error) => { console.error(error) });
  }

  const handleOnSearch = (search: any) => { props.setKeyword(search); props.setSearchInitiated(true) };

  return (
    <Container style={{marginTop: '5rem'}}>
      <Paper className={classes.filters}>
      {disable.length > 0 ? <Alert className={classes.info} severity="info">
        Deselect button to reactivate filters
        </Alert> : <Alert className={classes.info} severity="info">
          Please only select one filter at a time. Other options will disabled automatically when selecting
        </Alert>}
        {isBugReport ?
          <Grid container>
            <Grid item md={5}>
              {
                <RenderKeywordFilter keys={keys} setDisable={setDisable} onSubmit={(val: string) => {props.setKeyword(val)}} onClear={()=> {props.clearSearch()}}/>
              }
            </Grid>
            <Grid item lg={1}><Divider orientation="vertical" variant="middle"/></Grid>
            <Grid item md={6}>
              {
                <div>
                <RenderSeverityFilter severity={severity} setDisable={setDisable} focusSeverity={props.focusSeverity} setFocusSeverity={props.setFocusSeverity} disableButtons={!resultsFetched && (tableData.length === 0 || props.searchInitiated)}/>
                <Divider style={{marginTop: '1rem', marginBottom: '1rem', transform: 'translateX(-1rem) scaleX(1.1)'}}/>
                <RenderCategoryFilter category={category} setDisable={setDisable} focusCategory={props.focusCategory} setFocusCategory={props.setFocusCategory} type={type} disableButtons={!resultsFetched && (tableData.length === 0 || props.searchInitiated)} categoryList={props.categoryList}/>
                </div>
              }
            </Grid>
          </Grid> : <Grid container>
              <Grid item md={6}>
                {
                  <RenderKeywordFilter keys={keys} setDisable={setDisable} onSubmit={(val: string) => {props.setKeyword(val)}} onClear={()=> {props.clearSearch()}}/>
                }
              </Grid>
              <Grid item lg={1}><Divider orientation="vertical" variant="middle"/></Grid>
              <Grid item md={5}>
                {
                    <div>
                      <RenderRatingFilter rating={rating}  setDisable={setDisable} focusRating={props.focusRating} setFocusRating={props.setFocusRating} disableButtons={!resultsFetched && (tableData.length === 0 || props.searchInitiated)}/>
                      <Divider style={{marginTop: '1rem', marginBottom: '1rem', transform: 'translateX(-1rem) scaleX(1.1)'}}/>
                      <RenderCategoryFilter category={category} setDisable={setDisable} focusCategory={props.focusCategory} setFocusCategory={props.setFocusCategory} type={type} disableButtons={!resultsFetched && (tableData.length === 0 || props.searchInitiated)} categoryList={props.categoryList}/>
                    </div>
                }
              </Grid>
          </Grid>
        }
        </Paper>
      <div className={classes.paper}>
      <Toolbar
        className={classes.root}
      >
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {`${type}`}
        </Typography>
          <SearchField style={{marginTop: 10, marginLeft: 'auto'}} key="SearchFieldEl"
                default={props.keyword}
                searchInitiated ={props.searchInitiated}
                onSearch={handleOnSearch}
                clearSearch={props.clearSearch}/>
      </Toolbar>
      <TableContainer className={classes.tableCont} >
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        size={'medium'}
        aria-label="enhanced table"
      >
        <EnhancedTableHead
          classes={classes}
          order={props.order}
          onRequestSort={(property: string) => { props.handleRequestSort()}}
          rowCount={tableData.length}
          isBugReport={isBugReport}
          searchInitiated={props.searchInitiated}
        />{tableData.length > 0 ?
        <TableBody>
          {props.tableData.map(
            (row: IAppFeedback, index: number) => {
//              const labelId = `enhanced-table-checkbox-${index}`;
/*              let sourceDetails = '-';
              let osInfo = '-';

              if(row.userId) sourceDetails = row.userId;

              if(row.sourceIP) sourceDetails = sourceDetails === '-' ? row.sourceIP : sourceDetails + '-' + row.sourceIP;

              let platformInfo;
              if(row.platformName) {
                if(row.platformVersion) {
                  platformInfo = `(${row.platformName} - ${row.platformVersion})`
                } else {
                  platformInfo = row.platformName;
                }
                sourceDetails = sourceDetails === '-' ? platformInfo : sourceDetails + '-' + platformInfo;
              }
              if(row.platformOs) osInfo = osInfo  === '-' ? Object.values(row.platformOs).join('-') : sourceDetails + '-' + Object.values(row.platformOs).join('-');
*/
              const platformInfo = row.platformName ?
                (row.platformVersion ? `${row.platformName} - ${row.platformVersion}`: row.platformName) :
                '-';
              const osInfo = row.platformOs ? Object.values(row.platformOs).join('  - ') : '-';
              return (
                <TableRow
                  innerRef={index === tableData.length - 1 ? ref : null}
                  hover role="checkbox" tabIndex={-1}
                  key={row.id}
                >
                  <TableCell style={{fontSize: '1rem', maxWidth: '12rem', overflowWrap: 'break-word'}}>
                        <FolderList userId={row.userId} platformInfo={platformInfo} sourceIp={row.sourceIP} osInfo={osInfo} />
                  </TableCell>
                  <TableCell align='center' style={{fontSize: '1rem', minWidth: '12rem'}}>
                        {row.createdOn ? getDateTime(row.createdOn) : '-'}
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
                    <TableCell  align='center' style={{fontSize: '1rem'}}>
                        {row.feedbackCategory ? row.feedbackCategory : '-'}
                    </TableCell>
                  <TableCell align='left' style={{maxWidth: '30vw', fontSize: '1rem'}}>
                    <div style={{overflow: 'auto', maxHeight: '20vh'}}>
                        <RenderComments category={row.feedbackCategory} isBugReport={isBugReport} comments={(row.feedbackComments && (typeof row.feedbackComments === 'string')? JSON.parse(row.feedbackComments) : undefined)} old={true}/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                    <div key="image-attachment">
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
                          signedUrlMapping && signedUrlMapping[row.feedbackMedia.image] && signedUrlMapping[row.feedbackMedia.image].signedUrl ?
                            <img src={signedUrlMapping[row.feedbackMedia.image].signedUrl} style={{width: 150, marginTop: 10}}></img> : <div/>
                        }
                      </Link> : <div/> : <div/>
                      }
                    </div>
                    <div key="video-attachment">
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
                          <source src={signedUrlMapping[row.feedbackMedia.video] ? signedUrlMapping[row.feedbackMedia.video].signedUrl ?
                            signedUrlMapping[row.feedbackMedia.video].signedUrl : '' : ''} type="video/mp4" />
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
                    <div key="audio-attachment">
                      {
                        row.feedbackMedia? row.feedbackMedia.audio ? <AudioPlayer url={row.feedbackMedia.audio}/> : <div/> : <div/>
                      }
                    </div>
                    <div key="file-attachment">
                      {
                        row.feedbackMedia? row.feedbackMedia.file ? fetchAllUrls ?
                          <a href={signedUrlMapping[row.feedbackMedia.file] ? signedUrlMapping[row.feedbackMedia.file].signedUrl ?
                            signedUrlMapping[row.feedbackMedia.file].signedUrl : '' : ''} download target="_blank">
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
        :  <TableBody><TableRow><TableCell><div style={{width: props.resultsFetched ? '249%' : '400%', padding: '.2rem 0 .2rem 0'}}>
            {
              props.resultsFetched ? <div style={{marginLeft: "62%", transform: 'translateX: "-50%'}}>{`There are no ${isBugReport? 'bugs' : 'feedbacks'} to show.`}</div> :
              <TailSpin wrapperStyle={{marginLeft: "62%", transform: 'translateX: "-50%'}} height="60"
              width="30"
              color='black'
              ariaLabel='loading'/>
            }
            </div>
            </TableCell>
            </TableRow>
            </TableBody>
      }
        </Table>
      </TableContainer>
    </div>
    </Container>
)
}


// style={{ marginLeft: "62%", transform: 'translateX: "-50%' }}
//style={{ width: props.resultsFetched ? '249%' : '400%', padding: '.2rem 0 .2rem 0' }}

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
  filters: {
    width: '100%',
    backgroundColor: 'transparent',
    border: '1px solid #D8D8D8',
    borderRadius: '10px',
    boxShadow: 'none',
    padding: '15px',
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    width: 'auto',
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
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '85%',
    height: '25px',
    fontSize: '15px',
    padding: '0',
    marginBottom: '10px',
    borderRadius: '10px',
  },
  tableCont: {
    width: '100%',
    overflow: 'auto',
  }
}));

export default RenderTable;

