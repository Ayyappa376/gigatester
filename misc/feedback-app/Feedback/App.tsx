import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import Feedback from './Components/Feedback';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  let key = 0;
  return (
      <View style={styles.container}>
        <Text style={{display: 'none'}}>{key++}</Text>
        <Button onPress={() => {setShowModal(true)}}
          title="Open Modal"
          color="#007ACC"
          accessibilityLabel="Open Feedback Modal"/>
        <Feedback key={key} show={showModal} closeModal={() => {setShowModal(false)}}/>
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
