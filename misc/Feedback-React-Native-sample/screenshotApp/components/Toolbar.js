import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import ScreenshotIcon from './../icons/Screenshot';
import AudioIcon from './../icons/Audio';
import VideoIcon from './../icons/Video';
import AttachmentIcon from './../icons/Attachment';
import ScreenCapture from './buttons/ScreenshotBtn';

const numColumns = 2;

const ToolBar = (props) => {
  return (
    <View style={styles.mainCont}>
      <Text style={styles.title}>
        Click the buttons to include an attachment
      </Text>
      <View style={styles.btnRow}>
        <ScreenCapture setShow={props.setTool} />
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>audio</Text>
          <AudioIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>video</Text>
          <VideoIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>attachment</Text>
          <AttachmentIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToolBar;

const styles = StyleSheet.create({
  mainCont: {
    padding: 20,
    width: '95%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 0,
  },
  btnRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 4,
  },
  btn: {
    width: 120,
    height: 80,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 0.5,
    margin: 10,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'gray',
    fontSize: 11,
    marginBottom: 2,
  },
  title: {
    color: 'black',
    fontSize: 12,
    margin: 5,
    textAlign: 'center',
  },
});
