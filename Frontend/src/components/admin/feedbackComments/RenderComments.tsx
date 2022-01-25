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
  old?: boolean
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
        commentText = commentText + '\n' + comments[comment]}
      }
    );

    const sortedKeys = Object.keys(comments).sort((a: string, b: string) => {
      if(parseInt(a, 10) === NaN) return -1;
      if(parseInt(b, 10) === NaN) return 1;
      if(a > b) return 1;
      if(b > a) return -1;
      return 0;
    })

    return(
      <div>
        {old? 
          <Box
            aria-label="rating comments"
            style={{ width: "100%" }}
          >{commentText}</Box> :
          <div style={{marginTop: '1.5rem'}}>
            {sortedKeys.map((key: string) => {
              if (key === 'generalComment') {
                return (
                  <div style={{marginTop: '1rem'}}>
                    <Typography color="textSecondary" style={{fontSize: '.85rem'}}>User remarks:</Typography>
                    <div style={{marginTop: 'auto', marginBottom: 'auto'}}>{comments[key]}</div>
                  </div>
                )
              }
              return ( 
                <div style={{display: 'flex', marginTop: '1rem'}}>
                  <RenderNumber val={key} cname={classes.numbers}/>
                  <div style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: '.5rem'}}>{comments[key].message}</div>
                </div>
              )
            })}
          </div>}
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