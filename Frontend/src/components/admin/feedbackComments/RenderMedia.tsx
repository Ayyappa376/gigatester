import {
	createStyles,
	makeStyles,
	Theme,
	Box,
	Link,
	lighten,
  IconButton,
  Typography,

} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getDate, getDateTime } from '../../../utils/data';
import FolderList from './FolderList';
import { buttonStyle } from '../../../common/common';
import RenderComments from './RenderComments';
import RenderStars from './RenderStarts';
import AudioPlayer from './audioPlayer';

interface RowMediaProps {
	row: any;
	fetchAllUrls: boolean;
	signedUrlMapping: any;
	props: any;
}

const RenderMedia = ({
  row,
  signedUrlMapping,
  fetchAllUrls,
  props,
}: RowMediaProps) => {
	const classes = useStyles();
	const [show, setShow] = useState(false);

  return (
    <div className={classes.container}>
      {/* <Box sx={{ padding: '4px'}}>
        <Typography className={classes.label}>Attachment:</Typography>
      </Box> */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div key='image-attachment'>
        {row.feedbackMedia ? (
          row.feedbackMedia.image ? (
            <Link
              component='button'
              variant='body2'
              style={{ fontSize: 11 }}
              onClick={() => {
                props.viewAttachmentClicked(
                  row.feedbackMedia.image,
                  row.id,
                  'image',
                );
              }}
            >
              {signedUrlMapping &&
              signedUrlMapping[row.feedbackMedia.image] &&
              signedUrlMapping[row.feedbackMedia.image]
                .signedUrl ? (
                <img
                  src={
                    signedUrlMapping[row.feedbackMedia.image]
                      .signedUrl
                  }
                  style={{ maxWidth: '300px', marginTop: 10 }}
                ></img>
              ) : (
                <div />
              )}
            </Link>
          ) : (
            <div />
          )
        ) : (
          <div />
        )}
      </div>
      <div key='video-attachment'>
        {row.feedbackMedia ? (
          row.feedbackMedia.video ? (
            fetchAllUrls ? (
              <div style={{ maxWidth: 600 }}>
                <video
                  width='40%'
                  controls
                  style={
                    row.feedbackMedia.image
                      ? {
                          display: 'flex',
                          marginTop: 20,
                          marginLeft: 20,
                        }
                      : {
                          display: 'block',
                          marginTop: 20,
                          marginLeft: 'auto',
                          marginRight: 'auto',
                        }
                  }
                >
                  <source
                    src={
                      signedUrlMapping[
                        row.feedbackMedia.video
                      ]
                        ? signedUrlMapping[
                            row.feedbackMedia.video
                          ].signedUrl
                          ? signedUrlMapping[
                              row.feedbackMedia.video
                            ].signedUrl
                          : ''
                        : ''
                    }
                    type='video/mp4'
                  />
                </video>
              </div>
            ) : (
              <div style={{ maxWidth: 600 }}>
                <video
                  width='50%'
                  controls
                  style={
                    row.feedbackMedia.image
                      ? {
                          display: 'flex',
                          marginTop: 20,
                          marginLeft: 20,
                        }
                      : {
                          display: 'block',
                          marginTop: 20,
                          marginLeft: 'auto',
                          marginRight: 'auto',
                        }
                  }
                ></video>
              </div>
            )
          ) : (
            <div />
          )
        ) : (
          <div />
        )}
      </div>
    </div>
    <div key='audio-attachment'>
      {row.feedbackMedia ? (
        row.feedbackMedia.audio ? (
          <AudioPlayer url={row.feedbackMedia.audio} />
        ) : (
          <div />
        )
      ) : (
        <div />
      )}
    </div>
    <div key='file-attachment'>
      {row.feedbackMedia ? (
        row.feedbackMedia.file ? (
          fetchAllUrls ? (
            <a
              href={
                signedUrlMapping[row.feedbackMedia.file]
                  ? signedUrlMapping[row.feedbackMedia.file]
                      .signedUrl
                    ? signedUrlMapping[row.feedbackMedia.file]
                        .signedUrl
                    : ''
                  : ''
              }
              download
              target='_blank'
            >
              <Link
                component='button'
                variant='body2'
                style={{ fontSize: 11 }}
              >
                Download attachment
              </Link>
            </a>
          ) : (
            <div />
          )
        ) : (
          <div />
        )
      ) : (
        <div />
      )}
    </div>
  </div>
	);
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '150px',
    },
    label: {
      fontSize: '12px',
      color: 'gray',
    },
	}),
);

export default RenderMedia;