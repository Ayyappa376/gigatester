import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const CategorySelect = () => {
  const [selectedValue, setSelectedValue] = useState('Video');
  const dummyData = ['Video', 'Audio', 'Device-Bug', 'Platform-Bug', 'Screenshare'];
  return (
    <View style={styles.selectContainer}>
      <Text style={styles.label}>Select a category *</Text>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        itemStyle={styles.twoPickerItems}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        {dummyData.map((cat, index) => (
          <Picker.Item key={index} label={cat} value={cat} />
        ))}
      </Picker>
    </View>
  );
};

export default CategorySelect;

const styles = StyleSheet.create({
  selectContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '90%',
    marginBottom: 10,
  },
  picker: {
    height: 47,
    width: 300,
  },
  twoPickerItems: {
    height: 45,
    color: 'black',
  },
  label: {
    fontSize: 13,
    fontWeight: '300',
    marginBottom: 4,
  }
});