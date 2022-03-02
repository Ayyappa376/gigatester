import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CloseIcon from './../../icons/CloseIcon';

const CloseBtn = (props) => {
  return (
    <TouchableOpacity onPress={() => {props.setModalOpen(false), props.setShowButton(true)}}>
      <CloseIcon />
    </TouchableOpacity>
  );
};

export default CloseBtn;
