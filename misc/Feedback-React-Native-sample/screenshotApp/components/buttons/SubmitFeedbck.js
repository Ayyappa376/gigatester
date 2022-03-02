import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';


const SubmitButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Submit feedback</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#011348',
    padding: 10,
    width: 150,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default SubmitButton;