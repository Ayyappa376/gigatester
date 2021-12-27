import { Container, Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody, MuiThemeProvider, Tooltip, makeStyles, Link } from '@material-ui/core';
import React from 'react';
import { IAppFeedback } from '.';
import { buttonStyle, tooltipTheme } from '../../../common/common';
import { getDate } from '../../../utils/data';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

interface IProps {
    tableData: IAppFeedback[],
    viewAttachmentClicked: Function
}

export const RenderStars = (props: any) => {
  const arr = [1,2,3,4,5];
  return (
      <div style={{alignItems: "center"}}>
      <div>
          {arr.map((el, i) => {
              return (i <= props.rating ? <FavoriteIcon/> : <FavoriteBorderIcon/>)
          })}
      </div>
      </div>
  )
}

export const renderComments = (comments: string[] | undefined) => {
  return (
    <div>
      {comments?
        <div>
            { comments.length > 0 ? comments.map((comment) => {
                return (
                    <div>
                            <Typography color="textPrimary" style={{fontWeight: 500}}>{comment}</Typography>
                    </div>
                )
            }) : <Typography color="textPrimary" style={{fontWeight: 500}}>-</Typography>}
        </div>: <div>-</div>
    }
    </div>
  )
}

const RenderTable = (props: IProps) => {
    const classes = useStyles();

    

    return (
        <Container>
            <Paper className='tableArea'>
          <Table className='table'>
            <TableHead className='tableHead'>
              <TableRow>
                <TableCell className='tableHeadCell'>
                  <Typography className='tableHeadText'>
                    User
                  </Typography>
                </TableCell>
                <TableCell align='center' className='tableHeadCell'>
                    <Typography className='tableHeadText'>
                        Date
                    </Typography>
                </TableCell>
                <TableCell align='center' className='tableHeadCell'>
                  <Typography className='tableHeadText'>
                    Rating
                  </Typography>
                </TableCell>
                <TableCell align='center' className='tableHeadCell'>
                  <Typography className='tableHeadText'>
                    Comments
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.tableData.length > 0 ? props.tableData.map(
                (row: IAppFeedback, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell
                        component='th'
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
                      <TableCell component='th' scope='row' align='center'>
                        <Typography className='tableBodyText'>
                          {row.createdOn ? getDate(row.createdOn) : '-'}
                        </Typography>
                      </TableCell>
                      <TableCell component='th' scope='row' align='center'>
                             <RenderStars rating={row.productRating}/>
                      </TableCell>
                      <TableCell component='th' scope='row' align='center'>
                        <Typography className='tableBodyText'>
                            {renderComments(row.feedbackComments)}
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
                                row.feedbackMedia? row.feedbackMedia.video ? <Link
                                component="button"
                                variant="body2"
                                style={{fontSize: 11}}
                                onClick={() => {
                                  props.viewAttachmentClicked(row.feedbackMedia.video, row.id, 'video');
                                }}
                              >
                                Watch video
                              </Link> : <div/> : <div/>
                              
                              }
                            </div>
                        </Typography>
                      </TableCell>
                      
                    </TableRow>
                  );
                }
              ): <div/>}
            </TableBody>
          </Table>
        </Paper>
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