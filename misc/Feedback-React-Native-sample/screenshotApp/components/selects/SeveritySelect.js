import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const SeveritySelect = () => {
  const [selectedValue, setSelectedValue] = useState('Critical');
  const dummyData = ['Critical', 'High', 'Medium', 'Low'];
  return (
    <View style={styles.severityContainer}>
      <Text style={styles.label}>Choose severity *</Text>
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

export default SeveritySelect;

const styles = StyleSheet.create({
  severityContainer: {
    width: '90%',
    margin: 30,
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