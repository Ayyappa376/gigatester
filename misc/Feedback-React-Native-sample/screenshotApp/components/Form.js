import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
// import {Picker} from '@react-native-picker/picker';

const Forms = props => {
  const [selectedValue, setSelectedValue] = useState('java');
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Gigatester</Text>
      <Text style={styles.subTitle}>
        Sorry, tell us what went wrong and we will make sure to resolve it
      </Text>
      <TextInput style={styles.input} placeholder="email" />
      {/* <Picker
        selectedValue={selectedValue}
        style={{height: 50, width: 150}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker> */}
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
    height: '99%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    color: 'black',
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    margin: 15,
    width: 300,
    height: 40,
    borderWidth: 1,
    padding: 9,
  },
  textArea: {
    margin: 15,
    width: 300,
    height: 80,
    borderWidth: 1,
    padding: 10,
  },
});

export default Forms;
