import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Modal from 'react-native-modal';
import ToolBar from './Toolbar';
import SubmitButton from './buttons/SubmitFeedbck';

const ToolModal = props => {
  const content = (
    <Modal
      isVisible={props.showAttach}
      coverScreen={true}
      backdropColor="gray"
      backdropOpacity={0.6}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Gigatester</Text>
        <ToolBar showTool={props.showAttach} setTool={props.setShowAttach} />
        <SubmitButton />
      </View>
    </Modal>
  );

  return content;
};

const styles = StyleSheet.create({
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 360,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  modalText: {
    color: 'black',
    fontSize: 15,
  },
  btnHolder: {
    width: '100%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  title: {
    color: '#011348',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 0,
  },
});

export default ToolModal;
