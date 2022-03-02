import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Modal from 'react-native-modal';
import Form from './Form';

const FormModal = props => {
  const handleNext = () => {
    props.setShowForm(false);
    props.setShowAttach(true);
  }
  const content = (
    <Modal
      isVisible={props.showForm}
      coverScreen={true}
      backdropColor="gray"
      backdropOpacity={0.6}>
      <View style={styles.modalContent}>
        <View style={styles.btnHolder}>
          <Form type={props.type} />
        </View>
        <View style={styles.btnOrganize}>
        <Button onPress={() => props.setShowForm(false)} title="back" />
        <Button onPress={() => handleNext()} title="next" />
        </View>
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
    height: 450,
    padding: 10,
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
  btnOrganize: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

export default FormModal;
