import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Modal from 'react-native-modal';
import ChoiceButton from './ChoiceButton';
import FormModal from './FormModal';

const ChoiceModal = props => {
  const [showForm, setShowForm] = useState(false);
  const {show, setModalOpen} = props.props;
  const options = [{name: 'Give Feedback'}, {name: 'Report Bug'}];
  console.log(showForm);
  const content = (
    <Modal
      isVisible={show}
      coverScreen={true}
      backdropColor="gray"
      backdropOpacity={0.6}>
      <View style={styles.modalContent}>
        {!showForm ? (
          <View style={styles.btnHolder}>
            {options.map(btn => (
              <ChoiceButton
                key={btn.name}
                setShowForm={setShowForm}
                title={btn.name}
              />
            ))}
          </View>
        ) : null}
        <Button onPress={() => setModalOpen(false)} title="close" />
      </View>
      {showForm ? <FormModal showForm={showForm} /> : null}
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
    height: 300,
    padding: 10,
    borderRadius: 5,
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

export default ChoiceModal;
