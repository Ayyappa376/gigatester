import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import Feedback from './Components/Feedback';

let defaultColors = false;

const BOTTON_COLOR = '#f5cc55';
const BOTTON_COLOR_DEFAULT = '#007ACC';
const BACKGROUND_COLOR = '#070f30';
const BACKGROUND_COLOR_DEFAULT = '#1e1e1e';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  let key = 0;
  return (
      <View style={styles.container}>
        <Text style={{display: 'none'}}>{key++}</Text>
        <Button onPress={() => {setShowModal(true)}}
          title="Open Modal"
          color={defaultColors?BOTTON_COLOR_DEFAULT:BOTTON_COLOR}
          accessibilityLabel="Open Feedback Modal"/>
          {defaultColors ? <Feedback show={showModal} closeModal={() => {setShowModal(false)}}/> :
            <Feedback
            show={showModal}
            closeModal={() => {setShowModal(false)}}
            buttonColor='#f5cc55'
            backgroundColor='#0f1d61'/> 
          }
        {/* <Feedback show={showModal} closeModal={() => {setShowModal(false)}}/> */}
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#1e1e1e',
    backgroundColor: defaultColors ? BACKGROUND_COLOR_DEFAULT : BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
