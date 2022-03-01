import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import CategorySelect from './selects/CategorySelect';
import SeveritySelect from './selects/SeveritySelect';

const Forms = props => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Gigatester</Text>
      <Text style={styles.subTitle}>
        Sorry, tell us what went wrong and we will make sure to resolve it
      </Text>
      <TextInput style={styles.input} placeholder="email (optional)" />
      <CategorySelect />
      {props.type === 'Report Bug' ? <SeveritySelect /> : null}
      <TextInput
        style={styles.textArea}
        placeholder="Provide your coments"
        multiline={true}
        numberOfLines={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 5,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  subTitle: {
    color: 'black',
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    marginTop: 10,
    marginBottom: 26,
    width: 300,
    height: 40,
    borderWidth: 0.5,
    padding: 9,
    borderRadius: 5,
    borderColor: 'gray',
  },
  textArea: {
    marginBottom: 15,
    width: 300,
    height: 80,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 5,
    borderColor: 'gray',
  },
});

export default Forms;
