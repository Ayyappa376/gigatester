import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import ScreenshotIcon from './../../icons/Screenshot';

const ScreenCapture = (props) => {

  // const handleClose = () => {
  //   props.closeProps.firstModal(false);
  //   props.closeProps.secondModal(false);
  //   props.closeProps.thirdModal(false);
  //   props.closeProps.fourthModal(false);
  // }

  return (
    <TouchableOpacity style={styles.btn} onPress={() => console.log('screenshot')}>
      <Text style={styles.btnText}>screenshot</Text>
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
  btnText: {
    color: 'gray',
    fontSize: 11,
    marginBottom: 2,
  }
});
