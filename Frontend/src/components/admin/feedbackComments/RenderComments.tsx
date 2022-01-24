import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { ICommentObject } from './common';

const RenderNumber = (props: any) => {
  return (
    <div className={props.cname}>
      {props.key}
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
      Object.keys(comments).forEach((comment: any) => {
        if(comments[comment] && comments[comment].message) {
          commentText = commentText + '\n' + comments[comment].message}
        }
      );
      const sortedKeys = Object.keys(comments).sort((a: string, b: string) => {
        if(parseInt(a, 10) === NaN) return 1;
        if(parseInt(b, 10) === NaN) return -1;
        if(a > b) return -1;
        if(b > a) return 1;
        return 0;
      })
      return(
        <div>
          {old? 
          <Box
            aria-label="rating comments"
            style={{ width: "100%" }}
          >{commentText}</Box> :
          <div>
          {sortedKeys.map((key: string) => {
            if(parseInt(key, 10) === NaN) {

            } else {
              return <div style={{display: 'flex'}}>
                <RenderNumber key={key} cname={classes.numbers}/>
                {commentText}
              </div>
            }
          })}
        </div>
        }
        </div>
      )
    } else {
      return <div>-</div>
    }
  }

const useStyles = makeStyles(() => ({
  numbers: {borderRadius: '50%',
     backgroundColor: '#205fc0',
     color: '#fff',
     height: '2rem',
     width: '2rem',
     fontSize: '1rem'}
}));

export default RenderComments;