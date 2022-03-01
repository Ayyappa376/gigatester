import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Modal from 'react-native-modal';
import ToolBar from './Toolbar';
import SubmitButton from './buttons/SubmitFeedbck';

const ToolModal = props => {
  const [isAttached, setIsAttached] = useState(true);
  const content = (
    <Modal
      isVisible={props.showAttach}
      coverScreen={true}
      backdropColor="gray"
      backdropOpacity={0.6}>
      <View style={styles.modalContent}>
        <ToolBar />
        <SubmitButton />
      </View>
    </Modal>
  );

  return content;
};

const styles = StyleSheet.create({
  modalContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 320,
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
});

export default ToolModal;
