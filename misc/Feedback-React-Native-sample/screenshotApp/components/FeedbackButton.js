import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const FeedbackButton = props => {
  const content = (
    <View style={styles.button}>
      <Text style={styles.text}>Feedback</Text>
    </View>
  );

  return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>;
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#011348',
    padding: 13,
    width: 150,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FeedbackButton;
