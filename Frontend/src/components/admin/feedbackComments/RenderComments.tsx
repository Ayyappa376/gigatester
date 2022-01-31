import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { ICommentObject } from './common';

const RenderNumber = (props: any) => {
  return (
    <div className={props.cname}>
      {parseInt(props.val, 10) + 1}
    </div>
  )
}

interface IProps {
  comments?: ICommentObject,
  old?: boolean,
  category?: string,
  isBugReport: boolean,
}

const RenderComments = (props: IProps) => {
  const {comments, old} = props;
  const classes = useStyles();
  
  if(comments && Object.keys(comments).length > 0) {
    let commentText = '';
    Object.keys(comments).forEach((comment: string) => {
      if(comments[comment] && comments[comment].message) {
        commentText = commentText + '\n' + comments[comment].message
      }
      if(comments[comment] && comment === 'generalComment') {
        commentText = commentText + '\n' + comments[comment]
      }
      if(comments[comment] && comment === 'standardFeedback') {
        commentText = commentText + '\n' + comments[comment]
      } 
    });

    const sortedKeys = Object.keys(comments).sort((a: string, b: string) => {
      if(a === 'standardFeedback') {
        return -1;
      }
      if(b === 'standardFeedback') {
        return 1;
      }
      if(parseInt(a, 10) === NaN) return -1;
      if(parseInt(b, 10) === NaN) return 1;
      if(a > b) return 1;
      if(b > a) return -1;
      return 0;
    })
    
    return(
      <div >
        <div >
          {
            comments['standardFeedback'] && props.category && comments['standardFeedback'].length >  0 ?
              <div style={{marginTop: '1rem'}}>
                <Typography color="textSecondary" style={{fontSize: '.85rem'}}>{`${props.category} related ${props.isBugReport? 'bugs' : 'feedbacks'}:`}</Typography>
                {
                  comments['standardFeedback'].map((el: string) => {
                    return <div key={el} style={{marginTop: 'auto', marginBottom: 'auto'}}>&#9679;&nbsp;{el}</div>
                  })
                }
              </div> : <div/>
          }
        </div>
        <div>
          {
            Object.keys(comments).length > 2 ? 
              <div style={{marginTop: '1rem'}}>
                <Typography color="textSecondary" style={{fontSize: '.85rem'}}>Screen shot comments:</Typography>
                    {sortedKeys.map((key: string) => {
                        if(comments[key].message) {
                          if(old) {
                            return ( 
                              <div key={key}>
                                <div>&#9679;&nbsp;{comments[key].message}</div>
                              </div>
                            )
                          }
                          return (
                            <div key={key} style={{display: 'flex', marginTop: '1rem'}}>
                              <RenderNumber val={key} cname={classes.numbers}/>
                              <div style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: '.5rem'}}>{comments[key].message}</div>
                            </div>
                          )
                        }
                    })}
              </div> : <div/>
          }
        </div>
        <div>
          {
            comments['generalComment'] ?
              <div style={{marginTop: '1rem'}}>
                <Typography color="textSecondary" style={{fontSize: '.85rem'}}>User remarks:</Typography>
                <div style={{marginTop: 'auto', marginBottom: 'auto'}}>&#9679;&nbsp;{comments['generalComment']}</div>
              </div> : <div/>
          }
        </div>
      </div>)
    } else {
      return <div>-</div>
    }
}

const useStyles = makeStyles(() => ({
  numbers: {
    borderRadius: '50%',
    backgroundColor: '#205fc0',
    color: '#fff',
    minHeight: '1.7rem',
    maxHeight: '1.7rem',
    minWidth: '1.7rem',
    maxWidth: '1.7rem',
    fontSize: '.8rem',
    textAlign: 'center',
    padding: '.3rem 0',
    marginTop: 'auto',
    marginBottom: 'auto'
  }
}));

export default RenderComments;