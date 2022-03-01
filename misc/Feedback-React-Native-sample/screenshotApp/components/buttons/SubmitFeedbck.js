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
    marginBottom: 5,
    marginTop: 2,
  },
  text: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default SubmitButton;