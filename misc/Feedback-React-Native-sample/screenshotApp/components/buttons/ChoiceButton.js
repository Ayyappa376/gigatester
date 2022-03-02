import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import BugIcon from './../../icons/BugIcon';
import FeedbackIcon from './../../icons/FeedbackIcon';

const ChoiceButton = props => {
  const handlePress = () => {
    props.setShowForm(true);
    props.setChoice(props.title);
  }
  const content = (
    <View style={styles.button}>
      <Text style={styles.text}>{props.title}</Text>
      {props.title === 'Give Feedback' ? <FeedbackIcon /> : <BugIcon />}
    </View>
  );

  return (
    <TouchableOpacity underlayColor={'red'} onPress={() => handlePress()}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#011348',
    borderWidth: 0.2,
    borderColor: 'white',
    padding: 20,
    width: 300,
    height: 100,
    borderRadius: 20,
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ChoiceButton;
