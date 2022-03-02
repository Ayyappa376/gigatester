import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Modal from 'react-native-modal';
import ChoiceButton from './buttons/ChoiceButton';
import FormModal from './FormModal';
import ToolModal from './ToolModal';
import CloseBtn from './buttons/CloseBtn';

const ChoiceModal = props => {
  const [showForm, setShowForm] = useState(false);
  const [showAttach, setShowAttach] = useState(false);
  const [choice, setChoice] = useState('');
  const {show, setModalOpen, setShowButton} = props.props;
  const options = [ {name: 'Report Bug'}, {name: 'Give Feedback'}];

  let closeProps = {
    firstModa: setModalOpen,
    secondModal: setShowButton,
    thirdModal: setShowForm,
    fourthModal: setShowAttach,
  }

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
                setChoice={setChoice}
                title={btn.name}
              />
            ))}
          </View>
        ) : null}
        {/* <Button onPress={() => {setModalOpen(false), setShowButton(true)}} title="close" /> */}
        <CloseBtn setModalOpen={setModalOpen} setShowButton={setShowButton}/>
      </View>
      {showForm ? <FormModal type={choice} showForm={showForm} setShowForm={setShowForm} setShowAttach={setShowAttach} /> : null}
      {showAttach ? <ToolModal closepP={closeProps} showAttach={showAttach} setShowAttach={setShowAttach} /> : null}
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

export default ChoiceModal;
