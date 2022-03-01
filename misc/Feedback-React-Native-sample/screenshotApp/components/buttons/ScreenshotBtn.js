import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import ScreenshotIcon from './../../icons/Screenshot';
import {captureScreen} from 'react-native-view-shot';

const ScreenCapture = (props) => {
  
  return (
    <TouchableOpacity style={styles.btn}>
      <Text>screenshot</Text>
      <ScreenshotIcon />
    </TouchableOpacity>
  );
};

export default ScreenCapture;


const styles = StyleSheet.create({
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
});
