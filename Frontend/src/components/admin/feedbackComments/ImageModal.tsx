import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Grid, makeStyles, Modal, Typography } from '@material-ui/core';
import { buttonStyle } from '../../../common/common';
import Close from '@material-ui/icons/Close';
import Image from 'material-ui-image'
import RenderStars from './RenderStars';
import Draggable from 'react-draggable';
import RenderComments from './RenderComments';

interface ImageModalProps {
  showImageModal: boolean,
  handleCloseModal: any,
  attachmentType: string,
  handleImageClicked: any,
  signedImageUrl: string,
  focusAttachmentUid: string,
  getUserId: Function,
  getUserIp: Function,
  getDateString: Function,
  getProductVersion: Function,
  getBugCategory: Function,
  getBugSeverity: Function,
  getRating: Function | undefined,
  getComments: Function,
  isBugReport: boolean | undefined,
}

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '36px',
    position: 'relative',
    left: '45%',
    minWidth: '10%',
    ...buttonStyle,
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
  modalContainer: {
    alignItems: 'center',
    marginTop: '5vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '70vw',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    border: '1px solid',
    boxShadow: '0 0 14px 0 rgb(15 17 17 / 50%)',
    padding: 0,
    paddingBottom: 30
  },
}));

const ImageModal = ({
  showImageModal,
  handleCloseModal,
  attachmentType,
  handleImageClicked,
  signedImageUrl,
  focusAttachmentUid,
  getUserId,
  getUserIp,
  getDateString,
  getProductVersion,
  getBugSeverity,
  getRating,
  getComments,
  getBugCategory,
  isBugReport,
}: ImageModalProps) => {
  const classes = useStyles();
  return (
    <Draggable handle="#handle">
    <Modal aria-describedby='simple-modal-description' hideBackdrop={true} open={showImageModal}>
      <div style={{resize: 'both', overflow: 'auto'}} className={classes.modalContainer}>
        <div id="handle" style={{backgroundColor: 'rgb(40 120 240)', minWidth: '100%', height: 37, position: 'relative', cursor: 'move'}}>
          <Close  style={{position: 'absolute', cursor: 'pointer',
            top: 7, right: 7
          }} onClick={handleCloseModal}/>
        </div>
        <div style={{padding: 30}}>
          <Grid container>
            <Grid item sm={9}>
              {attachmentType == 'image' ?
                <Image aspectRatio={4/3} onClick={handleImageClicked} width='90%' style={{display: 'block',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              marginTop: 20,
                              cursor: 'pointer',
                              /* objectFit: 'cover',
                              objectPosition: 'center top' */
                              }} src={signedImageUrl} /> :
                <video width="90%" controls style={{display: 'block',
                              marginTop: 20,
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              }}>
                  <source src={signedImageUrl} type="video/mp4" />
                </video>
              }
            </Grid>
            <Grid style={{padding: 15, paddingTop: 0}} item sm={3}>
              <Grid container style={{marginTop: '20px'}}>
                <Grid item sm={12} >
                  <div style={{display: 'flex'}}>
                  <Typography color="textSecondary" style={{fontSize: '.85rem'}}>Username: &nbsp;</Typography>
                  <Typography color="textPrimary" style={{fontWeight: 500, fontSize: '.85rem'}}>{getUserId(focusAttachmentUid)}</Typography>
                  </div>
                  <div style={{display: 'flex'}}>
                  <Typography color="textSecondary" style={{fontSize: '.85rem'}}>Source Ip: &nbsp;</Typography>
                  <Typography color="textPrimary" style={{fontWeight: 500, fontSize: '.85rem'}}>{getUserIp(focusAttachmentUid)}</Typography>
                  </div>
                  <div style={{display: 'flex'}}>
                  <Typography color="textSecondary" style={{fontSize: '.85rem'}}>Date: &nbsp;</Typography>
                  <Typography color="textPrimary" style={{fontWeight: 500, fontSize: '.85rem'}}>{getDateString(focusAttachmentUid)}</Typography>
                  </div>
                  <div style={{display: 'flex'}}>
                  <Typography color="textSecondary" style={{fontSize: '.85rem'}}>Product Version: &nbsp;</Typography>
                  <Typography color="textPrimary" style={{fontWeight: 500, fontSize: '.85rem'}}>{getProductVersion(focusAttachmentUid)}</Typography>
                  </div>
                  <div style={{display: 'flex'}}>
                  <Typography color="textSecondary" style={{fontSize: '.85rem'}}>Category: &nbsp;</Typography>
                  <Typography color="textPrimary" style={{fontWeight: 500, fontSize: '.85rem'}}>{getBugCategory(focusAttachmentUid)}</Typography>
                  </div>
                  {/* {isBugReport ? <div style={{display: 'flex'}}>
                  <Typography color="textSecondary" style={{fontSize: '.85rem'}}>Bug Severity: &nbsp;</Typography>
                  <Typography color="textPrimary" style={{fontWeight: 500, fontSize: '.85rem'}}>{getBugSeverity(focusAttachmentUid)}</Typography>
                  </div> :
                  <RenderStars rating={getRating(focusAttachmentUid)}/>} */}
                </Grid>
                </Grid>
                <div style={{fontWeight: 500, maxHeight: 500, overflow: 'auto'}}>
                  <RenderComments comments={getComments(focusAttachmentUid)} isBugReport={isBugReport} old={false} category={getBugCategory(focusAttachmentUid)}/></div>
              </Grid>
          </Grid>
          </div>
      </div>
    </Modal>
    </Draggable>
  )
}

export default ImageModal;