import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Button,
} from 'react-native';
import FeedbackButton from './FeedbackButton';
import ChoiceModal from './ChoiceModal';


const Gigatester = () => {
  const [showModal, setModalOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);

  let modalProps = {
    show: showModal,
    setModalOpen: setModalOpen,
    setShowButton: setShowButton,
  };
  return (
    <View style={styles.GigatesterCont}>
      {showButton ? (
        <View style={[styles.feedBackButtonCont, {transform: [{ rotate: "90deg" }, {translateY: -55}]}
        ]}>
          <FeedbackButton onPress={() => {setModalOpen(true), setShowButton(false)}} />
        </View>
      ) : null}
      {showModal ? (
        <View>
          <ChoiceModal props={modalProps} />
        </View>
      ) : null}
    </View>
  )
};

const styles = StyleSheet.create({
  GigatesterCont: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
  }
});

export default Gigatester;
