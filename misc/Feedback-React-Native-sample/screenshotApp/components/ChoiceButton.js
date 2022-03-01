import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const ChoiceButton = props => {
  const content = (
    <View style={styles.button}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );

  return (
    <TouchableOpacity onPress={() => props.setShowForm(true)}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F7F7F7',
    padding: 16,
    width: 300,
    height: 100,
    borderRadius: 5,
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ChoiceButton;
