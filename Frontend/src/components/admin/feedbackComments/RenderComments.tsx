import { Box } from '@material-ui/core';
import React from 'react';
import { ICommentObject } from './common';

const renderComments = (comments: ICommentObject | undefined) => {
    if(comments && Object.keys(comments).length > 0) {
      let commentText = '';
      Object.keys(comments).forEach((comment: any) => {
        if(comments[comment] && comments[comment].message) {
          commentText = commentText + '\n' + comments[comment].message}
        }
      );
      return(
        <div>
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

export default renderComments;