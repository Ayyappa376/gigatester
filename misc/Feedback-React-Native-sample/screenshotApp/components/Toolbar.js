import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import ScreenshotIcon from './../icons/Screenshot';
import AudioIcon from './../icons/Audio';
import VideoIcon from './../icons/Video';
import AttachmentIcon from './../icons/Attachment';
import ScreenCapture from './buttons/ScreenshotBtn';

const numColumns = 2;

const ToolBar = () => {
  const buttons = ['screenshot', 'audio', 'video', 'attachment'];

  return (
    <View style={styles.mainCont}>
      <Text style={styles.title}>
        Click the buttons to include an attachment
      </Text>
      <View style={styles.btnRow}>
        <ScreenCapture />
        <TouchableOpacity style={styles.btn}>
          <Text>audio</Text>
          <AudioIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.btn}>
          <Text>video</Text>
          <VideoIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text>attachment</Text>
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
    marginBottom: 20,
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
    color: 'black',
  },
  title: {
    color: 'black',
    fontSize: 15,
    margin: 5,
    textAlign: 'center',
  },
});
